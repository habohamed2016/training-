export type HSRDomainId = 
  | 'etcs'
  | 'gsmr'
  | 'detection'
  | 'interlocking'
  | 'ctc_scada'
  | 'rams_safety';

export interface HSRTopic {
  id: string;
  code: string;
  titleAr: string;
  titleEn: string;
  domainId: HSRDomainId;
  estimatedWeeks: number;
  importanceLevel: 'حرج جداً (Safety-Critical)' | 'أساسي (Core)' | 'متقدم (Advanced)';
  summaryAr: string;
  summaryEn: string;
  keyConcepts: string[];
  equipmentTrackside: string[];
  equipmentOnboard: string[];
  fieldTasks: string[];
  safetyRules: string[];
  interviewQuestions: {
    question: string;
    answerKey: string;
  }[];
}

export interface HSRDomain {
  id: HSRDomainId;
  titleAr: string;
  titleEn: string;
  iconName: string;
  badge: string;
  descriptionAr: string;
  topicsCount: number;
  color: string;
}

export interface PrebuiltDocument {
  id: string;
  titleAr: string;
  titleEn: string;
  category: 'منهج وخطة' | 'أدلة هندسية' | 'تمارين حقلية' | 'سيناريوهات أعطال' | 'سلامة وتقييم';
  targetAudience: string;
  pagesEstimate: string;
  summary: string;
  fileName: string;
  markdownContent: string;
}

export interface TraineeSkillEvaluation {
  id: string;
  title: string;
  category: string;
  score: number; // 0 to 5
  notes: string;
}

export interface TraineeProgressState {
  traineeName: string;
  universityName: string;
  mentorName: string;
  startDate: string;
  currentWeek: number;
  totalWeeks: number;
  completedTopicIds: string[];
  skills: TraineeSkillEvaluation[];
  generalNotes: string;
}
