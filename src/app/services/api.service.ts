import { environment } from './../../environments/environment';
import { Symptom } from './../models/symptom';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DiaryEntry } from '../models/diary-entry';
import {Client} from '../models/client';
import {BackendClient} from '../models/backend-client';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.api.baseUrl;

  constructor(protected httpClient: HttpClient) { }

  getSymptoms(): Observable<Symptom[]> {
    return this.httpClient.get<Symptom[]>(`${this.baseUrl}/symptoms`);
  }

  getDiaryEntry(id: string): Observable<DiaryEntry> {
    return this.httpClient.get<DiaryEntry>(`${this.baseUrl}/diaryentries/${id}`);
  }

  createDiaryEntry(diaryEntry: DiaryEntry): Observable<DiaryEntry> {
    return this.httpClient.post<DiaryEntry>(`${this.baseUrl}/diaryentries`, diaryEntry);
  }

  modifyDiaryEntry(diaryEntry: DiaryEntry) {
    return this.httpClient.put(`${this.baseUrl}/diaryentries/${diaryEntry.id}`, diaryEntry);
  }

  registerClient(client: BackendClient): Observable<string> {
    return this.httpClient.post(`${this.baseUrl}/client/register`, client, {responseType: 'text'});
  }

  getClientByCode(code: string): Observable<BackendClient> {
    return this.httpClient.get<BackendClient>(`${this.baseUrl}/client/${code}`);
  }
}
