import { environment } from './../../environments/environment';
import { SymptomDto } from './../models/symptom';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendClient } from '../models/backend-client';
import { share, map } from 'rxjs/operators';
import { DiaryEntryDto, DiaryEntryModifyDto } from '../models/diary-entry';
import { groupBy } from '../utils/groupBy';
import { FirstQuery } from '../models/first-query';
import { ContactPersonDto } from '../models/contact-person';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.api.baseUrl;

  constructor(protected httpClient: HttpClient) {
  }

  getSymptoms(): Observable<SymptomDto[]> {
    return this.httpClient.get<SymptomDto[]>(`${this.baseUrl}/symptoms`).pipe(share());
  }

  getContactPersons(): Observable<ContactPersonDto[]> {
    return this.httpClient.get<ContactPersonDto[]>(`${this.baseUrl}/contactpersons`).pipe(share());
  }

  getDiaryEntry(id: string): Observable<DiaryEntryDto> {
    return this.httpClient.get<DiaryEntryDto>(`${this.baseUrl}/diaryentries/${id}`)
      .pipe(
        map(entry => {
          entry.characteristicSymptoms = entry.symptoms.filter(s => s.characteristic);
          entry.nonCharacteristicSymptoms = entry.symptoms.filter(s => !s.characteristic);
          return entry;
        }),
        share()
      );
  }

  getGroupedDiaryEntries(): Observable<Map<string, DiaryEntryDto[]>> {
    return this.getDiaryEntries()
      .pipe(
        map(entries => groupBy<DiaryEntryDto>(entries, e => new Date(e.dateTime).toLocaleDateString()))
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

  registerClient(client: BackendClient): Observable<string> {
    return this.httpClient.post(`${this.baseUrl}/client/register`, client, { responseType: 'text' });
  }

  getClientByCode(code: string): Observable<BackendClient> {
    return this.httpClient.get<BackendClient>(`${this.baseUrl}/client/${code}`);
  }

  createFirstReport(firstReport: FirstQuery, clientCode: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/firstReport/${clientCode}`, firstReport);
  }
}
