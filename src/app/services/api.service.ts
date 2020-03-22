import { environment } from './../../environments/environment';
import { SymptomDto } from './../models/symptom';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, zip, of } from 'rxjs';
import { share, map, groupBy, mergeMap, toArray, concatAll, tap } from 'rxjs/operators';
import { DiaryEntryDto, DiaryEntryModifyDto } from '../models/diary-entry';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.api.baseUrl;

  constructor(protected httpClient: HttpClient) { }

  getSymptoms(): Observable<SymptomDto[]> {
    return this.httpClient.get<SymptomDto[]>(`${this.baseUrl}/symptoms`).pipe(share());
  }

  getDiaryEntry(id: string): Observable<DiaryEntryDto> {
    return this.httpClient.get<DiaryEntryDto>(`${this.baseUrl}/diaryentries/${id}`)
      .pipe(
        map(entry => {
          entry.characteristicSymptoms = entry.symptoms.filter(s => s.isCharacteristic);
          entry.nonCharacteristicSymptoms = entry.symptoms.filter(s => !s.isCharacteristic);
          return entry;
        }),
        share()
      );
  }

  getGroupedDiaryEntries(): Observable<[string, DiaryEntryDto[]]> {
    return this.getDiaryEntries()
      .pipe(
        concatAll(),
        groupBy(entry => new Date(entry.date).toLocaleDateString()),
        mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
      );
  }

  getDiaryEntries(): Observable<DiaryEntryDto[]> {
    return this.httpClient.get<DiaryEntryDto[]>(`${this.baseUrl}/diaryEntries`).pipe(share());
  }

  createDiaryEntry(diaryEntry: DiaryEntryModifyDto): Observable<DiaryEntryDto> {
    return this.httpClient.post<DiaryEntryDto>(`${this.baseUrl}/diaryentries`, diaryEntry);
  }

  modifyDiaryEntry(diaryEntry: DiaryEntryModifyDto) {
    return this.httpClient.put(`${this.baseUrl}/diaryentries/${diaryEntry.id}`, diaryEntry);
  }
}
