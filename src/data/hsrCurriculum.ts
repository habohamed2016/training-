import { HSRDomain, HSRTopic } from '../types';

export const HSR_DOMAINS: HSRDomain[] = [
  {
    id: 'etcs',
    titleAr: 'أنظمة الحماية والتحكم الآلي بالقطار (ERTMS / ETCS)',
    titleEn: 'European Train Control System & ATP',
    iconName: 'ShieldAlert',
    badge: 'SIL 4 Critical',
    descriptionAr: 'منظومة الأمان الأوروبية الموحدة للقطارات فائقة السرعة، تشمل مركز حظر الراديو (RBC)، حاسوب القطار الحيوي (EVC)، وسلطة الحركة (MA).',
    topicsCount: 5,
    color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30',
  },
  {
    id: 'gsmr',
    titleAr: 'الاتصالات اللاسلكية الحرجة (GSM-R & FRMCS)',
    titleEn: 'Railway Wireless Telecom & 5G-R',
    iconName: 'Radio',
    badge: 'Mission-Critical',
    descriptionAr: 'شبكة الاتصال اللاسلكي المخصصة للسكك الحديدية، وتأثير دوبلر عند سرعة 300 كم/س، وإدارة التسليم السلس (Handover) والتحول نحو 5G-R.',
    topicsCount: 5,
    color: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/30',
  },
  {
    id: 'detection',
    titleAr: 'أنظمة الكشف عن القطارات (Train Detection)',
    titleEn: 'Axle Counters & Track Circuits',
    iconName: 'Activity',
    badge: 'Trackside Safety',
    descriptionAr: 'عدادات المحاور الرقمية (DAC) ومجسات العجلات الكهرومغناطيسية، والتوافق مع تيار الجر العالي للقطار الكهربائي (25kV 50Hz EMC).',
    topicsCount: 4,
    color: 'border-amber-500/40 text-amber-400 bg-amber-950/30',
  },
  {
    id: 'interlocking',
    titleAr: 'التشابك الإلكتروني والتحاويل (CBI & Point Machines)',
    titleEn: 'Computer-Based Interlocking & Turnouts',
    iconName: 'GitMerge',
    badge: 'Fail-Safe Architecture',
    descriptionAr: 'منطق الربط المحوسب، تكرارية الأجهزة (2oo2 / 2oo3)، ماكينات التحاويل الكهروميكانيكية فائقة السرعة وإقفال المسارات الآمن.',
    topicsCount: 4,
    color: 'border-indigo-500/40 text-indigo-400 bg-indigo-950/30',
  },
  {
    id: 'ctc_scada',
    titleAr: 'التحكم المركزي ومراقبة الخط (CTC & Trackside SER)',
    titleEn: 'Centralized Traffic Control & SER Rooms',
    iconName: 'MonitorCheck',
    badge: 'Operations & SCADA',
    descriptionAr: 'مراكز التحكم والتشغيل (OCC / CTC)، واجهات SCADA، ومراقبة حرارة المحاور (HABD) والرياح الشديدة، وغرف التتابع (SER).',
    topicsCount: 4,
    color: 'border-purple-500/40 text-purple-400 bg-purple-950/30',
  },
  {
    id: 'rams_safety',
    titleAr: 'هندسة الموثوقية والسلامة (RAMS & Standards)',
    titleEn: 'Railway Standards (EN 50126/128/129)',
    iconName: 'Award',
    badge: 'Standards & Compliance',
    descriptionAr: 'معايير CENELEC الدولية، تحليل المخاطر FMEA، إدارة الحوادث الطارئة، وإجراءات السلامة للعمل بجوار الخط المكهرب 25 ألف فولت.',
    topicsCount: 4,
    color: 'border-rose-500/40 text-rose-400 bg-rose-950/30',
  },
];

export const HSR_TOPICS: HSRTopic[] = [
  // 1. ETCS
  {
    id: 'etcs-01',
    code: 'ETCS-L2-01',
    domainId: 'etcs',
    titleAr: 'مستويات نظام ERTMS والفوارق الجوهرية لـ ETCS Level 2',
    titleEn: 'ERTMS System Levels & ETCS Level 2 Fundamentals',
    estimatedWeeks: 1,
    importanceLevel: 'حرج جداً (Safety-Critical)',
    summaryAr: 'دراسة التطور بين مستويات ETCS (0, 1, 2, 3)، مع التركيز الكامل على المستوى الثاني الذي يلغي الإشارات الضوئية الميدانية ويستبدلها بسلطة حركة لاسلكية مستمرة عبر GSM-R وشاشة السائق.',
    summaryEn: 'Deep dive into ETCS levels with core focus on Level 2: radio-based continuous Movement Authority, elimination of physical signals, and cab signalling at speeds up to 320 km/h.',
    keyConcepts: [
      'الفرق بين الإشارات اللونية التقليدية والإشارة في قمرة القيادة (Cab Signalling)',
      'سلطة الحركة (Movement Authority - MA) وكيفية حساب المسافة المسموح بها',
      'منحنيات الكبح الآلي ومسافات الأمان عند سرعة 300 كم/ساعة',
      'حالات التراجع الطارئة (Fallback Modes: Staff Responsible, On Sight, Shunting)',
    ],
    equipmentTrackside: ['Radio Block Centre (RBC)', 'Eurobalise fixed/transparent', 'LEU (Lineside Electronic Unit)'],
    equipmentOnboard: ['EVC (European Vital Computer)', 'BTM (Balise Transmission Module)', 'DMI (Driver Machine Interface)', 'Odometer Radar & Wheel Sensors'],
    fieldTasks: [
      'فحص واجهة RBC في غرفة التحكم ومراقبة إصدار سلطات الحركة الحية للقطارات.',
      'معاينة شاشة السائق DMI أثناء فحص قطار تجريبي في ورشة الصيانة وقراءة منحنى السرعة.',
      'مراجعة سجلات الـ Juridical Recording Unit (JRU) الصندوق الأسود للقطار.',
    ],
    safetyRules: [
      'يمنع تجاوز أي سلطة حركة (SPAD) ويطبق القطار كبح الطوارئ الفوري التلقائي.',
      'اتباع بروتوكولات الفشل الآمن (Fail-Safe) عند حدوث أي خلل في حاسوب القطار.',
    ],
    interviewQuestions: [
      {
        question: 'لماذا لا يمكن الاعتماد على الإشارات الضوئية الميدانية التقليدية عند سرعات تفوق 200 كم/س؟',
        answerKey: 'لأن زمن رد فعل السائق البشري لا يسمح برؤية الإشارة بوضوح عند سرعة 83 متراً في الثانية (300 كم/س)، ومسافة التوقف قد تتجاوز 3 إلى 4 كيلومترات، مما يستلزم نظام Cab Signalling مثل ETCS L2.',
      },
      {
        question: 'ما هو دور جهاز الـ Eurobalise في نظام ETCS Level 2 رغم أن سلطة الحركة ترسل عبر الراديو؟',
        answerKey: 'في المستوى الثاني، تستخدم الباليزات الأرضية كعلامات تموضع جغرافي دقيقة (Geographic Reference Points) لإعادة معايرة عداد المسافات (Odometer) للقطار، بالإضافة إلى إرسال أوامر بدء الاتصال بالـ RBC وتحديد الانحدار الجغرافي.',
      },
    ],
  },
  {
    id: 'etcs-02',
    code: 'ETCS-RBC-02',
    domainId: 'etcs',
    titleAr: 'مركز حظر الراديو (RBC) وإدارة التقاطعات والحدود',
    titleEn: 'Radio Block Centre (RBC) Architecture & Handover',
    estimatedWeeks: 1.5,
    importanceLevel: 'حرج جداً (Safety-Critical)',
    summaryAr: 'بنية خادم الـ RBC الذي يمثل عقل الإشارات في الخط فائق السرعة، ومطابقة حالة خلو السكة من نظام التشابك (CBI) وإرسال رسائل التلغراف المشفرة عبر شبكة GSM-R للقطار.',
    summaryEn: 'Architecture of RBC hardware & software, safety loops, boundary handovers between adjacent RBCs, and secure EuroRadio protocol Euroradio (Euroradio Layers).',
    keyConcepts: [
      'بروتوكول Euroradio وطبقات التشفير الآمن (KMC - Key Management Centre)',
      'عملية نقل القطار السلس بين منطقتي RBC (RBC-to-RBC Boundary Handover)',
      'الواجهة البينية بين نظام التشابك (CBI) والـ RBC (Vital Safe Ethernet / Serial)',
      'إدارة حالات انقطاع الاتصال اللاسلكي (Radio Infill & Communication Loss Timer)',
    ],
    equipmentTrackside: ['RBC Server 2oo3 Hardware', 'KMC Server', 'Safe Signalling LAN Gateway', 'NTP Time Server'],
    equipmentOnboard: ['EuroRadio GSM-R Transceiver', 'EVC Radio Module'],
    fieldTasks: [
      'فحص السجلات التشغيلية (Diagnostic Logs) لخادم الـ RBC في غرفة الاتصالات الرئيسية.',
      'تتبع عملية Handover بين مركزين عبر شاشات المراقبة الفنية لقطار مسافر في الخط.',
      'محاكاة سيناريو قطع أحد خطوط الربط المزدوجة ومراقبة التبديل الآلي دون فقد الاتصال.',
    ],
    safetyRules: [
      'إدارة مفاتيح التشفير KMC تخضع لإجراءات أمنية مشددة لحماية شبكة التحكم بالقطارات.',
      'ضبط توقيتات انقطاع الاتصال (Radio Timeout T_NVCONTACT) بدقة لمنع التوقف غير المبرر.',
    ],
    interviewQuestions: [
      {
        question: 'ماذا يحدث إذا انقطع اتصال الراديو بين القطار والـ RBC لمدة تتجاوز المؤقت المحدد؟',
        answerKey: 'يتحول نظام القطار تدريجياً إلى وضع فرملة الخدمة (Service Brake) ثم فرملة الطوارئ (Emergency Brake) بمجرد نفاد مسافة سلطة الحركة الممنوحة مسبقاً لحماية مسار القطار.',
      },
    ],
  },
  {
    id: 'etcs-03',
    code: 'ETCS-BAL-03',
    domainId: 'etcs',
    titleAr: 'باليزات اليوروباليز (Eurobalise) وقراءة بيانات التموضع',
    titleEn: 'Eurobalise & LEU Lineside Electronics',
    estimatedWeeks: 1,
    importanceLevel: 'أساسي (Core)',
    summaryAr: 'دراسة الهوائيات المغناطيسية الأرضية المثبتة على فلنكات السكة، مبدأ النقل الكهرومغناطيسي بتيار الحث (Telepowering 27 MHz و Up-link 4.23 MHz)، وفحصها الميداني.',
    summaryEn: 'Trackside passive transponders (Eurobalises), 27 MHz inductive powering from train BTM antenna, 4.23 MHz FSK telegram transmission, and LEU interfaces.',
    keyConcepts: [
      'مفهوم الباليز السلبي (Passive Balise) الذي يعمل بطاقة الحث من هوائي القطار المار فوقه',
      'مجموعات الباليزات (Balise Groups) والاتجاهية (Nominal vs Reverse)',
      'التلغراف الإشاري وحزم البيانات (ETCS Packets: Packet 41, Packet 12, Packet 21)',
      'أجهزة الاختبار المحمولة لمعايرة تردد وقوة إشارة الباليز في الميدان',
    ],
    equipmentTrackside: ['Fixed Eurobalise', 'Switchable Eurobalise', 'LEU (Lineside Electronic Unit)', 'Balise Mounting Brackets'],
    equipmentOnboard: ['BTM Antenna (أسفل مقدمة القطار)', 'BTM Processing Unit'],
    fieldTasks: [
      'النزول الحركي الآمن لفحص التثبيت الميكانيكي لمجموعة باليزات والتأكد من خلوها من الأجسام المعدنية.',
      'استخدام جهاز الفحص الميداني المحمول (Balise Field Tester) لقياس جودة إشارة الـ Telegram.',
      'فحص كابلات التوصيل بين الـ LEU والباليز القابل للتبديل (Switchable Balise).',
    ],
    safetyRules: [
      'التنسيق التام مع مركز التحكم (OCC) وحجز تصريح عمل مسار (Track Possession) قبل لمس أي باليز.',
      'ارتداء معدات الحماية الكاملة والانتباه لخلو المسار وخط الكاتنري العلوي 25kV.',
    ],
    interviewQuestions: [
      {
        question: 'لماذا يتم تركيب الباليزات في مجموعات زوجية (زوج من الباليزات على الأقل)؟',
        answerKey: 'لتحديد اتجاه حركة القطار (Direction Detection)؛ حيث يحدد ترتيب قراءة الباليز الأول ثم الثاني ما إذا كان القطار يسير في الاتجاه الاسمي (Nominal) أو العكسي (Reverse).',
      },
    ],
  },

  // 2. GSM-R & FRMCS
  {
    id: 'gsmr-01',
    code: 'TEL-GSMR-01',
    domainId: 'gsmr',
    titleAr: 'شبكة GSM-R للسكك الحديدية وهندسة التغطية المزدوجة',
    titleEn: 'GSM-R Network Architecture & High-Speed RF Coverage',
    estimatedWeeks: 1.5,
    importanceLevel: 'حرج جداً (Safety-Critical)',
    summaryAr: 'المعمارية الراديوية المخصصة للقطارات فائقة السرعة، الترددات الحصرية (UIC 900 MHz)، وتصميم التغطية المتداخلة (Overlapping Coverage) لتفادي الانقطاع اللحظي.',
    summaryEn: 'GSM-R architecture (BSS, MSC, SGSN), dedicated European railway band, overlapping cell planning along railway corridor, and high-gain directional antennas.',
    keyConcepts: [
      'نطاق ترددات السكك الحديدية (Uplink 876-880 MHz / Downlink 921-925 MHz)',
      'مفهوم التكرارية الراديوية (Redundant Coverage: 1+1 Dual Network Layer / Interleaved Sites)',
      'هوائيات القطاع الضيقة الموجهة على طول المسار (High-Gain Narrow-Beam Bi-directional Antennas)',
      'كابلات التغذية المشعة (Leaky Feeder Coaxial Cables) داخل الأنفاق والمحطات تحت الأرض',
    ],
    equipmentTrackside: ['BTS (Base Transceiver Station)', 'BSC (Base Station Controller)', 'Repeater Units', 'Fiber Distributed Antenna System (DAS)'],
    equipmentOnboard: ['Cab Radio (Voice)', 'Dual Data Radio for ETCS', 'Roof-Mounted Antennas'],
    fieldTasks: [
      'فحص كبينة محطة الإرسال القاعدية (BTS) وقياس خرج الطاقة (RF Output Power) والتأريض.',
      'استخدام جهاز تحليل الطيف (Spectrum Analyzer) لقياس التداخل الراديوي ومستوى الضوضاء.',
      'مراجعة تقارير قطار القياس والفحص الدوري (Measurement Train GSM-R Log).',
    ],
    safetyRules: [
      'الالتزام بمسافات الأمان من هوائيات الإرسال النشطة لتجنب التعرض للمجالات الكهرومغناطيسية المكثفة.',
    ],
    interviewQuestions: [
      {
        question: 'ما المعيار الدولي لشدة إشارة GSM-R المطلوبة لدعم نظام ETCS L2 عند سرعة 300 كم/س؟',
        answerKey: 'حسب مواصفات EIRENE / UIC، يجب ألا تقل شدة الإشارة عن -95 dBm على طول الخط بنسبة تغطية 95% من الوقت والمكان لضمان استقرار الاتصال الحيوي.',
      },
    ],
  },
  {
    id: 'gsmr-02',
    code: 'TEL-DOPPLER-02',
    domainId: 'gsmr',
    titleAr: 'تأثير دوبلر وإدارة التسليم السلس (Handover) عند سرعة 300+ كم/س',
    titleEn: 'Doppler Shift Mitigation & High-Speed Handover Management',
    estimatedWeeks: 1,
    importanceLevel: 'حرج جداً (Safety-Critical)',
    summaryAr: 'دراسة التحديات الفيزيائية الناتجة عن حركة القطار السريعة: إزاحة تردد دوبلر (Doppler Frequency Shift) وكيفية معالجتها في أجهزة الاستقبال، وضبط خوارزميات الـ Handover.',
    summaryEn: 'Physics of Doppler effect on RF signals at high relative velocity, receiver DSP frequency tracking algorithms, hysteresis timers, and handover delay minimization.',
    keyConcepts: [
      'حساب إزاحة دوبلر (f_d = v / c * f_0 * cosθ) وتأثير زاوية الهوائي بالنسبة للمسار',
      'فترة انقطاع الـ Handover وكيفية الحفاظ على جلسة بيانات الـ ETCS L2 دون انقطاع',
      'ضبط معايير الجوار (Neighbor Cell Configuration) وهستيريسيس الإشارة',
      'التحول المستقبلي إلى FRMCS (5G-R) بتقنية Massive MIMO و Beamforming',
    ],
    equipmentTrackside: ['High-Performance BTS with Doppler DSP Tracking', 'Synchronization Clock (GPS/PTP)'],
    equipmentOnboard: ['High-Speed Doppler-Tolerant Mobile Receivers'],
    fieldTasks: [
      'تحليل ملفات سجلات اختبارات التسليم (Handover Success Rate Logs) لقطار سريع.',
      'فحص إعدادات مؤقتات التردد في مركز التحكم بالاتصالات وتحديد نقاط الضعف في التغطية.',
    ],
    safetyRules: [
      'أي انخفاض في معدل نجاح التسليم (Handover Success Rate < 99.5%) يعد مؤشراً حرجاً يستدعي التدخل الفوري.',
    ],
    interviewQuestions: [
      {
        question: 'كم تبلغ إزاحة دوبلر التقريبية لإشارة ترددها 900 ميغاهرتز عند مرور قطار بسرعة 300 كم/ساعة؟',
        answerKey: 'تبلغ السرعة 83.3 م/ث، وبحساب التردد: (83.3 / 300,000,000) * 900,000,000 = حوالي 250 هرتز. تتطلب هذه الإزاحة معالجة رقمية متقدمة في المودم لمنع تشوه الإشارة وفقدان البيانات.',
      },
    ],
  },
  {
    id: 'gsmr-03',
    code: 'TEL-FIBER-03',
    domainId: 'gsmr',
    titleAr: 'شبكة الألياف الضوئية الممتدة على طول الخط (Backbone & OTN)',
    titleEn: 'Trackside Optical Transmission Network (OTN / SDH)',
    estimatedWeeks: 1,
    importanceLevel: 'أساسي (Core)',
    summaryAr: 'العمود الفقري لنقل كافة إشارات وبيانات السكك الحديدية: كابلات الألياف الضوئية المضادة للقوارض والتداخل الكهرومغناطيسي، شبكات الحلقات المزدوجة (Protected Rings)، وسرعات النقل.',
    summaryEn: 'Fiber optic cables along trackside, OTN/DWDM redundant rings, sub-50ms self-healing switching, fusion splicing, and optical time-domain reflectometer (OTDR) testing.',
    keyConcepts: [
      'حلقات الحماية التلقائية (Self-Healing Optical Rings - MSP / SNCP)',
      'كابلات الألياف الضوئية المدرعة ضد القوارض والحرارة الشديدة وبيئة السكك الحديدية',
      'تخصيص قنوات مخصصة للسلامة (Dedicated Vital Signalling Channels) مفصولة عن كاميرات المراقبة',
      'استخدام جهاز OTDR للكشف الدقيق عن أماكن القطع أو الانحناء في الألياف بالمسار',
    ],
    equipmentTrackside: ['OTN / SDH Multiplexers', 'Armored 96/144 Core Fiber Cables', 'Optical Distribution Frames (ODF)'],
    equipmentOnboard: ['N/A (Trackside Backbone Infrastructure)'],
    fieldTasks: [
      'استخدام جهاز OTDR لفحص سلامة كابل ألياف ضوئية بطول 40 كم وتحديد نسبة الفقد (dB/km).',
      'المشاركة في عملية لحام ألياف ضوئية حقيقية (Fusion Splicing) داخل صندوق توزيع ODF.',
      'اختبار زمن التبديل التلقائي في حال قطع حلقة الألياف والتأكد أنه أقل من 50 ميلي ثانية.',
    ],
    safetyRules: [
      'حظر النظر المباشر إطلاقاً في منافذ الليزر بالألياف الضوئية لتفادي أضرار شبكية العين غير المرئية.',
    ],
    interviewQuestions: [
      {
        question: 'لماذا يفضل استخدام الألياف الضوئية بدلاً من كابلات النحاس في خطوط القطارات فائقة السرعة؟',
        answerKey: 'لحصانتها التامة ضد التشويش والتداخل الكهرومغناطيسي الهائل (EMI) الناتج عن تيار الجر الكهربائي العالي للقطار (25kV 50Hz) وسرعة النقل الفائقة وقدرتها على تغطية مسافات طويلة دون مضخمات.',
      },
    ],
  },

  // 3. Train Detection (Axle Counters & Track Circuits)
  {
    id: 'det-01',
    code: 'DET-DAC-01',
    domainId: 'detection',
    titleAr: 'عدادات المحاور الرقمية (Digital Axle Counters - DAC)',
    titleEn: 'Digital Axle Counters (DAC) Operation & Architecture',
    estimatedWeeks: 1.5,
    importanceLevel: 'حرج جداً (Safety-Critical)',
    summaryAr: 'النظام الأساسي للكشف عن خلو المقاطع السككية في الخطوط فائقة السرعة؛ دراسة مجسات العجلات الكهرومغناطيسية المزدوجة المثبتة على القضيب ووحدات التقييم الحسابية (Evaluators).',
    summaryEn: 'Trackside wheel sensors (TX/RX magnetic coil heads), wheel flange profile detection, counting heads, digital evaluator units, and track vacancy decision logic.',
    keyConcepts: [
      'مبدأ التعديل الكهرومغناطيسي لشفة العجلة المعدنية (Wheel Flange Eddy Currents)',
      'حساب المحاور الداخلة ومقارنتها بالخارجة (In-Count vs Out-Count Equalization)',
      'كشف اتجاه حركة القطار من خلال تعاقب إشارتي القناة A والقناة B للمجس',
      'حصانة العدادات ضد تيارات الرجوع الكاتنري (Return Traction Current Immunity)',
    ],
    equipmentTrackside: ['Wheel Detection Sensors (e.g. Frauscher RSR180 / Thales / Siemens)', 'Trackside Connection Box', 'Indoor Evaluator Board (Rack-mounted)'],
    equipmentOnboard: ['N/A'],
    fieldTasks: [
      'فحص المسافة والارتفاع الميكانيكي لحساس العجلة بالنسبة لتاج القضيب (Rail Head Clearance).',
      'قياس الجهد المرجعي (Reference Voltage) وجهد التردد العالي عند مرور عجلات القطار.',
      'تنفيذ اختبار التخميد (Damping Test) باستخدام شريحة معدنية لمحاكاة شفة العجلة.',
    ],
    safetyRules: [
      'التأكد من شد براغي التثبيت الميكانيكي بالمفتاح المعاير (Torque Wrench) لمنع اهتزاز الحساس بفعل مرور القطار السريع.',
      'عدم الاقتراب من القضبان بدون إذن تشغيلي صريح وارتداء سترة الأمان الفوسفورية.',
    ],
    interviewQuestions: [
      {
        question: 'ما الذي يميز عدادات المحاور الرقمية عن دوائر السكك الحديدية التقليدية (Track Circuits) في الخطوط السريعة؟',
        answerKey: 'لا تتأثر بجودة العزل الرملي/الحجري (Ballast Resistance)، وتعمل بكفاءة في البيئات الصحراوية والممطرة، وتتحمل سرعات تتجاوز 350 كم/س، ولا تتطلب فواصل عزل ميكانيكية (Insulated Rail Joints) التي تضعف القضيب.',
      },
    ],
  },
  {
    id: 'det-02',
    code: 'DET-RESET-02',
    domainId: 'detection',
    titleAr: 'إجراءات إعادة التعيين والتعافي (Axle Counter Reset & Restoration)',
    titleEn: 'Axle Counter Safe Reset Protocols & Preparatory Reset',
    estimatedWeeks: 1,
    importanceLevel: 'حرج جداً (Safety-Critical)',
    summaryAr: 'كيفية التعامل الآمن مع حالات عد المقاطع الخاطئ (Miscount or Disturbed Section)، بروتوكولات إعادة التعيين التمهيدي (Preparatory Reset) والتأكد من خلو المسار قبل استعادة السرعة.',
    summaryEn: 'Handling miscounts, false occupancy alerts, cooperative reset protocols between CTC and track technicians, and sweep train procedures.',
    keyConcepts: [
      'إعادة التعيين المشروطة (Preparatory Reset vs Direct Reset)',
      'إجراءات مرور قطار المسح (Sweep Train / Low-Speed Verification Train)',
      'الموثوقية التشغيلية ومنع الوقوع في فخ تأكيد الخلو الكاذب (False Clear)',
      'سجلات الأعطال وتحليل شكل موجة الإشارة (Signal Waveform Diagnosis)',
    ],
    equipmentTrackside: ['Reset Box / Key Switch in SER', 'Central Evaluator Diagnostic Interface'],
    equipmentOnboard: ['N/A'],
    fieldTasks: [
      'محاكاة عملية إعادة تعيين لمقطع سكة تم اختباره في بيئة ورشة الصيانة.',
      'تطبيق بروتوكول الاتصال الصوتي القياسي بين فني الإشارات ومشرف التشغيل بالـ CTC لتنفيذ Reset.',
    ],
    safetyRules: [
      'يمنع منعاً باتاً تنفيذ إعادة تعيين مباشرة لمقطع مشغول دون التحقق الفيزيائي المؤكد من خلوه من أي عربة أو قطار.',
    ],
    interviewQuestions: [
      {
        question: 'ما هو "الريست التحضيري" (Preparatory Reset) ولماذا هو أكثر أماناً من الريست الفوري؟',
        answerKey: 'الريست التحضيري يقوم بإعداد نظام العداد بحيث يظل المقطع في حالة "مشغول" أمنياً حتى يمر قطار بسرعة منخفضة ويقوم النظام بعد محاوره داخلاً وخارجاً بنجاح، وبعدها فقط يفتح المقطع للحركة العادية.',
      },
    ],
  },

  // 4. Computer-Based Interlocking (CBI) & Point Machines
  {
    id: 'cbi-01',
    code: 'CBI-IXL-01',
    domainId: 'interlocking',
    titleAr: 'نظام التشابك والربط الإلكتروني (CBI / IXL) ومستوى الأمان SIL 4',
    titleEn: 'Computer-Based Interlocking Architecture & SIL 4 Redundancy',
    estimatedWeeks: 2,
    importanceLevel: 'حرج جداً (Safety-Critical)',
    summaryAr: 'بنية أنظمة التشابك المحوسبة المعاصرة (مثل Siemens Westrace / Alstom Smartlock / Thales LockTrac)، معمارية 2-out-of-2 و 2-out-of-3، وجداول القفل والتتابع المنطقي.',
    summaryEn: 'Modern electronic interlocking architectures, fail-safe microprocessor architecture, dual/triple modular redundancy, interlocking equations, route reservation, and locking tables.',
    keyConcepts: [
      'مبدأ الفشل الآمن (Fail-Safe Principle) في البرمجيات والأجهزة',
      'معمارية التكرار والمقارنة المستمرة (2-out-of-2 with standby أو 2-out-of-3 majority voting)',
      'جداول قفل المسارات (Interlocking Control Tables & Route Locking)',
      'الحماية الجانبية (Flank Protection) لمنع تقاطع قطارين فائقين السرعة',
    ],
    equipmentTrackside: ['Central Processing Racks (CBI Racks)', 'Fail-Safe I/O Modules', 'Object Controllers (OC) for field elements'],
    equipmentOnboard: ['N/A'],
    fieldTasks: [
      'فحص كبائن التشابك في غرفة الإشارات ومراقبة مصابيح الحالة لوحدات المعالجة التكرارية.',
      'تتبع مسار أمر إشاري صادر من شاشة التحكم إلى وحدة الإخراج الرقمية (Output Module).',
      'دراسة مخطط قفل مسار حقيقي (Control Table) ومطابقته على شاشات التشغيل.',
    ],
    safetyRules: [
      'تفريغ الشحنات الكهروستاتيكية (ESD Wrist Strap) قبل لمس أي كرت إلكتروني في كبائن الـ CBI.',
    ],
    interviewQuestions: [
      {
        question: 'ما معنى نظام معمارية 2oo3 (Two out of Three) في أجهزة التشابك الإلكتروني؟',
        answerKey: 'تعني وجود ثلاثة معالجات مستقلة تعالج نفس المدخلات وتصدر قراراتها، ويتم اعتماد القرار إذا اتفقت نتيجتان من أصل ثلاثة (Majority Voting)، مما يجمع بين الأمان العالي (Safety) واستمرارية التشغيل (Availability).',
      },
    ],
  },
  {
    id: 'cbi-02',
    code: 'CBI-PNT-02',
    domainId: 'interlocking',
    titleAr: 'ماكينات التحاويل فائقة السرعة وأنظمة الأقفال (Clamp Locks)',
    titleEn: 'High-Speed Point Machines, Clamp Locks & Detection Systems',
    estimatedWeeks: 1.5,
    importanceLevel: 'حرج جداً (Safety-Critical)',
    summaryAr: 'ميكانيكا وكهرباء تحويل مسار القطار السريع؛ محركات التحاويل المتعددة على طول الإبرة المرنة الطويلة (Multiple Point Machines per Turnout)، أقفال المشابك، وحساسات الخلوص.',
    summaryEn: 'Electro-hydraulic & electro-mechanical point machines for HSR turnouts, movable frog (swing nose), multi-drive arrangements, clamp locks, and end-position detection.',
    keyConcepts: [
      'التحاويل ذات السرعات العالية ونصف القطر الكبير (R = 4000m to 7000m)',
      'القلب المتحرك للتحويلة (Movable Frog / Swing Nose Crossing) وتأمين استمرارية السكة',
      'ترتيب المحركات المتعددة (Multi-Drive Synchronized Operation: 4 إلى 8 محركات للتحويلة الواحدة)',
      'أقفال الكلبشات (Clamp Locks) ومجسات استشعار الفجوة بدقة 1.5 - 2 ملم',
    ],
    equipmentTrackside: ['Point Machine (e.g. Alstom Paulve / Siemens S700K / Vossloh)', 'Clamp Lock Mechanisms', 'Detection Rods & Microswitches', 'Point Heating Elements'],
    equipmentOnboard: ['N/A'],
    fieldTasks: [
      'فحص شوط الحركة وقفل المشبك والتأكد من خلوص الأمان الميكانيكي (2mm Obstacle Test).',
      'قياس تيار المحرك أثناء التحويل (Motor Operating Current Curve) للكشف عن أي احتكاك ميكانيكي.',
      'فحص نظام تدفئة التحاويل ونظام التزييت الدوري للقضبان الإبرية المنزلقة.',
    ],
    safetyRules: [
      'وضع قفل الأمان الميكانيكي (Mechanical Crank Handle Cut-off) أثناء صيانة التحويلة لمنع تحريكها من بعد.',
    ],
    interviewQuestions: [
      {
        question: 'لماذا تحتاج تحاويل القطارات فائقة السرعة إلى محركات متعددة (Multi-Drive System) ونظام قلب متحرك؟',
        answerKey: 'لأن إبر التحويلة طويلة جداً ومرنة لتوفير تدرج انحناء ناعم للقطار عند سرعة 160 أو 220 كم/س على التفريعة، ويحتاج القلب المتحرك (Swing Nose) للإغلاق التام لإلغاء الفجوة التي قد تسبب صدمات خطيرة لعجلات القطار.',
      },
    ],
  },

  // 5. CTC & Trackside SER Operations
  {
    id: 'ctc-01',
    code: 'OPS-CTC-01',
    domainId: 'ctc_scada',
    titleAr: 'مركز التحكم المركزي لحركة القطارات (CTC / OCC)',
    titleEn: 'Centralized Traffic Control (CTC) & Train Tracking Logic',
    estimatedWeeks: 1,
    importanceLevel: 'أساسي (Core)',
    summaryAr: 'نظام إدارة الحركة الشامل، تتبع القطارات في الوقت الحقيقي (Automatic Train Tracking)، التوجيه الآلي للمسارات (ARS - Automatic Route Setting)، وحل التعارضات الجدولة.',
    summaryEn: 'CTC server hierarchy, Automatic Route Setting (ARS), real-time train tracking, headway optimization, conflict detection, and telemetry interfaces with interlocking and RBC.',
    keyConcepts: [
      'التوجيه الآلي للرحلات ومقارنتها بالجدول الزمني الفعلي (Time-Distance Graph)',
      'واجهة التفاعل البشري HMI لمراقبي وموجهي الحركة (Dispatchers)',
      'التحكم في مناطق العمل وعزل المسارات للصيانة الميدانية (Possession Management)',
      'تكامل واجهات الأمان وكاميرات المراقبة للمحطات والمقاطع الحساسة',
    ],
    equipmentTrackside: ['CTC Server Clusters', 'Large Display Video Wall', 'Dispatcher Workstations', 'Voice Recorders'],
    equipmentOnboard: ['N/A'],
    fieldTasks: [
      'قضاء نوبة تدريبية داخل مركز التحكم والمراقبة الرئيسي (OCC / CTC) بجوار مهندس الأنظمة.',
      'مراقبة كيفية تنفيذ أمر عزل مسار لصالح فرقة صيانة طارئة والتأكد من تفعيل الأقفال الأمنية.',
    ],
    safetyRules: [
      'الانضباط الصارم في بروتوكولات الاتصال اللفظي الإشاري وفق العبارات القياسية المعتمدة دولياً.',
    ],
    interviewQuestions: [
      {
        question: 'ما الفرق بين التحكم المحلي من محطة القطار (Local Control) والتحكم المركزي (Centralized Control)؟',
        answerKey: 'التحكم المركزي يدير كامل الخط التكاملي ويحسن جداول التقاطر والسرعات، بينما التحكم المحلي يتيح لمحطة معينة تشغيل تحاويلها وإشاراتها ذاتياً في حالات الطوارئ أو انقطاع شبكة الاتصال بالمركز الرئيسي.',
      },
    ],
  },
  {
    id: 'ctc-02',
    code: 'OPS-SER-02',
    domainId: 'ctc_scada',
    titleAr: 'غرف التجهيزات الإشاراتية والاتصالات (SER / TER Rooms & Power)',
    titleEn: 'Signalling Equipment Rooms (SER), UPS & Earthing Systems',
    estimatedWeeks: 1,
    importanceLevel: 'أساسي (Core)',
    summaryAr: 'بيئة العمل الميدانية الحقيقية لمهندس الإشارات: غرف SER الموزعة كل 15-20 كم على الخط، أنظمة التغذية الكهربائية غير المنقطعة (UPS)، وشبكات التأريض وحماية الصواعق.',
    summaryEn: 'Lineside technical shelters, clean earth vs safety earth, lightning protection, surge arresters, UPS & battery autonomy, HVAC redundancy, and fire suppression.',
    keyConcepts: [
      'شبكة التأريض المنفصلة (Clean Instrument Earth vs Dirty Traction Power Earth)',
      'أنظمة التغذية بدون انقطاع (UPS Dual Redundant Online Systems) وبطاريات الليثيوم/الجل',
      'حماية كروت الإشارات الحساسة من التيارات العابرة والصواعق (Surge Protection Devices - SPD)',
      'نظام المراقبة البيئية للغرفة (الحرارة، الرطوبة، تسرب الغاز، واقتحام الأبواب)',
    ],
    equipmentTrackside: ['Industrial UPS Units (10-40 kVA)', 'Battery Banks (4-8 hours autonomy)', 'Earthing Pits & Busbars', 'Lightning Protectors'],
    equipmentOnboard: ['N/A'],
    fieldTasks: [
      'قياس مقاومة التأريض (Earth Resistance Measurement) باستخدام جهاز فحص الأرضي ثلاثي الأوتاد (مطلوب أقل من 1 أوم).',
      'فحص بطاريات الـ UPS وقياس جهد وحرارة كل خلية واختبار محاكاة انقطاع الكهرباء العمومية.',
      'فحص سلامة موانع الصواعق (Surge Arresters) وتأكد من عدم احتراق مؤشرات الفحص.',
    ],
    safetyRules: [
      'الحذر الشديد من الصعق بالتيار المستمر العالي (DC Bus Voltage) في بنوك البطاريات.',
    ],
    interviewQuestions: [
      {
        question: 'لماذا يجب فصل شبكة التأريض الخاصة بأنظمة الاتصالات والإشارات عن تأريض أعمدة الكاتنري الكهربائية؟',
        answerKey: 'لمنع تسرب التيارات الهائلة الناتجة عن تيار الجر الكهربائي العالي (25kV) أو قصر الدائرة (Short Circuit) إلى الدوائر الإلكترونية الدقيقة لكروت الإشارات والكومبيوتر مما قد يؤدي لاحتراقها أو التسبب في تشغيل خاطئ.',
      },
    ],
  },

  // 6. RAMS & Safety Standards
  {
    id: 'rams-01',
    code: 'RAMS-STD-01',
    domainId: 'rams_safety',
    titleAr: 'المعايير الأوروبية CENELEC وهندسة السلامة والموثوقية (RAMS)',
    titleEn: 'CENELEC Railway Standards (EN 50126, EN 50128, EN 50129)',
    estimatedWeeks: 1,
    importanceLevel: 'أساسي (Core)',
    summaryAr: 'القواعد الذهبية لهندسة السكك الحديدية الحديثة: إدارة الاعتمادية، الإتاحة، القابلية للصيانة، والأمان (RAMS)، ودورة حياة الأنظمة وتصنيف الأمان SIL 4.',
    summaryEn: 'Comprehensive overview of EN 50126 (RAMS Lifecycle), EN 50128 (Software for railway control), EN 50129 (Electronic systems for signalling), and safety cases.',
    keyConcepts: [
      'معنى الأحرف الأربعة: Reliability, Availability, Maintainability, Safety',
      'مستويات تكامل السلامة من SIL 1 إلى SIL 4 (حيث يتطلب SIL 4 احتمالية عطل أقل من 10^-9 في الساعة)',
      'سجل المخاطر (Hazard Log) ومصفوفة تقييم الخطر (Risk Matrix)',
      'ملف السلامة الهندسي (Safety Case: Preliminary, Generic, Specific Application)',
    ],
    equipmentTrackside: ['Safety Audit Documentation & Toolchains'],
    equipmentOnboard: ['Certified Safety Enclosures & Vital Compilers'],
    fieldTasks: [
      'مراجعة نموذج سجل مخاطر حقيقي (Hazard Log) لأحد مشاريع تطوير الخط فائق السرعة.',
      'حساب معدل التوافر النظري (System Availability) بالاعتماد على MTBF و MTTR لنظام إشارات.',
    ],
    safetyRules: [
      'لا يجوز إجراء أي تعديل برمجي أو فيزيائي (Patch/Modification) دون اعتماد هندسي مستقل (ISA).',
    ],
    interviewQuestions: [
      {
        question: 'ما هو المعيار الدولي المطبق للبرمجيات الحيوية للسكك الحديدية (Railway Software) وما هي أهم اشتراطاته؟',
        answerKey: 'المعيار هو EN 50128، ويشترط استقلالية تامة لفريق الفحص والتحقق (V&V)، وكتابة أكواد برمجية تخضع لقواعد صارمة بدون تخصيص ديناميكي للذاكرة (No Dynamic Memory Allocation)، وتغطية اختبارات كودية بنسبة 100%.',
      },
    ],
  },
  {
    id: 'rams-02',
    code: 'RAMS-SAFE-02',
    domainId: 'rams_safety',
    titleAr: 'قواعد السلامة الشخصية للعمل الميداني والخط المكهرب 25kV',
    titleEn: 'Trackside Personal Safety & 25kV Catenary Electrification Awareness',
    estimatedWeeks: 0.5,
    importanceLevel: 'حرج جداً (Safety-Critical)',
    summaryAr: 'أهم درس يبدأ به المتدرب رحلته: حماية الروح وسلامة الجسد؛ المسافات الآمنة من خطوط الضغط العالي، مناطق الخطر على السكة، إجراءات العبور، ومعدات الحماية الفردية (PPE).',
    summaryEn: 'Zero tolerance safety policies, minimum clearance distances from 25kV OLE (Overhead Line Equipment), lookout protection, track possessions, and PPE requirements.',
    keyConcepts: [
      'المسافة الآمنة من الأسلاك الحية للكاتنري (25kV Catenary Clearance - لا تقل عن 2.75 متر)',
      'خطر التيارات المحتثة (Induced Voltages) في الكابلات المعدنية الموازية للمسار',
      'مناطق الخطر على جانب السكة (Safety Zones & Refuges) وتفادي ضغط الرياح الناتج عن مرور قطار 300 كم/س',
      'معدات الوقاية الشخصية الإلزامية (Safety Boots, Hi-Vis Vest Orange/Yellow, Helmet, Glasses)',
    ],
    equipmentTrackside: ['Track Possession Shorting Cables', 'Voltage Detector Sticks', 'Personal Warning Devices'],
    equipmentOnboard: ['N/A'],
    fieldTasks: [
      'فحص معدات الوقاية الشخصية للمتدرب والتأكد من مطابقتها لمواصفات السكك الحديدية.',
      'تنفيذ تدريب عملي على إجراءات النزول الآمن للمسار وسماع إشارات صافرة الإنذار.',
    ],
    safetyRules: [
      'القاعدة رقم 1: اعتبر دائماً خط الكاتنري مكهرباً ومميتاً حتى يثبت العزل والتأريض رسمياً.',
      'القاعدة رقم 2: لا تدخل منطقة السكة دون الحصول على تصريح عمل ومراقب أمان معتمد (Lookout).',
    ],
    interviewQuestions: [
      {
        question: 'ما هو الخطر الرئيسي الذي يمثله مرور قطار بسرعة 300 كم/س على شخص يقف على رصيف أو حافة المسار؟',
        answerKey: 'خطر الموجة الهوائية التصادمية (Aerodynamic Bow Wave) يليه ضغط الخلخلة الساحب (Suction Pressure Slipstream) الذي يمكن أن يجذب الشخص بقوة تحت عجلات القطار إذا لم يقف خلف خط الأمان المحدد.',
      },
    ],
  },
];
