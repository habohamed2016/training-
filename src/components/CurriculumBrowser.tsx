import React, { useState } from 'react';
import { HSR_DOMAINS, HSR_TOPICS } from '../data/hsrCurriculum';
import { HSRDomainId, HSRTopic } from '../types';
import {
  Search,
  CheckCircle2,
  Circle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  HelpCircle,
  Wrench,
  Cpu,
  Radio,
  ShieldCheck,
  FileDown,
  Copy,
  Check,
  BookOpen,
} from 'lucide-react';

interface CurriculumBrowserProps {
  completedTopicIds: string[];
  onToggleTopicCompleted: (topicId: string) => void;
  onGenerateDocForTopic: (topic: HSRTopic) => void;
}

export const CurriculumBrowser: React.FC<CurriculumBrowserProps> = ({
  completedTopicIds,
  onToggleTopicCompleted,
  onGenerateDocForTopic,
}) => {
  const [selectedDomain, setSelectedDomain] = useState<HSRDomainId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(HSR_TOPICS[0].id);
  const [showAnswerForId, setShowAnswerForId] = useState<string | null>(null);
  const [copiedTopicId, setCopiedTopicId] = useState<string | null>(null);

  const filteredTopics = HSR_TOPICS.filter((topic) => {
    const matchesDomain = selectedDomain === 'all' || topic.domainId === selectedDomain;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesDomain;

    const matchesSearch =
      topic.titleAr.toLowerCase().includes(query) ||
      topic.titleEn.toLowerCase().includes(query) ||
      topic.code.toLowerCase().includes(query) ||
      topic.summaryAr.toLowerCase().includes(query) ||
      topic.keyConcepts.some((c) => c.toLowerCase().includes(query)) ||
      topic.fieldTasks.some((t) => t.toLowerCase().includes(query));

    return matchesDomain && matchesSearch;
  });

  const handleCopyTopic = (topic: HSRTopic, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `الموضوع: ${topic.titleAr} (${topic.titleEn})
الكود: ${topic.code} | المستوى: ${topic.importanceLevel}
الملخص: ${topic.summaryAr}

أهم المفاهيم:
${topic.keyConcepts.map((c) => `- ${c}`).join('\n')}

المهام الحقلية للمتدرب:
${topic.fieldTasks.map((t) => `- ${t}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopiedTopicId(topic.id);
    setTimeout(() => setCopiedTopicId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Introduction Hero Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              منهج هندسي معتمد لسرعات 300 كم/ساعة فأكثر
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              خارطة مواضيع الاتصالات والإشارات لقطارات السرعة الفائقة
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              تم إعداد هذه المواضيع لنقل المتدرب الخريج من المفاهيم الجامعية العامة إلى التخصص الدقيق في السكك الحديدية الحديثة، بالتركيز على معمارية <strong>ETCS L2</strong>، شبكات <strong>GSM-R</strong>، مجسات عدادات المحاور الرقمية <strong>DAC</strong>، ومنظومات التشابك <strong>CBI</strong> مع متطلبات الأمان الصارمة <strong>SIL 4</strong>.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 self-start lg:self-center">
            <div className="text-center px-3 border-l border-slate-800 last:border-0">
              <span className="block text-xl font-bold text-cyan-400">{HSR_DOMAINS.length}</span>
              <span className="text-[11px] text-slate-400">مجالات هندسية</span>
            </div>
            <div className="text-center px-3 border-l border-slate-800 last:border-0">
              <span className="block text-xl font-bold text-emerald-400">{HSR_TOPICS.length}</span>
              <span className="text-[11px] text-slate-400">مواضيع تخصصية</span>
            </div>
            <div className="text-center px-3">
              <span className="block text-xl font-bold text-amber-400">SIL 4</span>
              <span className="text-[11px] text-slate-400">معيار الأمان الأقصى</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="input-curriculum-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في المواضيع (مثال: RBC, GSM-R, Doppler, باليز, تحاويل, عدادات المحاور, CENELEC)..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pr-11 pl-4 py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>

        {/* Domain Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            id="filter-domain-all"
            onClick={() => setSelectedDomain('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              selectedDomain === 'all'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            جميع المجالات ({HSR_TOPICS.length})
          </button>

          {HSR_DOMAINS.map((domain) => {
            const isSelected = selectedDomain === domain.id;
            return (
              <button
                key={domain.id}
                id={`filter-domain-${domain.id}`}
                onClick={() => setSelectedDomain(domain.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{domain.titleAr}</span>
                <span className="opacity-70 text-[10px]">({domain.topicsCount})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {filteredTopics.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 rounded-xl border border-slate-800 p-6">
            <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-base font-medium text-slate-200">لم يتم العثور على مواضيع مطابقة لبحثك</p>
            <p className="text-xs text-slate-400 mt-1">جرب كلمات بحث أخرى أو اختر "جميع المجالات".</p>
          </div>
        ) : (
          filteredTopics.map((topic) => {
            const isExpanded = expandedTopicId === topic.id;
            const isCompleted = completedTopicIds.includes(topic.id);

            return (
              <div
                key={topic.id}
                id={`topic-card-${topic.id}`}
                className={`bg-slate-900 border rounded-xl overflow-hidden transition-all duration-200 ${
                  isCompleted
                    ? 'border-emerald-800/60 shadow-sm shadow-emerald-950/20'
                    : isExpanded
                    ? 'border-cyan-500/60 shadow-lg shadow-cyan-950/20 ring-1 ring-cyan-500/30'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Topic Header Summary */}
                <div
                  onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3">
                    {/* Completed Checkbox */}
                    <button
                      id={`btn-toggle-topic-${topic.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleTopicCompleted(topic.id);
                      }}
                      title={isCompleted ? 'مكتمل - انقر للإلغاء' : 'تحديد كمكتمل'}
                      className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer flex-shrink-0"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-950" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-semibold border border-slate-700">
                          {topic.code}
                        </span>
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                            topic.importanceLevel.includes('حرج')
                              ? 'bg-rose-950/70 text-rose-300 border border-rose-800/60'
                              : topic.importanceLevel.includes('أساسي')
                              ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-800/60'
                              : 'bg-purple-950/70 text-purple-300 border border-purple-800/60'
                          }`}
                        >
                          {topic.importanceLevel}
                        </span>
                        <span className="text-xs text-slate-400">
                          تقدير التدريب: {topic.estimatedWeeks} أسبوع
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white mt-1.5">
                        {topic.titleAr}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">
                        {topic.titleEn}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Chevron */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={(e) => handleCopyTopic(topic, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="نسخ تفاصيل الموضوع"
                    >
                      {copiedTopicId === topic.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onGenerateDocForTopic(topic);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer"
                      title="توليد مستند مخصص لهذا الموضوع"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span className="hidden sm:inline">توليد ورقة عمل</span>
                    </button>

                    <div className="text-slate-400 p-1">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-slate-800/90 p-5 bg-slate-950/50 space-y-5 animate-in fade-in duration-200">
                    {/* Summary */}
                    <div>
                      <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        الملخص الهندسي للموضوع
                      </h4>
                      <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                        {topic.summaryAr}
                      </p>
                      <p className="text-xs text-slate-400 font-mono mt-1 px-1" dir="ltr">
                        {topic.summaryEn}
                      </p>
                    </div>

                    {/* Key Concepts */}
                    <div>
                      <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        المفاهيم والنظريات الأساسية التي يجب أن يتعلمها المتدرب:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {topic.keyConcepts.map((concept, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/70"
                          >
                            <span className="w-4 h-4 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center text-[10px] font-bold mt-0.5 flex-shrink-0">
                              {idx + 1}
                            </span>
                            <span>{concept}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Equipment Trackside vs On-board */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-2">
                          <Wrench className="w-3.5 h-3.5" />
                          <span>تجهيزات المسار الميدانية (Trackside Equipment)</span>
                        </div>
                        <ul className="space-y-1 text-xs text-slate-300 font-mono" dir="ltr">
                          {topic.equipmentTrackside.map((eq, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>{eq}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 mb-2">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>تجهيزات قمرة وعربات القطار (On-board Equipment)</span>
                        </div>
                        <ul className="space-y-1 text-xs text-slate-300 font-mono" dir="ltr">
                          {topic.equipmentOnboard.map((eq, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                              <span>{eq}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Field Tasks for Student */}
                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Wrench className="w-4 h-4 text-amber-400" />
                        المهام الحقلية العملية المطلوبة من المتدرب (Field Hands-on Tasks):
                      </h4>
                      <div className="space-y-2">
                        {topic.fieldTasks.map((task, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80"
                          >
                            <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono text-[10px] font-bold">
                              مهمة {i + 1}
                            </span>
                            <span className="leading-relaxed">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Safety Rules */}
                    {topic.safetyRules.length > 0 && (
                      <div className="bg-rose-950/30 border border-rose-800/50 p-3.5 rounded-xl">
                        <div className="flex items-center gap-2 text-xs font-bold text-rose-300 mb-1.5">
                          <AlertTriangle className="w-4 h-4 text-rose-400" />
                          <span>اشتراطات السلامة الحرجة (Safety-Critical Rules):</span>
                        </div>
                        <ul className="space-y-1 text-xs text-rose-200/90 list-disc list-inside">
                          {topic.safetyRules.map((rule, i) => (
                            <li key={i}>{rule}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Interview / Assessment Q&A */}
                    {topic.interviewQuestions.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                          <HelpCircle className="w-4 h-4 text-cyan-400" />
                          أسئلة نقاش واختبار يوجهها المشرف للمتدرب:
                        </h4>
                        {topic.interviewQuestions.map((qa, qIdx) => {
                          const isShowingAnswer = showAnswerForId === `${topic.id}-${qIdx}`;
                          return (
                            <div
                              key={qIdx}
                              className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <p className="font-semibold text-white leading-relaxed">
                                  س: {qa.question}
                                </p>
                                <button
                                  onClick={() =>
                                    setShowAnswerForId(isShowingAnswer ? null : `${topic.id}-${qIdx}`)
                                  }
                                  className="text-cyan-400 hover:text-cyan-300 font-medium text-[11px] whitespace-nowrap cursor-pointer"
                                >
                                  {isShowingAnswer ? 'إخفاء الإجابة' : 'عرض الإجابة النموذجية'}
                                </button>
                              </div>

                              {isShowingAnswer && (
                                <div className="mt-2.5 p-2.5 bg-cyan-950/40 rounded-lg border border-cyan-800/60 text-cyan-200 leading-relaxed">
                                  <strong>الإجابة النموذجية ومعيار التقييم: </strong>
                                  {qa.answerKey}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
