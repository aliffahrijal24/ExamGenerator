import React, { useState } from 'react';
import { ExamData, QuestionType } from '../types';
import { Printer, CheckCircle2, FileDown } from 'lucide-react';

interface ExamPreviewProps {
  examData: ExamData;
}

type PaperSize = 'A4' | 'F4';

export const ExamPreview: React.FC<ExamPreviewProps> = ({ examData }) => {
  const [paperSize, setPaperSize] = useState<PaperSize>('A4');

  const handlePrint = () => {
    window.print();
  };

  const mcQuestions = examData.questions.filter(q => q.type === QuestionType.MULTIPLE_CHOICE);
  const essayQuestions = examData.questions.filter(q => q.type === QuestionType.ESSAY);

  // CSS classes to simulate paper aspect ratio in preview
  // A4 is roughly 210mm x 297mm (Ratio ~0.70)
  // F4/Legal is roughly 215mm x 330mm (Ratio ~0.65)
  const paperClass = paperSize === 'A4' ? 'max-w-[210mm]' : 'max-w-[215mm]';

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 flex flex-wrap justify-between items-center gap-4 no-print shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-600">Ukuran Kertas:</span>
          <select 
            value={paperSize} 
            onChange={(e) => setPaperSize(e.target.value as PaperSize)}
            className="text-sm border border-slate-300 rounded px-2 py-1 outline-none focus:border-indigo-500"
          >
            <option value="A4">A4</option>
            <option value="F4">F4 / Legal</option>
          </select>
        </div>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors text-sm font-medium"
        >
          <Printer className="w-4 h-4" />
          Download PDF / Cetak
        </button>
      </div>

      {/* Printable Paper Container - Wrapper for scrolling in preview */}
      <div className="flex-grow bg-slate-200 overflow-y-auto rounded-xl p-4 md:p-8 print:p-0 print:bg-white print:overflow-visible flex justify-center">
        
        {/* THE ACTUAL PAPER - Targeted by ID for printing */}
        <div 
          id="printable-exam" 
          className={`bg-white shadow-lg print:shadow-none p-8 md:p-12 w-full ${paperClass} min-h-[297mm] flex flex-col`}
        >
          
          {/* --- KOP SURAT --- */}
          <div className="text-center border-b-4 border-double border-slate-800 pb-4 mb-6">
            {examData.foundationName && (
              <h2 className="text-lg font-bold text-slate-600 uppercase tracking-wide leading-tight">
                {examData.foundationName}
              </h2>
            )}
            <h1 className="text-2xl font-bold text-black uppercase tracking-wider leading-tight mb-1">
              {examData.schoolName}
            </h1>
            <p className="text-sm text-slate-600 italic font-medium">
              {examData.schoolAddress}
            </p>
          </div>

          {/* --- EXAM META & STUDENT BIO --- */}
          <div className="mb-8">
            <h3 className="text-center font-bold text-lg uppercase underline mb-6">{examData.title}</h3>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm md:text-base font-medium">
              {/* Left Column */}
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-32">Mata Pelajaran</span>
                  <span>: {examData.subject}</span>
                </div>
                <div className="flex">
                  <span className="w-32">Kelas</span>
                  <span>: {examData.gradeLevel}</span>
                </div>
              </div>
              
              {/* Right Column (Student Input) */}
              <div className="space-y-2">
                 <div className="flex">
                  <span className="w-24">Nama</span>
                  <span>: ...................................................</span>
                </div>
                <div className="flex">
                  <span className="w-24">NISN</span>
                  <span>: ...................................................</span>
                </div>
                <div className="flex">
                  <span className="w-24">Hari/Tgl</span>
                  <span>: ...................................................</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- QUESTIONS --- */}
          <div className="flex-grow">
            {/* Section A: Multiple Choice */}
            {mcQuestions.length > 0 && (
              <div className="mb-8">
                <h4 className="font-bold text-base mb-4 uppercase">A. Pilihan Ganda</h4>
                <div className="space-y-4">
                  {mcQuestions.map((q, idx) => (
                    <div key={q.id} className="break-inside-avoid">
                      <div className="flex gap-2 mb-1">
                        <span className="font-medium">{idx + 1}.</span>
                        <div className="text-justify">{q.questionText}</div>
                      </div>
                      <div className="pl-6 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        {q.options?.map((opt, optIdx) => (
                          <div key={optIdx} className="flex items-start gap-2">
                            <span className="font-medium min-w-[16px]">{String.fromCharCode(65 + optIdx)}.</span>
                            <span>{opt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section B: Essay */}
            {essayQuestions.length > 0 && (
              <div className="mb-8">
                <h4 className="font-bold text-base mb-4 uppercase">B. Essay</h4>
                <div className="space-y-6">
                  {essayQuestions.map((q, idx) => (
                    <div key={q.id} className="break-inside-avoid">
                      <div className="flex gap-2 mb-8">
                        <span className="font-medium">{idx + 1}.</span>
                        <div className="w-full">
                          <p className="mb-6 text-justify">{q.questionText}</p>
                          {/* Guides for writing */}
                          <div className="w-full border-b border-dotted border-slate-400 mb-6"></div>
                          <div className="w-full border-b border-dotted border-slate-400 mb-6"></div>
                          <div className="w-full border-b border-dotted border-slate-400"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* --- TEACHER KEY (Separate Page) --- */}
          <div className="mt-8 pt-8 border-t-2 border-dashed border-slate-400 page-break">
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold uppercase">Kunci Jawaban & Pembahasan</h2>
              <p className="text-sm text-slate-500">(Pegangan Guru)</p>
            </div>
            
            <div className="space-y-4 text-sm">
              {examData.questions.map((q, idx) => (
                <div key={q.id} className="break-inside-avoid border-b border-slate-100 pb-3">
                  <div className="flex gap-2 font-bold text-slate-700">
                    <span>{q.type === 'multiple_choice' ? 'PG' : 'Essay'} No. {q.id}.</span>
                  </div>
                  <div className="pl-6 text-slate-800 mb-1">
                    <span className="font-semibold text-green-700">Jwb: </span>
                    {q.correctAnswer}
                  </div>
                  {q.explanation && (
                    <div className="pl-6 text-slate-600 italic">
                      <span className="font-semibold text-indigo-700">Ket: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};