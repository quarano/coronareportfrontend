import { SymptomDto } from './symptom';

export interface DiaryEntryDto {
  bodyTemperature: number;
  id: string;
  symptoms: SymptomDto[];
  characteristicSymptoms: SymptomDto[];
  nonCharacteristicSymptoms: SymptomDto[];
  date: Date;
}

export interface DiaryEntryModifyDto {
  bodyTemperature: number;
  id: string;
  symptoms: string[];
  date: Date;
}

export interface GroupedDiaryEntryDto {
  date: Date;
  entries: DiaryEntryDto[];
}
