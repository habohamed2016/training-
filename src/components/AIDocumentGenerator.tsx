import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { HSRTopic } from '../types';
import {
  Sparkles,
  FileText,
  Download,
  Copy,
  Check,
  Printer,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Wrench,
  ShieldCheck,
  Send,
} from 'lucide-react';

interface AIDocumentGeneratorProps {
  initialTopic?: HSRTopic | null;
  onClearInitialTopic?: () => void;
}

export const AIDocumentGenerator: React.FC<AIDocumentGeneratorProps> = ({
  initialTopic,
  onClearInitialTopic,
}) => {
  const [topicTitle, setTopicTitle] = useState(initialTopic?.titleAr || '');
  const [subsystem, setSubsystem] = useState(
    initialTopic ? `${initialTopic.code} - ${initialTopic.titleEn}` : 'ETCS Level 2 & GSM-R'
  );
  const [targetLevel, setTargetLevel] = useState('خريج جديد (Fresh Graduate Engineer)');
  const [documentType, setDocumentType] = useState('دليل تدريبي هندسي متكامل');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isOfflineResult, setIsOfflineResult] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Update fields if initialTopic changes
  React.useEffect(() => {
    if (initialTopic) {
      setTopicTitle(initialTopic.titleAr);
      setSubsystem(`${initialTopic.code} - ${initialTopic.titleEn}`);
      setCustomPrompt(`إعداد ورقة تدريبية تخصصية تشمل المهام الحقلية: ${initialTopic.fieldTasks.slice(0, 2).join(' و ')}`);
    }
  }, [initialTopic]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicTitle.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-training-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicTitle: topicTitle.trim(),
          subsystem: subsystem.trim(),
          level: targetLevel,
          documentType,
          customPrompt: customPrompt.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`تعذر التوليد: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.content) {
        setGeneratedContent(data.content);
        setIsOfflineResult(Boolean(data.isOffline));
      } else {
        throw new Error('لم يتم استلام محتوى صالح');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'حدث خطأ أثناء التواصل مع الخادم.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!generatedContent) return;
    const blob = new Blob([generatedContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    const cleanName = topicTitle.replace(/[\s/\\:]+/g, '_');
    a.download = `HSR_Training_${cleanName}.md`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const quickSamples = [
    {
      title: 'فحص الهوائيات الراديوية وكابلات التغذية على سقف القطار',
      subsystem: 'GSM-R Cab Radio & Roof Antennas',
      type: 'ورقة عمل وتدريب ميداني مع قائمة تحقق (Checklist)',
    },
    {
      title: 'سيناريو عطل: فقدان إشارة الـ RBC داخل نفق جبلي طويل',
      subsystem: 'RBC & Leaky Feeder Tunnel Telecom',
      type: 'سيناريو عطل ميداني واقعي (Troubleshooting Case)',
    },
    {
      title: 'معايرة شوط ماكينة التحويلة وضبط أقفال الكلبشات (Clamp Locks)',
      subsystem: 'Point Machine Mechanical & Electrical Safety',
      type: 'دليل تدريبي هندسي متكامل',
    },
    {
      title: 'اختبار تقييمي في التوافق الكهرومغناطيسي لتيار الجر 25kV مع الإشارات',
      subsystem: '25kV Traction Return & EMC Immunization',
      type: 'اختبار تقييمي للمتدرب مع الإجابات النموذجية',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-800/80 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              مدعوم بنموذج الذكاء الاصطناعي التوليدي المتخصص (Gemini)
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              مولد الوثائق التدريبية وسيناريوهات الأعطال المخصصة
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              يمكنك كتابة أي موضوع أو معدة معينة مستخدمة في شبكتكم (مثل Siemens, Alstom, Thales, Frauscher) وسيقوم المولد بصياغة ملف تدريبي هندسي احترافي متكامل جاهز للتحميل والطباعة.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Generator Form */}
        <div className="lg:col-span-5 space-y-4">
          <form
            onSubmit={handleGenerate}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                معايير إعداد الوثيقة
              </h3>
              {initialTopic && (
                <button
                  type="button"
                  onClick={onClearInitialTopic}
                  className="text-xs text-slate-400 hover:text-rose-300"
                >
                  إلغاء التحديد المسبق
                </button>
              )}
            </div>

            {/* Quick Samples */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                أمثلة مواضيع سريعة من واقع الخطوط فائقة السرعة:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {quickSamples.map((sample, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setTopicTitle(sample.title);
                      setSubsystem(sample.subsystem);
                      setDocumentType(sample.type);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors text-right cursor-pointer"
                  >
                    {sample.title.slice(0, 38)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">
                عنوان الموضوع التدريبي / المنظومة: *
              </label>
              <input
                id="input-ai-topic-title"
                type="text"
                required
                value={topicTitle}
                onChange={(e) => setTopicTitle(e.target.value)}
                placeholder="مثال: فحص واستبدال هوائي الـ BTM أسفل عربة القطار..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Subsystem */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">
                النظام أو العتاد التقني المرتبط:
              </label>
              <input
                id="input-ai-subsystem"
                type="text"
                value={subsystem}
                onChange={(e) => setSubsystem(e.target.value)}
                placeholder="مثال: Alstom Atlas ETCS L2 / Frauscher RSR180 / Huawei GSM-R..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Document Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">
                نوع الوثيقة المطلوبة:
              </label>
              <select
                id="select-ai-doc-type"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              >
                <option value="دليل تدريبي هندسي متكامل">دليل تدريبي هندسي متكامل (Detailed Guide)</option>
                <option value="ورقة عمل وتدريب ميداني مع قائمة تحقق (Checklist)">ورقة عمل وتدريب ميداني مع قائمة تحقق (Field Worksheet)</option>
                <option value="سيناريو عطل ميداني واقعي (Troubleshooting Case)">سيناريو عطل ميداني واقعي وطريقة التحليل (Troubleshooting Case)</option>
                <option value="اختبار تقييمي للمتدرب مع الإجابات النموذجية">اختبار تقييمي للمتدرب مع الإجابات النموذجية (Quiz & Exam)</option>
                <option value="خطة صيانة وقائية واشتراطات أمان">خطة صيانة وقائية واشتراطات أمان (Maintenance Plan)</option>
              </select>
            </div>

            {/* Target Level */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">
                المستوى المستهدف:
              </label>
              <select
                id="select-ai-level"
                value={targetLevel}
                onChange={(e) => setTargetLevel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              >
                <option value="خريج جديد (Fresh Graduate Engineer)">خريج جديد (Fresh Graduate Engineer) - شرح تأسيسي وتطبيقي</option>
                <option value="مهندس مبتدئ (Junior Field Engineer)">مهندس مبتدئ (Junior Field Engineer) - تدريب حقلي متوسط</option>
                <option value="متخصص صيانة وتشخيص متقدم (Advanced Maintenance)">متخصص صيانة وتشخيص متقدم (Advanced Maintenance)</option>
              </select>
            </div>

            {/* Custom Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">
                تعليمات أو نقاط إضافية تريد التركيز عليها (اختياري):
              </label>
              <textarea
                id="textarea-ai-custom-prompt"
                rows={3}
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="مثال: التركيز على ظروف الطقس الحار، أو كيفية عزل التيار المكهرب، أو خطوات قراءة سجلات الصندوق الأسود..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
              />
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-950/50 border border-rose-800 rounded-xl text-xs text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              id="btn-submit-ai-generate"
              type="submit"
              disabled={isLoading || !topicTitle.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>جاري صياغة الوثيقة الهندسية...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>توليد الوثيقة التدريبية الآن</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Generated Document Preview */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col min-h-[520px]">
          {/* Output Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">معاينة الوثيقة المنشأة</span>
              {isOfflineResult && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-medium">
                  قالب قياسي مدمج
                </span>
              )}
            </div>

            {generatedContent && (
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer shadow-sm shadow-cyan-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل (.md)</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة</span>
                </button>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="flex-1 mt-4 overflow-y-auto max-h-[600px] text-slate-200">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
                  <Sparkles className="w-5 h-5 text-amber-400 absolute inset-0 m-auto animate-pulse" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">يقوم الذكاء الاصطناعي الآن بإعداد الملف التدريبي...</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    يتم تطبيق معايير السكك الحديدية الدولية (EN 50126 / SIL 4) وصياغة الشرح الهندسي وقوائم التحقق الحقلية.
                  </p>
                </div>
              </div>
            ) : generatedContent ? (
              <div className="prose prose-invert max-w-none text-xs sm:text-sm prose-headings:text-cyan-300 prose-headings:font-bold prose-h2:text-lg prose-h3:text-base prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white prose-table:border-collapse prose-th:border prose-th:border-slate-700 prose-th:p-2 prose-th:bg-slate-800/80 prose-td:border prose-td:border-slate-800 prose-td:p-2 prose-code:bg-slate-950 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-cyan-300">
                <Markdown>{generatedContent}</Markdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3 text-slate-400">
                <FileText className="w-10 h-10 text-slate-600 mb-1" />
                <h4 className="text-sm font-semibold text-slate-300">لم يتم توليد أي مستند بعد</h4>
                <p className="text-xs text-slate-400 max-w-md">
                  اختر أحد الأمثلة السريعة على اليمين أو أدخل عنوان الموضوع واضغط على زر "توليد الوثيقة التدريبية الآن".
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
