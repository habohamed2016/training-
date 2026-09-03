import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CurriculumBrowser } from './components/CurriculumBrowser';
import { DocumentsDirectory } from './components/DocumentsDirectory';
import { AIDocumentGenerator } from './components/AIDocumentGenerator';
import { TraineeTracker } from './components/TraineeTracker';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { HSR_TOPICS } from './data/hsrCurriculum';
import { PREBUILT_DOCUMENTS } from './data/prebuiltDocuments';
import { HSRTopic, PrebuiltDocument } from './types';
import { ShieldCheck, BookOpen, Download, Train, Info } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'documents' | 'ai_generator' | 'trainee_tracker'>('curriculum');
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hsr_completed_topics');
      return saved ? JSON.parse(saved) : ['etcs-01', 'gsmr-01', 'det-01'];
    } catch {
      return ['etcs-01', 'gsmr-01', 'det-01'];
    }
  });

  const [selectedDocForModal, setSelectedDocForModal] = useState<PrebuiltDocument | null>(null);
  const [topicForGenerator, setTopicForGenerator] = useState<HSRTopic | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('hsr_completed_topics', JSON.stringify(completedTopicIds));
    } catch (e) {
      console.error('Failed to save completed topics:', e);
    }
  }, [completedTopicIds]);

  const handleToggleTopicCompleted = (topicId: string) => {
    setCompletedTopicIds((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const handleGenerateDocForTopic = (topic: HSRTopic) => {
    setTopicForGenerator(topic);
    setActiveTab('ai_generator');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedTopicsCount={completedTopicIds.length}
        totalTopicsCount={HSR_TOPICS.length}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'curriculum' && (
          <CurriculumBrowser
            completedTopicIds={completedTopicIds}
            onToggleTopicCompleted={handleToggleTopicCompleted}
            onGenerateDocForTopic={handleGenerateDocForTopic}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentsDirectory
            onSelectDocument={(doc) => setSelectedDocForModal(doc)}
          />
        )}

        {activeTab === 'ai_generator' && (
          <AIDocumentGenerator
            initialTopic={topicForGenerator}
            onClearInitialTopic={() => setTopicForGenerator(null)}
          />
        )}

        {activeTab === 'trainee_tracker' && (
          <TraineeTracker
            completedTopicIds={completedTopicIds}
            onToggleTopicCompleted={handleToggleTopicCompleted}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-2">
            <Train className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-200">
              بوابة تدريب مهندسي الاتصالات والإشارات - قطارات فائقة السرعة
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-400">ERTMS/ETCS L2 & GSM-R Engineering Training</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">CENELEC EN 50126/128/129</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">UIC EIRENE GSM-R / FRMCS</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">SIL 4 Fail-Safe</span>
          </div>
        </div>
      </footer>

      {/* Document Viewer Modal */}
      {selectedDocForModal && (
        <DocumentViewerModal
          document={selectedDocForModal}
          onClose={() => setSelectedDocForModal(null)}
        />
      )}
    </div>
  );
}
