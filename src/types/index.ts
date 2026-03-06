export type DiseaseType = 'AML' | 'ALL' | 'CML' | 'MDS' | 'other' | 'unknown';

export type TreatmentPhase = 'in_treatment' | 'follow_up' | 'pre_transplant' | 'post_transplant' | 'unknown';

export type TriageLevel = 'GREEN' | 'YELLOW' | 'RED';

export interface Profile {
  id: string;
  nickname: string;
  disease_type: DiseaseType;
  treatment_phase: TreatmentPhase;
  created_at: string;
  updated_at: string;
}

export interface AIResponse {
  empathy: string;
  summary: string;
  triage_level: TriageLevel;
  general_info: string;
  action: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  message: string;
  response: AIResponse;
  triage_level: TriageLevel;
  created_at: string;
}
