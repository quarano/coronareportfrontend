import { DiaryEntryDto } from '../models/diary-entry';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class GroupedDiaryEntriesResolver implements Resolve<[string, DiaryEntryDto[]]> {
  constructor(private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<[string, DiaryEntryDto[]]> {
    return this.apiService.getGroupedDiaryEntries();
  }
}
