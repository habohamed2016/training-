import React, { useState } from 'react';
import { PREBUILT_DOCUMENTS } from '../data/prebuiltDocuments';
import { PrebuiltDocument } from '../types';
import {
  downloadDocumentAsPdfFile,
  printDocumentAsPdf,
  printAllDocumentsAsSinglePdf,
} from '../utils/pdfExport';
import {
  FileText,
  Download,
  Printer,
  Eye,
  Check,
  Search,
  BookOpen,
  Sparkles,
  Layers,
  ShieldCheck,
  Wrench,
  HelpCircle,
  Archive,
  FileCheck,
} from 'lucide-react';

interface DocumentsDirectoryProps {
  onSelectDocument: (doc: PrebuiltDocument) => void;
}

export const DocumentsDirectory: React.FC<DocumentsDirectoryProps> = ({
  onSelectDocument,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingDocId, setDownloadingDocId] = useState<string | null>(null);
  const [downloadedDocId, setDownloadedDocId] = useState<string | null>(null);
  const [isBatchDownloading, setIsBatchDownloading] = useState(false);

  const categories = [
    { id: 'all', label: 'جميع ملفات الـ PDF' },
    { id: 'منهج وخطة', label: 'المناهج والخطط (Syllabus PDF)' },
    { id: 'أدلة هندسية', label: 'الأدلة الهندسية (Guides PDF)' },
    { id: 'تمارين حقلية', label: 'التمارين الحقلية (Worksheets PDF)' },
    { id: 'سيناريوهات أعطال', label: 'سيناريوهات الأعطال (Cases PDF)' },
    { id: 'سلامة وتقييم', label: 'السلامة والتقييم (Exams PDF)' },
  ];

  const filteredDocs = PREBUILT_DOCUMENTS.filter((doc) => {
    const matchesCat = selectedCategory === 'all' || doc.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesCat;
    return (
      matchesCat &&
      (doc.titleAr.toLowerCase().includes(q) ||
        doc.titleEn.toLowerCase().includes(q) ||
        doc.summary.toLowerCase().includes(q) ||
        doc.targetAudience.toLowerCase().includes(q))
    );
  });

  const handleDownloadSinglePdf = async (doc: PrebuiltDocument, e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadingDocId(doc.id);
    try {
      await downloadDocumentAsPdfFile(doc);
      setDownloadedDocId(doc.id);
      setTimeout(() => setDownloadedDocId(null), 3000);
    } catch (err) {
      console.error('Failed to download PDF:', err);
      // Fallback to print dialog
      printDocumentAsPdf(doc);
    } finally {
      setDownloadingDocId(null);
    }
  };

  const handlePrintSinglePdf = (doc: PrebuiltDocument, e: React.MouseEvent) => {
    e.stopPropagation();
    printDocumentAsPdf(doc);
  };

  const handleDownloadAllAsSinglePdf = () => {
    printAllDocumentsAsSinglePdf(PREBUILT_DOCUMENTS);
  };

  const handleBatchDownloadAllPdfs = async () => {
    setIsBatchDownloading(true);
    try {
      for (const doc of PREBUILT_DOCUMENTS) {
        setDownloadingDocId(doc.id);
        await downloadDocumentAsPdfFile(doc);
        // Small pause between file triggers
        await new Promise((r) => setTimeout(r, 600));
      }
    } catch (e) {
      console.error('Error during batch PDF download:', e);
    } finally {
      setIsBatchDownloading(false);
      setDownloadingDocId(null);
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'منهج وخطة':
        return 'bg-blue-950/70 text-blue-300 border-blue-800/60';
      case 'أدلة هندسية':
        return 'bg-cyan-950/70 text-cyan-300 border-cyan-800/60';
      case 'تمارين حقلية':
        return 'bg-amber-950/70 text-amber-300 border-amber-800/60';
      case 'سيناريوهات أعطال':
        return 'bg-rose-950/70 text-rose-300 border-rose-800/60';
      case 'سلامة وتقييم':
        return 'bg-emerald-950/70 text-emerald-300 border-emerald-800/60';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner / Package download action */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-xl">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              الملفات التدريبية الهندسية بصيغة PDF الرسمية
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800/80 font-bold flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5" />
              8 ملفات PDF معتمدة
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
            جميع الملفات مجهزة بصيغة PDF جاهزة للطباعة والتسليم الفوري للمتدرب، متضمنة الهيدر الرسمي وشعار الهيئة ومصفوفة التقييم وخانات توقيع المشرف والمهندس المتدرب.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-shrink-0">
          <button
            id="btn-download-all-package-pdf"
            onClick={handleDownloadAllAsSinglePdf}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer whitespace-nowrap"
            title="تصدير الحقيبة التدريبية كاملة في ملف PDF واحد موحد"
          >
            <Printer className="w-4 h-4" />
            <span>حفظ الحقيبة كاملة PDF (ملف موحد)</span>
          </button>

          <button
            id="btn-batch-download-pdfs"
            disabled={isBatchDownloading}
            onClick={handleBatchDownloadAllPdfs}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
            title="تحميل كل ملف من الملفات الثمانية كملف PDF مستقل"
          >
            {isBatchDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                <span>جاري تصدير ملفات PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-cyan-400" />
                <span>تحميل الـ 8 ملفات منفصلة (PDF)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="input-docs-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في عناوين ملفات الـ PDF التدريبية (مثال: جدول 8 أسابيع, مهام حقلية, ETCS, GSM-R, سيناريوهات أعطال)..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pr-11 pl-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-cat-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => {
          const isDownloading = downloadingDocId === doc.id;
          const isDownloaded = downloadedDocId === doc.id;
          return (
            <div
              key={doc.id}
              id={`doc-card-${doc.id}`}
              onClick={() => onSelectDocument(doc)}
              className="bg-slate-900 border border-slate-800 hover:border-cyan-500/60 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:shadow-cyan-950/20 group cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-medium ${getCategoryBadge(doc.category)}`}>
                      {doc.category}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {doc.pagesEstimate}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/80 flex items-center gap-1" dir="ltr">
                    <FileText className="w-3 h-3" />
                    PDF
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {doc.titleAr}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">
                    {doc.titleEn}
                  </p>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {doc.summary}
                </p>

                <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">الجمهور:</span>
                    <span className="text-slate-300">{doc.targetAudience}</span>
                  </div>
                  <span className="text-[10px] text-cyan-400/90 font-medium">
                    معدّ للطباعة المباشرة
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDocument(doc);
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>معاينة وتصفح</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => handlePrintSinglePdf(doc, e)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                    title="طباعة أو تصدير فوري لـ PDF عالي الدقة"
                  >
                    <Printer className="w-3.5 h-3.5 text-cyan-400" />
                    <span>طباعة / حفظ</span>
                  </button>

                  <button
                    onClick={(e) => handleDownloadSinglePdf(doc, e)}
                    disabled={isDownloading}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer shadow-sm shadow-rose-600/30 disabled:opacity-50"
                    title="تحميل ملف PDF مباشرة"
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>جاري التجهيز...</span>
                      </>
                    ) : isDownloaded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>تم التحميل!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>تحميل PDF</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
