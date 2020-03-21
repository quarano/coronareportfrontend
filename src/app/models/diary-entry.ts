import { Symptom } from './symptom';
export interface DiaryEntry {
  bodyTemperature: number;
  id: string;
  characteristicSymptoms: Symptom[];
  nonCharacteristicSymptoms: Symptom[];
  date: Date;
}
