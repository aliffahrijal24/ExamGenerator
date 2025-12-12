import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ExamConfig, ExamData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define only the dynamic parts that Gemini needs to generate
const generatedContentSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A formal uppercase title for the exam (e.g. 'PENILAIAN TENGAH SEMESTER (PTS)')" },
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          type: { 
            type: Type.STRING, 
            description: "Must be either 'multiple_choice' or 'essay'" 
          },
          questionText: { type: Type.STRING, description: "The question stem based on the provided material" },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Array of 4 options for multiple choice. Empty for essay."
          },
          correctAnswer: { 
            type: Type.STRING, 
            description: "The correct answer text." 
          },
          explanation: { type: Type.STRING, description: "Brief explanation." },
          points: { type: Type.INTEGER, description: "suggested points" }
        },
        required: ["id", "type", "questionText", "points"],
      },
    },
  },
  required: ["title", "questions"],
};

export const generateExamContent = async (config: ExamConfig): Promise<ExamData> => {
  const model = "gemini-2.5-flash";
  
  const prompt = `
    You are an expert teacher assistant. Create an exam based strictly on the provided reference material.
    
    === EXAM CONFIGURATION ===
    Exam Type: ${config.examType}
    Subject: ${config.subject}
    Grade Level: ${config.gradeLevel}
    Difficulty: ${config.difficulty}
    Language: Indonesian (Bahasa Indonesia)
    
    === REFERENCE MATERIAL (SOURCE) ===
    "${config.sourceMaterial}"
    
    === REQUIREMENTS ===
    1. Generate exactly ${config.mcCount} Multiple Choice Questions based on the Reference Material.
    2. Generate exactly ${config.essayCount} Essay Questions based on the Reference Material.
    3. If the material is too short, infer logical questions related to the subject matter.
    4. For Multiple Choice, provide 4 options.
    5. For Essay, provide a sample answer.
    6. Title should be formal and reflect the Exam Type.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: generatedContentSchema,
        temperature: 0.5, // Lower temperature for more accuracy to the source text
      },
    });

    if (response.text) {
      const generatedData = JSON.parse(response.text);
      
      // Combine manual inputs with generated data
      return {
        foundationName: config.foundationName,
        schoolName: config.schoolName,
        schoolAddress: config.schoolAddress,
        examType: config.examType,
        subject: config.subject,
        gradeLevel: config.gradeLevel,
        title: generatedData.title,
        questions: generatedData.questions
      };
    }
    
    throw new Error("No data returned from Gemini");
  } catch (error) {
    console.error("Error generating exam:", error);
    throw error;
  }
};