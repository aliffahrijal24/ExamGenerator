import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { ExamPreview } from './components/ExamPreview';
import { generateExamContent } from './services/geminiService';
import { ExamConfig, ExamData } from './types';
import { BrainCircuit, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (config: ExamConfig) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateExamContent(config);
      setExamData(data);
    } catch (err) {
      setError("Gagal membuat soal. Pastikan API Key valid atau coba lagi beberapa saat lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 leading-tight">ExamGenius</h1>
              <p className="text-xs text-slate-500 font-medium">AI Exam Creator</p>
            </div>
          </div>
          <div className="text-sm text-slate-500 hidden md:block">
            Powered by Gemini 2.5 Flash
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          
          {/* Left Panel: Configuration */}
          <div className="lg:col-span-4 space-y-6 no-print">
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg text-sm text-indigo-800">
                <p className="font-semibold mb-1">Selamat Datang, Guru!</p>
                <p>Masukkan topik dan jenjang kelas untuk membuat soal ujian lengkap dengan kunci jawaban secara otomatis.</p>
              </div>
              
              <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Preview */}
          <div className="lg:col-span-8 min-h-[500px]">
            {examData ? (
              <ExamPreview examData={examData} />
            ) : (
              <div className="bg-white rounded-xl border border-dashed border-slate-300 h-full flex flex-col items-center justify-center p-12 text-center text-slate-400">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <BrainCircuit className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-slate-600 mb-2">Belum ada soal dibuat</h3>
                <p className="max-w-md mx-auto">
                  Silahkan isi formulir di sebelah kiri (atau atas pada mobile) untuk mulai membuat draft ujian baru.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-sm text-slate-400 no-print">
        &copy; {new Date().getFullYear()} ExamGenius. Dibuat untuk Pendidikan Indonesia.
      </footer>
    </div>
  );
};

export default App;
