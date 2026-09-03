import React, { useState } from 'react';
import { HSR_DOMAINS, HSR_TOPICS } from '../data/hsrCurriculum';
import {
  UserCheck,
  Award,
  Printer,
  CheckCircle2,
  Calendar,
  Building2,
  User,
  ShieldCheck,
  Star,
  FileCheck,
  Edit3,
} from 'lucide-react';

interface TraineeTrackerProps {
  completedTopicIds: string[];
  onToggleTopicCompleted: (topicId: string) => void;
}

export const TraineeTracker: React.FC<TraineeTrackerProps> = ({
  completedTopicIds,
  onToggleTopicCompleted,
}) => {
  const [traineeName, setTraineeName] = useState('المهندس / متدرب خريج');
  const [universityName, setUniversityName] = useState('كلية الهندسة - قسم هندسة الاتصالات والإشارات');
  const [mentorName, setMentorName] = useState('كبير مهندسي الإشارات والاتصالات');
  const [hsrSection, setHsrSection] = useState('قطاع الخط فائق السرعة (HSR Corridor)');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [internshipWeeks, setInternshipWeeks] = useState(8);
  const [mentorNotes, setMentorNotes] = useState(
    'أظهر المتدرب التزاماً ممتازاً بقواعد السلامة الحقلية وفهماً عميقاً لمنظومة ETCS Level 2 وعدّادات المحاور الرقمية، وتمكن من تنفيذ القياسات الحقلية بدقة.'
  );

  const [skills, setSkills] = useState([
    {
      id: 'safety',
      title: 'الوعي الصارم بالسلامة الحقلية ومخاطر الكاتنري 25kV',
      score: 5,
      notes: 'التزام تام بمعدات PPE ومسافات الأمان.',
    },
    {
      id: 'theory',
      title: 'الاستيعاب النظري لمعمارية ETCS L2 وشبكة GSM-R',
      score: 4,
      notes: 'فهم ممتاز لمنحنيات الكبح وسلطة الحركة.',
    },
    {
      id: 'field_tools',
      title: 'مهارة استخدام أجهزة الفحص الميدانية (OTDR, Multimeter, Balise Tester)',
      score: 4,
      notes: 'إتقان القياسات ومطابقة المعايير.',
    },
    {
      id: 'troubleshooting',
      title: 'التحليل المنطقي وتشخيص الأعطال وقراءة السجلات (Logs)',
      score: 4,
      notes: 'تفكير هندسي سليم واستخلاص سريع للأسباب الجذرية.',
    },
    {
      id: 'reporting',
      title: 'الانضباط المهني وتوثيق التقارير الفنية الأسبوعية',
      score: 5,
      notes: 'دقة عالية في تعبئة كراسات المهام الحقلية.',
    },
  ]);

  const updateSkillScore = (id: string, newScore: number) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, score: newScore } : s))
    );
  };

  const progressPercentage = Math.round(
    (completedTopicIds.length / Math.max(1, HSR_TOPICS.length)) * 100
  );

  const averageScore = (
    skills.reduce((acc, curr) => acc + curr.score, 0) / skills.length
  ).toFixed(1);

  const handlePrint = () => {
    const reportElem = document.getElementById('official-evaluation-certificate');
    if (!reportElem) {
      window.print();
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
        <head>
          <meta charset="UTF-8" />
          <title>تقرير تقييم واعتماد المتدرب - ${traineeName} - PDF</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
          <style>
            @page {
              size: A4;
              margin: 14mm 12mm 14mm 12mm;
            }
            body {
              margin: 0;
              padding: 0;
              background: #fff;
              color: #0f172a;
              font-family: 'IBM Plex Sans Arabic', sans-serif;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            @media print {
              .no-print {
                display: none !important;
              }
            }
            .toolbar {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              background: #0f172a;
              color: #fff;
              padding: 12px 24px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              z-index: 9999;
            }
            .toolbar button {
              background: #0284c7;
              color: #fff;
              border: none;
              padding: 8px 18px;
              font-weight: bold;
              font-size: 14px;
              border-radius: 6px;
              cursor: pointer;
              font-family: inherit;
            }
            .certificate-wrapper {
              margin-top: 60px;
              padding: 20px 24px;
              max-width: 800px;
              margin-left: auto;
              margin-right: auto;
            }
          </style>
        </head>
        <body>
          <div class="toolbar no-print">
            <div>
              <strong>تقرير التقييم الميداني والاعتماد الأكاديمي (PDF)</strong>
              <span style="font-size: 12px; color: #94a3b8; margin-right: 12px;">اختر "Save as PDF" أو "حفظ بتنسيق PDF" في خيارات الطابعة</span>
            </div>
            <button onclick="window.print()">🖨️ حفظ وطباعة التقرير (PDF)</button>
          </div>
          <div class="certificate-wrapper">
            ${reportElem.outerHTML}
          </div>
          <script>
            setTimeout(() => {
              window.print();
            }, 600);
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Print Action */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              لوحة متابعة وتقييم المتدرب والاعتماد الأكاديمي
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              تقرير رسمي معتمد
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
            يمكنك هنا تسجيل بيانات المتدرب، متابعة إنجاز المواضيع الأسبوعية، تقييم الكفاءات الفنية، وطباعة التقرير الرسمي لتقديمه لعمادة الكلية أو إدارة الموارد البشرية.
          </p>
        </div>

        <button
          id="btn-print-eval-report"
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-md shadow-cyan-500/20 transition-all cursor-pointer whitespace-nowrap self-start md:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>طباعة تقرير التقييم الرسمي (PDF)</span>
        </button>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/70 border border-cyan-800 text-cyan-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block">المواضيع المنجزة</span>
            <span className="text-2xl font-bold text-white">
              {completedTopicIds.length} <span className="text-xs text-slate-400 font-normal">من {HSR_TOPICS.length}</span>
            </span>
            <div className="w-28 bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-cyan-400 h-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800 text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block">متوسط تقييم الكفاءات</span>
            <span className="text-2xl font-bold text-white">
              {averageScore} <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
            </span>
            <span className="text-[11px] text-emerald-400 block mt-0.5">
              {Number(averageScore) >= 4.5 ? 'تقدير: ممتاز (A+)' : 'تقدير: جيد جداً'}
            </span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-950/70 border border-amber-800 text-amber-400">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block">مدة البرنامج المعتمدة</span>
            <span className="text-2xl font-bold text-white">
              {internshipWeeks} <span className="text-xs text-slate-400 font-normal">أسابيع تدريبية</span>
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              ميداني + مركزي
            </span>
          </div>
        </div>
      </div>

      {/* Main Form & Report Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Editable Details */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
            <Edit3 className="w-4 h-4 text-cyan-400" />
            بيانات المتدرب والبرنامج
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              اسم المتدرب:
            </label>
            <input
              id="input-trainee-name"
              type="text"
              value={traineeName}
              onChange={(e) => setTraineeName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              الجامعة والقسم الأكاديمي:
            </label>
            <input
              id="input-trainee-university"
              type="text"
              value={universityName}
              onChange={(e) => setUniversityName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                المهندس المشرف:
              </label>
              <input
                id="input-mentor-name"
                type="text"
                value={mentorName}
                onChange={(e) => setMentorName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                مدة التدريب (أسابيع):
              </label>
              <input
                id="input-internship-weeks"
                type="number"
                min={4}
                max={16}
                value={internshipWeeks}
                onChange={(e) => setInternshipWeeks(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              موقع الخط أو المحطة:
            </label>
            <input
              id="input-hsr-section"
              type="text"
              value={hsrSection}
              onChange={(e) => setHsrSection(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>

          {/* Competency Evaluation Sliders */}
          <div className="pt-2 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-cyan-400">
              تقييم الكفاءات الفنية للمتدرب:
            </h4>
            {skills.map((skill) => (
              <div key={skill.id} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-200">{skill.title}</span>
                  <span className="font-bold text-cyan-400">{skill.score} / 5</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => updateSkillScore(skill.id, val)}
                      className={`flex-1 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                        val <= skill.score
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              التوصية والملاحظات الختامية للمشرف:
            </label>
            <textarea
              id="textarea-mentor-notes"
              rows={3}
              value={mentorNotes}
              onChange={(e) => setMentorNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white resize-none"
            />
          </div>
        </div>

        {/* Right Side: University Official Printable Report Preview */}
        <div className="lg:col-span-7 bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 print:m-0 print:p-4">
          {/* Report Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-700 block">
                المملكة العربية السعودية / قطاع السكك الحديدية فائقة السرعة
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-950 mt-0.5">
                شهادة وتقييم إتمام التدريب الميداني لمهندس الاتصالات والإشارات
              </h2>
              <p className="text-xs text-slate-600 font-mono mt-0.5" dir="ltr">
                High-Speed Rail Telecom & Signalling Internship Official Report
              </p>
            </div>
            <div className="text-left font-mono text-xs text-slate-500 self-end sm:self-auto" dir="ltr">
              Ref: HSR-INT-{new Date().getFullYear()}-{(completedTopicIds.length + 101)}
            </div>
          </div>

          {/* Trainee Profile Table */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-500 block">اسم الطالب المتدرب:</span>
              <span className="font-bold text-slate-900 text-sm">{traineeName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">الجامعة والقسم:</span>
              <span className="font-bold text-slate-900">{universityName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">المشرف الميداني:</span>
              <span className="font-bold text-slate-900">{mentorName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">قطاع العمل الميداني:</span>
              <span className="font-bold text-slate-900">{hsrSection}</span>
            </div>
          </div>

          {/* Curriculum Completed Topics Summary */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
              المحاور الهندسية التي تدرب عليها الطالب:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {HSR_DOMAINS.map((domain) => {
                const count = HSR_TOPICS.filter(
                  (t) => t.domainId === domain.id && completedTopicIds.includes(t.id)
                ).length;
                return (
                  <div
                    key={domain.id}
                    className="flex items-center justify-between p-2 rounded bg-slate-100/70 border border-slate-200"
                  >
                    <span className="font-medium text-slate-800 text-[11px]">{domain.titleAr}</span>
                    <span className="font-mono text-[10px] font-bold text-slate-600">
                      {count} / {domain.topicsCount} موضوع
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Evaluation Table */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
              مصفوفة تقييم الكفاءات الهندسية (Evaluation Rubric):
            </h4>
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="p-2 border border-slate-200 font-bold">المعيار الفني</th>
                  <th className="p-2 border border-slate-200 font-bold text-center w-20">الدرجة (من 5)</th>
                  <th className="p-2 border border-slate-200 font-bold">ملاحظات المشرف</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((s) => (
                  <tr key={s.id} className="border-b border-slate-200">
                    <td className="p-2 border border-slate-200 font-medium text-slate-800">{s.title}</td>
                    <td className="p-2 border border-slate-200 font-bold text-center text-cyan-800">
                      {s.score}
                    </td>
                    <td className="p-2 border border-slate-200 text-slate-600">{s.notes}</td>
                  </tr>
                ))}
                <tr className="bg-slate-100/80 font-bold">
                  <td className="p-2 border border-slate-200">المعدل العام للتقييم:</td>
                  <td className="p-2 border border-slate-200 text-center text-emerald-700 text-sm">
                    {averageScore} / 5.0
                  </td>
                  <td className="p-2 border border-slate-200 text-emerald-800">
                    {Number(averageScore) >= 4.5 ? 'تقدير عام: ممتاز مع مرتبة الشرف' : 'تقدير عام: جيد جداً'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mentor Recommendation */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-900 block mb-1">توصية الإدارة المشرفة للجامعة:</span>
            {mentorNotes}
          </div>

          {/* Official Signatures */}
          <div className="pt-6 border-t border-slate-300 grid grid-cols-3 gap-4 text-center text-xs">
            <div>
              <span className="text-slate-500 block">المهندس المتدرب</span>
              <span className="font-bold text-slate-900 block mt-1">{traineeName}</span>
              <div className="mt-6 border-b border-dashed border-slate-400 w-32 mx-auto" />
              <span className="text-[10px] text-slate-400">التوقيع والتاريخ</span>
            </div>

            <div>
              <span className="text-slate-500 block">المهندس المشرف الميداني</span>
              <span className="font-bold text-slate-900 block mt-1">{mentorName}</span>
              <div className="mt-6 border-b border-dashed border-slate-400 w-32 mx-auto" />
              <span className="text-[10px] text-slate-400">التوقيع والاعتماد</span>
            </div>

            <div>
              <span className="text-slate-500 block">ختم إدارة الإشارات والاتصالات</span>
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-400 flex items-center justify-center mx-auto mt-2 text-[9px] text-slate-400 font-bold uppercase">
                ختم الإدارة
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
