import React, { useState } from 'react';
import { Difficulty, ExamConfig } from '../types';
import { Sparkles, BookOpen, GraduationCap, Hash, AlignLeft, Building2, MapPin, FileBadge } from 'lucide-react';

interface InputFormProps {
  onGenerate: (config: ExamConfig) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [config, setConfig] = useState<ExamConfig>({
    foundationName: '',
    schoolName: '',
    schoolAddress: '',
    examType: 'Penilaian Harian (PH)',
    sourceMaterial: '',
    subject: '',
    gradeLevel: '',
    difficulty: Difficulty.MEDIUM,
    mcCount: 5,
    essayCount: 2,
  });

  const handleChange = (field: keyof ExamConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(config);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        Data & Materi Ujian
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* School Identity Section */}
        <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">Identitas Kop Surat</h3>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Nama Yayasan / Instansi</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Ex: Yayasan Pendidikan Cendekia"
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                value={config.foundationName}
                onChange={(e) => handleChange('foundationName', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Nama Sekolah</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Ex: SMA Negeri 1 Jakarta"
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                value={config.schoolName}
                onChange={(e) => handleChange('schoolName', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Alamat Lengkap</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Ex: Jl. Merdeka No. 45, Jakarta Pusat"
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                value={config.schoolAddress}
                onChange={(e) => handleChange('schoolAddress', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Jenis Ujian</label>
            <div className="relative">
              <FileBadge className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <select
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-slate-800"
                value={config.examType}
                onChange={(e) => handleChange('examType', e.target.value)}
              >
                <option value="Penilaian Harian (PH)">Penilaian Harian (PH)</option>
                <option value="Penilaian Tengah Semester (PTS)">Penilaian Tengah Semester (PTS)</option>
                <option value="Penilaian Akhir Semester (PAS)">Penilaian Akhir Semester (PAS)</option>
                <option value="Penilaian Akhir Tahun (PAT)">Penilaian Akhir Tahun (PAT)</option>
                <option value="Ujian Sekolah (US)">Ujian Sekolah (US)</option>
                <option value="Latihan Soal">Latihan Soal</option>
                <option value="Kuis">Kuis</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Mata Pelajaran</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Ex: Biologi"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={config.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-600 mb-1">Kelas</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Ex: XII IPA 1"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={config.gradeLevel}
                onChange={(e) => handleChange('gradeLevel', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Material Source */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Materi / Penjelasan Bab</label>
          <textarea
            required
            rows={5}
            placeholder="Paste materi, ringkasan bab, atau teks bacaan di sini. Soal akan dibuat berdasarkan teks ini."
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm leading-relaxed"
            value={config.sourceMaterial}
            onChange={(e) => handleChange('sourceMaterial', e.target.value)}
          />
          <p className="text-xs text-slate-400 mt-1 text-right">{config.sourceMaterial.length} karakter</p>
        </div>

        {/* Settings */}
        <div className="grid grid-cols-3 gap-3">
           <div className="col-span-1">
            <label className="block text-xs font-medium text-slate-500 mb-1">Kesulitan</label>
            <select
              className="w-full px-2 py-2 border border-slate-200 rounded-lg text-sm bg-white outline-none"
              value={config.difficulty}
              onChange={(e) => handleChange('difficulty', e.target.value as Difficulty)}
            >
              <option value={Difficulty.EASY}>Mudah</option>
              <option value={Difficulty.MEDIUM}>Sedang</option>
              <option value={Difficulty.HARD}>Sulit</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-xs font-medium text-slate-500 mb-1">Jml. PG</label>
            <div className="relative">
              <Hash className="absolute left-2 top-2.5 w-3 h-3 text-slate-400" />
              <input
                type="number"
                min="1"
                max="50"
                className="w-full pl-7 pr-2 py-2 border border-slate-200 rounded-lg text-sm outline-none"
                value={config.mcCount}
                onChange={(e) => handleChange('mcCount', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
          <div className="col-span-1">
            <label className="block text-xs font-medium text-slate-500 mb-1">Jml. Essay</label>
            <div className="relative">
              <AlignLeft className="absolute left-2 top-2.5 w-3 h-3 text-slate-400" />
              <input
                type="number"
                min="0"
                max="20"
                className="w-full pl-7 pr-2 py-2 border border-slate-200 rounded-lg text-sm outline-none"
                value={config.essayCount}
                onChange={(e) => handleChange('essayCount', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all ${
            isLoading 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Soal
            </>
          )}
        </button>
      </form>
    </div>
  );
};