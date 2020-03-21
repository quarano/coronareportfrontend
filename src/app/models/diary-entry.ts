import { Symptom } from './symptom';
export interface DiaryEntry {
  bodyTemperature: number;
  id: string;
  symptoms: Symptom[];
}
