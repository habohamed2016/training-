import React from 'react';
import { Train, FileText, Sparkles, UserCheck, ShieldCheck, Download } from 'lucide-react';

interface HeaderProps {
  activeTab: 'curriculum' | 'documents' | 'ai_generator' | 'trainee_tracker';
  setActiveTab: (tab: 'curriculum' | 'documents' | 'ai_generator' | 'trainee_tracker') => void;
  completedTopicsCount: number;
  totalTopicsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  completedTopicsCount,
  totalTopicsCount,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white flex-shrink-0">
              <Train className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  بوابة تدريب مهندسي الاتصالات والإشارات
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-700/50">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  HSR 300+ km/h
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                برنامج تأهيل الخريجين الجدد في منظومة القطارات فائقة السرعة (ETCS L2, GSM-R, DAC, CBI, RAMS)
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center gap-2 self-end md:self-auto text-xs text-slate-300">
            <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 flex items-center gap-2">
              <span className="text-slate-400">مواضيع مكتملة:</span>
              <span className="font-bold text-cyan-400">{completedTopicsCount} / {totalTopicsCount}</span>
              <div className="w-16 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-cyan-400 h-full transition-all duration-300"
                  style={{ width: `${(completedTopicsCount / Math.max(1, totalTopicsCount)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
          <button
            id="tab-curriculum"
            onClick={() => setActiveTab('curriculum')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'curriculum'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <Train className="w-4 h-4" />
            <span>المواضيع والمناهج التخصصية (22 موضوعاً)</span>
          </button>

          <button
            id="tab-documents"
            onClick={() => setActiveTab('documents')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'documents'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>الملفات التدريبية الجاهزة للتحميل (8 ملفات)</span>
          </button>

          <button
            id="tab-ai-generator"
            onClick={() => setActiveTab('ai_generator')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'ai_generator'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>توليد مستند / سيناريو مخصص بالذكاء الاصطناعي</span>
          </button>

          <button
            id="tab-trainee-tracker"
            onClick={() => setActiveTab('trainee_tracker')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'trainee_tracker'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>متابعة وتقييم المتدرب وتقرير الجامعة</span>
          </button>
        </div>
      </div>
    </header>
  );
};
