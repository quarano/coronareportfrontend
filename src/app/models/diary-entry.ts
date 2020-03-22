import { SymptomDto } from './symptom';

export interface DiaryEntryDto {
  bodyTemperature: number;
  id: number;
  symptoms: SymptomDto[];
  characteristicSymptoms: SymptomDto[];
  nonCharacteristicSymptoms: SymptomDto[];
  dateTime: Date;
  transmittedToHealthDepartment: boolean;
}

export interface DiaryEntryModifyDto {
  bodyTemperature: number;
  id: number;
  symptoms: string[];
  dateTime: Date;
}
