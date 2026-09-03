import React, { useState } from 'react';
import { PREBUILT_DOCUMENTS } from '../data/prebuiltDocuments';
import { PrebuiltDocument } from '../types';
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
} from 'lucide-react';

interface DocumentsDirectoryProps {
  onSelectDocument: (doc: PrebuiltDocument) => void;
}

export const DocumentsDirectory: React.FC<DocumentsDirectoryProps> = ({
  onSelectDocument,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadedDocId, setDownloadedDocId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'جميع الملفات' },
    { id: 'منهج وخطة', label: 'المناهج والخطط (Syllabus)' },
    { id: 'أدلة هندسية', label: 'الأدلة الهندسية (Guides)' },
    { id: 'تمارين حقلية', label: 'التمارين الحقلية (Worksheets)' },
    { id: 'سيناريوهات أعطال', label: 'سيناريوهات الأعطال (Cases)' },
    { id: 'سلامة وتقييم', label: 'السلامة والتقييم (Exams)' },
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

  const handleDownloadSingle = (doc: PrebuiltDocument, e: React.MouseEvent) => {
    e.stopPropagation();
    const blob = new Blob([doc.markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = doc.fileName;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadedDocId(doc.id);
    setTimeout(() => setDownloadedDocId(null), 2000);
  };

  const handleDownloadAll = () => {
    // Generate combined training handbook
    const combinedContent = `# 🚄 حقيبة تدريب مهندسي الاتصالات والإشارات - قطارات فائقة السرعة
**Comprehensive High-Speed Rail Telecom & Signalling Training Package**
تاريخ الإصدار: ${new Date().toLocaleDateString('ar-SA')}

---

${PREBUILT_DOCUMENTS.map((doc, idx) => `
================================================================================
## الملحق (${idx + 1}): ${doc.titleAr}
### ${doc.titleEn}
التصنيف: ${doc.category} | الجمهور المستهدف: ${doc.targetAudience}
================================================================================

${doc.markdownContent}
`).join('\n\n')}`;

    const blob = new Blob([combinedContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `HSR_Telecom_Signalling_Complete_Training_Package.md`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              الملفات التدريبية الجاهزة للتسليم والطباعة
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-medium">
              8 ملفات أساسية
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
            تمت صياغة هذه الملفات هندسياً بصيغة قابلة للطباعة الفورية والتسليم المباشر للمتدرب، وتشمل خطط الأسابيع، الأدلة الفنية، كراسات المهام والقياسات الحقلية، وسيناريوهات الأعطال ونماذج التقييم المعتمدة للجامعة.
          </p>
        </div>

        <button
          id="btn-download-all-package"
          onClick={handleDownloadAll}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer whitespace-nowrap flex-shrink-0"
        >
          <Archive className="w-4 h-4" />
          <span>تحميل الحقيبة التدريبية كاملة (.md)</span>
        </button>
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
            placeholder="ابحث في عناوين الملفات التدريبية (مثال: جدول 8 أسابيع, مهام حقلية, ETCS, GSM-R, سيناريوهات أعطال)..."
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

                  <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800" dir="ltr">
                    {doc.fileName.split('.').pop()?.toUpperCase()}
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

                <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5 border-t border-slate-800/80">
                  <span className="text-slate-500">الجمهور:</span>
                  <span className="text-slate-300">{doc.targetAudience}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDocument(doc);
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>عرض وقراءة الملف</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => handleDownloadSingle(doc, e)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-colors"
                    title="تحميل الملف مباشرة بصيغة .md"
                  >
                    {isDownloaded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">تم التحميل</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>تحميل</span>
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
