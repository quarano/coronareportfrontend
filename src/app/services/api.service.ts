import { environment } from './../../environments/environment';
import { Symptom } from './../models/symptom';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.api.baseUrl;

  constructor(protected httpClient: HttpClient) { }

  getSymptoms(): Observable<Symptom[]> {
    return this.httpClient.get<Symptom[]>(`${this.baseUrl}/symptoms`);
  }

}
