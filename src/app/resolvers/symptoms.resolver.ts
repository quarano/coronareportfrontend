import { Symptom } from './../models/symptom';
import { ApiService } from './../services/api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class SymptomsResolver implements Resolve<Symptom[]> {
  constructor(private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Symptom[]> {
    return this.apiService.getSymptoms();
  }
}
