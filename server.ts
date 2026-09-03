import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "10mb" }));

  // API: Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // API: Generate specialized HSR Telecom & Signalling documents
  app.post("/api/generate-training-doc", async (req, res) => {
    try {
      const {
        topicTitle,
        subsystem,
        level = "مبتدئ إلى متوسط (مهندس حديث التخرج)",
        documentType = "comprehensive_guide",
        customPrompt = "",
      } = req.body;

      if (!topicTitle) {
        return res.status(400).json({ error: "topicTitle is required" });
      }

      const ai = getGenAI();
      if (!ai) {
        // Fallback response with structured high-speed rail engineering content
        return res.json({
          success: true,
          isOffline: true,
          content: `## 📘 دليل تدريبي مخصص: ${topicTitle}
**النظام الفرعي:** ${subsystem || "نظم الإشارات والاتصالات للقطارات فائقة السرعة"}
**المستوى المستهدف:** ${level}

> ⚠️ ملاحظة: تم إنشاء هذا الدليل بالاعتماد على القالب الهندسي المدمج (يمكن تفعيل مفتاح Gemini API في إعدادات البيئة لتوليد تدريبات وسيناريوهات ديناميكية لا نهائية).

---

### 1. الأهداف التعليمية للمتدرب (Learning Objectives)
1. فهم المبادئ الفيزيائية والهندسية الأساسية الخاصة بنظام **${topicTitle}**.
2. التعرف على المكونات الداخلية والخارجية (On-board & Trackside Equipment).
3. استيعاب متطلبات السلامة والأمان الصارمة (SIL 4 / CENELEC EN 50126/128/129).
4. تطبيق إجراءات الصيانة الوقائية والقياسات الحقلية وفق المعايير العالمية.

### 2. البنية المعمارية للنظام (System Architecture)
- **معدات الخط (Trackside Subsystems):** كابلات الألياف الضوئية، غرف التتابع الإشاراتية (SER)، وحدات التغذية غير المنقطعة (UPS).
- **معدات القطار (On-Board Subsystems):** هوائيات الاستقبال، حاسوب القطار الحيوي (Vital Train Computer)، شاشة السائق (DMI).
- **واجهات الربط (Interfaces):** بروتوكولات الاتصال الآمنة، الربط مع مركز التحكم (CTC)، والتكامل مع نظام الطاقة الكاتنري (25kV 50Hz).

### 3. المهام الحقلية العملية المطلوبة من الطالب (Field Hands-on Tasks)
- [ ] **المهمة 1:** مراجعة المخططات الهندسية (Schematic Diagrams & Cable Route Layouts) في غرفة الإشارات.
- [ ] **المهمة 2:** إجراء القياسات الحقلية لجهد التشغيل ومقاومة العزل (Insulation Resistance) ومستوى التردد.
- [ ] **المهمة 3:** مطابقة قراءات السجلات التشغيلية (Event Logs / Maintenance Diagnostic Logs) مع الأحداث الحقيقية للقطار.
- [ ] **المهمة 4:** تطبيق محاكاة لاختبار التكرارية وفشل أحد الخطوط (Redundancy Switchover Test).

### 4. سيناريو عطل واقعي وتصحيحي (Troubleshooting Scenario)
- **وصف العطل:** رصد تنبيه بانخفاض جودة الإشارة أو فقدان الاتصال عند مرور قطار بسرعة 300 كم/ساعة.
- **خطوات التحليل التشخيصي:**
  1. فحص سجلات أحداث الـ Event Logger لتحديد التوقيت بدقة الميلي ثانية.
  2. قياس مستوى الإشارة المتبادلة وتحليل تأثير دوبلر (Doppler Shift).
  3. فحص التوصيلات الفيزيائية وتأريض الهوائيات والأجهزة.
  4. إجراء اختبار المسير التجريبي (Test Run) قبل اعتماد الخدمة.

### 5. أسئلة تقييم ومناقشة للمشرف مع المتدرب
1. ما الفرق بين أسلوب العمل الآمن (Fail-Safe) والتصميم التكراري (Fault-Tolerant) في هذا النظام؟
2. كيف تضمن استمرارية نقل البيانات عند سرعة 300+ كم/س مقارنة بالخطوط التقليدية؟
3. ما الإجراء الفوري المتبع في حال تعطل هذا النظام أثناء رحلة قطار تجارية؟`,
        });
      }

      const systemPrompt = `أنت خبير واستشاري أول في هندسة اتصالات وإشارات القطارات فائقة السرعة (High-Speed Rail Signaling & Telecom Chief Engineer).
المستخدم هو مهندس مشرف ميداني لديه متدرب خريج جديد من قسم هندسة الاتصالات والإشارات.
المطلوب منك صياغة ملف تدريبي عالي المستوى، احترافي، دقيق هندسياً، وجاهز للطباعة والتسليم المباشر للمتدرب.

استخدم المصطلحات الهندسية الدقيقة بالإنجليزية بجانب الشرح العربي الاحترافي (مثل: ERTMS/ETCS Level 2, RBC, GSM-R, FRMCS, CBI, SIL 4, Axle Counters, Eurobalise, Movement Authority, Doppler Shift, Redundancy, Trackside vs On-board).

نوع الوثيقة المطلوبة: ${documentType}
الموضوع الرئيسي: ${topicTitle}
النظام: ${subsystem}
المستوى: ${level}
طلب مخصص: ${customPrompt || "إعداد مادة تدريبية متكاملة"}

الهيكل المطلوب:
1. مقدمة هندسية والأهمية في القطار فائق السرعة
2. المعمارية الفنية والمكونات (Trackside & On-board)
3. البروتوكولات ومعايير السلامة (CENELEC EN standards & SIL-4)
4. المهام العملية وقائمة التحقق الميدانية للمتدرب (Checklist)
5. سيناريو عطل ميداني واقعي (Troubleshooting Case Study) مع خطوات التشخيص
6. اختبار تقييمي من 4 أسئلة فنية مع الإجابات النموذجية ونقاط التقييم للمشرف`;

      let generatedText: string | null = null;
      let isOffline = false;

      if (ai) {
        try {
          const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `قم بإعداد وثيقة تدريبية شاملة للمتدرب حول الموضوع: "${topicTitle}" في نظام "${subsystem}". ${customPrompt ? `ملاحظات إضافية: ${customPrompt}` : ""}`,
                  },
                ],
              },
            ],
            config: {
              systemInstruction: systemPrompt,
              temperature: 0.3,
            },
          });
          generatedText = response.text || null;
        } catch (genError: any) {
          console.warn("Gemini API call warning (using fallback engineering generator):", genError?.message);
          isOffline = true;
        }
      }

      if (!generatedText) {
        isOffline = true;
        generatedText = `# 📘 الدليل الهندسي والتدريبي الميداني: ${topicTitle}
**النظام المستهدف:** ${subsystem || "الاتصالات والإشارات للقطارات فائقة السرعة"}
**المستوى:** ${level} | **نوع الوثيقة:** ${documentType}
**تاريخ الإصدار:** ${new Date().toLocaleDateString('ar-SA')}

---

## 1. المقدمة والأهمية في منظومة القطارات فائقة السرعة (300+ km/h)
يمثل نظام **${topicTitle}** ركيزة حيوية في ضمان الأمان التشغيلي التام للقطار فائق السرعة. نظراً لأن القطار يقطع أكثر من 83 متراً في الثانية، فإن أي تأخير أو خطأ في الإشارات قد يؤدي إلى عواقب وخيمة. لذلك يخضع هذا النظام لمعايير السلامة الأوروبية الصارمة **CENELEC EN 50126 / EN 50128 / EN 50129** ومستوى السلامة الأقصى **SIL 4 (Safety Integrity Level 4)** بمعدل خطأ أقل من $10^{-9}$ في الساعة.

---

## 2. البنية المعمارية وتوزيع التجهيزات (Architecture & Interfaces)

### أ) تجهيزات المسار الحقلية (Trackside Subsystems):
- كبائن التجهيزات في غرف الإشارات (SER/TER) على طول المسار.
- مسارات كابلات الألياف الضوئية والتأريض المنفصل (Clean Earth < 1.0 Ohm).
- الحساسات ووحدات القياس التفاعلية وموانع الصواعق (Surge Protection Devices).

### ب) تجهيزات القطار والقمرة (On-board Subsystems):
- حاسوب القطار الحيوي (European Vital Computer - EVC) أو وحدة الاتصال الراديوية.
- واجهة السائق والآلة (DMI) وهوائيات الاستقبال السفلية والعلوية.
- دائرة كبح الطوارئ الآمنة (Fail-Safe Emergency Brake Loop).

### ج) واجهات الربط (Vital Interfaces):
- الربط مع مركز التحكم والتشغيل المركزي (CTC / OCC).
- التكامل الكهرومغناطيسي مع شبكة الجر الكهربائي العالي للقطار (25kV 50Hz Traction Return Current).

---

## 3. قائمة التحقق والمهام الحقلية العملية للمتدرب (Trainee Field Checklist)

- [ ] **المهمة الأولى: إجراءات السلامة والحصول على تصريح العمل**
  - التأكد من ارتداء معدات الوقاية الشخصية (PPE) وحذاء الأمان المانع للانزلاق.
  - التحقق من بعد العمل عن خط الكاتنري المكهرب (لا يقل عن 2.75 متر).
  
- [ ] **المهمة الثانية: مراجعة المخططات الهندسية (Schematics & Route Plans)**
  - مطابقة أرقام الكابلات والمنافذ مع المخطط الهندسي المعتمد (As-Built Drawings).
  
- [ ] **المهمة الثالثة: القياسات الكهربائية والميكانيكية**
  - قياس جهود التغذية المستمرة والمترددة بدقة، والتأكد من مطابقتها لنطاق التفاوت المسموح (±5%).
  - قياس مقاومة العزل والتأريض وتسجيل القيم في كراس الصيانة.
  
- [ ] **المهمة الرابعة: فحص سجلات الأحداث (Diagnostic Event Logs)**
  - استخراج سجلات الأحداث اليومية للوحدة وتحليل أي أخطاء أو تحذيرات سابقة.

---

## 4. دراسة حالة ميدانية وعطل واقعي (Troubleshooting Scenario)
- **وصف العطل:** رصد انخفاض غير مبرر في جودة الإشارة أو ظهور تنبيه انقطاع مؤقت (Intermittent Communication Loss) عند مرور قطار بسرعة عالية.
- **منهجية التشخيص الهندسي:**
  1. مقارنة التوقيت الزمني الدقيق للحادثة مع سجلات القطار (JRU) وسجلات السكة لتحديد النقطة الكيلومترية (KP).
  2. فحص التوصيلات الفيزيائية وكابلات التغذية وهوائيات الإرسال للتأكد من عدم وجود ارتخاء ناتج عن الاهتزازات.
  3. قياس نسبة الفقد الراديوي أو البصري باستخدام أجهزة الفحص المتخصصة (OTDR أو Spectrum Analyzer).
  4. استبدال الكرت أو الحساس المشتبه به، وتطبيق اختبار التكرارية والمحاكاة قبل إعادة المقطع للخدمة.

---

## 5. أسئلة اختبار وتقييم موجهة للمتدرب مع الإجابات النموذجية

**س1: ما هو المبدأ الأساسي لـ "الفشل الآمن" (Fail-Safe Principle) في هذا النظام؟**
- *الإجابة النموذجية:* يعني أنه في حال حدوث أي عطل كهربائي، أو انقطاع في التغذية، أو تلف كابل، يجب أن ينتقل النظام تلقائياً إلى الوضعية الأكثر أماناً (Most Restrictive / Safe State)، مثل كبح القطار أو إشغال المقطع، لمنع أي خطر تصادم.

**س2: كيف يؤثر تيار الجر الكهربائي 25kV العائد عبر القضبان على عمل أنظمة الإشارات؟**
- *الإجابة النموذجية:* تيار الجر العالي يولد مجالات كهرومغناطيسية وتوافقات تيار هائلة (Harmonics)، ولذلك يتم استخدام ترددات محصنة وفلاتر رقمية ونقاط تأريض مخصصة (S-Bonds / Impedance Bonds) لمنع تداخل تيار الجر مع إشارات الكشف.

**س3: ما الفرق بين الصيانة الوقائية (Preventive Maintenance) والصيانة التصحيحية (Corrective Maintenance)؟**
- *الإجابة النموذجية:* الصيانة الوقائية تتم وفق جدول زمني دوري (يومي/أسبوعي/شهري) لفحص القياسات وتغيير الأجزاء المستهلكة قبل تعطلها، بينما التصحيحية هي التدخل الطارئ لإصلاح عطل مفاجئ حدث أثناء التشغيل.

---

### ✍️ خانة اعتماد وتوقيع المهندس المشرف
- **ملاحظات المشرف على أداء المتدرب:** ________________________________________
- **توقيع المشرف:** ________________________  **التاريخ:** ____/____/________م`;
      }

      return res.json({
        success: true,
        content: generatedText,
        isOffline,
      });
    } catch (err: any) {
      console.error("Error generating training document:", err);
      return res.status(500).json({
        error: "حدث خطأ أثناء توليد المستند التدريبي",
        details: err.message,
      });
    }
  });

  // Vite development middleware or static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`HSR Training Server running on http://localhost:${PORT}`);
  });
}

startServer();
