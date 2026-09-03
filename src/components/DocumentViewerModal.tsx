import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { PrebuiltDocument } from '../types';
import { X, Download, Printer, Copy, Check, FileText, Share2, BookOpen } from 'lucide-react';

interface DocumentViewerModalProps {
  document: PrebuiltDocument | null;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!document) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(document.markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([document.markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = document.fileName || `${document.titleEn.replace(/\s+/g, '_')}.md`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/95 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sticky top-0 z-10">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/70 border border-cyan-800/60 text-cyan-400 mt-1 sm:mt-0 flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {document.category}
                </span>
                <span className="text-xs text-slate-400">
                  {document.pagesEstimate}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-1">
                {document.titleAr}
              </h2>
              <p className="text-xs text-slate-400 font-mono" dir="ltr">
                {document.titleEn}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
            <button
              id="btn-copy-doc"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="نسخ المحتوى"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
            </button>

            <button
              id="btn-download-doc"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer shadow-sm shadow-cyan-500/30"
              title="تحميل كملف Markdown"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل الملف (.md)</span>
            </button>

            <button
              id="btn-print-doc"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="طباعة أو حفظ بصيغة PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة / PDF</span>
            </button>

            <button
              id="btn-close-modal"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Markdown Content */}
        <div className="p-5 sm:p-8 overflow-y-auto text-slate-200 leading-relaxed space-y-4 print:p-0 print:bg-white print:text-black">
          {/* Printable Header */}
          <div className="hidden print:block border-b-2 border-black pb-4 mb-6">
            <h1 className="text-xl font-bold">{document.titleAr}</h1>
            <p className="text-sm">{document.titleEn}</p>
            <p className="text-xs mt-1">High-Speed Rail Telecom & Signalling Training Program</p>
          </div>

          <div className="prose prose-invert max-w-none prose-headings:text-cyan-300 prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white prose-table:border-collapse prose-th:border prose-th:border-slate-700 prose-th:p-2 prose-th:bg-slate-800/80 prose-td:border prose-td:border-slate-800 prose-td:p-2 prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-cyan-300 prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800">
            <Markdown>{document.markdownContent}</Markdown>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <span>منصة تدريب مهندسي الاتصالات والإشارات - القطارات فائقة السرعة</span>
            <span>ملف جاهز للتسليم والتدريب الميداني</span>
          </div>
        </div>

      </div>
    </div>
  );
};
