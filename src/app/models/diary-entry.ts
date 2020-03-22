import { SymptomDto } from './symptom';

export interface DiaryEntryDto {
  bodyTemperature: number;
  id: string;
  symptoms: SymptomDto[];
  characteristicSymptoms: SymptomDto[];
  nonCharacteristicSymptoms: SymptomDto[];
  dateTime: Date;
  transmittedToHealthDepartment: boolean;
}

export interface DiaryEntryModifyDto {
  bodyTemperature: number;
  id: string;
  symptoms: string[];
  dateTime: Date;
}
