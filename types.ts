export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  ESSAY = 'essay',
}

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export interface Question {
  id: number;
  type: string;
  questionText: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  points: number;
}

export interface ExamData {
  // Header Info
  foundationName: string;
  schoolName: string;
  schoolAddress: string;
  
  // Exam Meta
  title: string;
  examType: string; // Added field
  subject: string;
  gradeLevel: string;
  
  // Content
  questions: Question[];
}

export interface ExamConfig {
  foundationName: string;
  schoolName: string;
  schoolAddress: string;
  examType: string; // Added field
  sourceMaterial: string;
  subject: string;
  gradeLevel: string;
  difficulty: Difficulty;
  mcCount: number;
  essayCount: number;
}