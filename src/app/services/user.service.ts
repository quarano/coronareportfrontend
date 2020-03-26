import { Injectable, } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Client } from '../models/client';
import { ApiService } from './api.service';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BackendClient } from '../models/backend-client';
import { FirstQuery } from '../models/first-query';

export const USERCODE_STORAGE_KEY = 'covu';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly client$$ = new BehaviorSubject<Client>(null);
  private readonly latestFirstQuery$$ = new BehaviorSubject<FirstQuery>(null);

  public isAuthenticated$$ = new BehaviorSubject<boolean>(false);

  public get user(): Client | null {
    return this.client$$.getValue();
  }

  public get latestFirstQuery(): FirstQuery | null {
    return this.latestFirstQuery$$.getValue();
  }

  public get localClientCode(): string | null {
    return localStorage[USERCODE_STORAGE_KEY];
  }

  public set localClientCode(code) {
    if (code === null) {
      localStorage.removeItem(USERCODE_STORAGE_KEY);
    } else {
      localStorage[USERCODE_STORAGE_KEY] = code;
    }
  }

  constructor(
    private apiService: ApiService,
    private router: Router) {
    // On starting app, check if local code exists and if it is valid
    const clientCode = this.localClientCode;
    if (clientCode !== null) {
      this.checkCodeGetClient(clientCode).subscribe(
        () => this.router.navigate(['/diary'])
      );
    }
  }

  public isFullyAuthenticated(): boolean {
    const authenticated = this.localClientCode !== null && this.user !== null;
    this.isAuthenticated$$.next(authenticated);
    return authenticated;
  }

  private checkCodeGetClient(code: string, withErrorNavigation = true): Observable<BackendClient> {
    return this.apiService.getClientByCode(code)
      .pipe(
        catchError(error => {
          this.localClientCode = null;
          if (withErrorNavigation) {
            this.router.navigate(['/welcome']);
          }
          return throwError('Code invalid! No Client found.');
        }),
        tap((backendClient: BackendClient) => {
          this.localClientCode = backendClient.clientCode;
          this.client$$.next(this.getClientFromBackendClient(backendClient));
          this.latestFirstQuery$$.next(this.getFirstQueriesFromBackenClient(backendClient).pop());
        })
      );
  }

  public createClient(client: Client, firstQuery: FirstQuery): Observable<string> {
    return this.apiService.registerClient(this.createBackendClient(client, firstQuery));
  }

  private createBackendClient(client: Client, firstQuery: FirstQuery): BackendClient {
    return {
      clientId: null,
      surename: client.surename,
      firstname: client.firstname,
      phone: client.phone,
      zipCode: client.zipCode,
      infected: false,
      healthDepartmentId: null,
      clientCode: null,
      comments: [firstQuery]
    };
  }

  private getClientFromBackendClient(backendClient: BackendClient): Client {
    return {
      clientId: backendClient.clientId,
      surename: backendClient.surename,
      firstname: backendClient.firstname,
      phone: backendClient.phone,
      zipCode: backendClient.zipCode,
      infected: backendClient.infected,
      healthDepartmentId: backendClient.healthDepartmentId
    };
  }

  private getFirstQueriesFromBackenClient(backendClient: BackendClient): Array<FirstQuery> {
    return backendClient.comments;
  }

  public setUserCode(code: string): Observable<BackendClient> {
    return this.checkCodeGetClient(code, false)
      .pipe(
        tap((backendClient: BackendClient) => {
          this.localClientCode = code;
          this.client$$.next(this.getClientFromBackendClient(backendClient));
          this.latestFirstQuery$$.next(this.getFirstQueriesFromBackenClient(backendClient).pop());
        })
      );
  }
}
