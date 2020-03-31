import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Client } from '../../models/client';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirstQuery } from '../../models/first-query';
import { UserService } from '../../services/user.service';
import { BackendClient } from '../../models/backend-client';
import { SnackbarService } from '../../services/snackbar.service';
import { ProgressBarService } from '../../services/progress-bar.service';
import { switchMap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public stepperStarted = new Subject<boolean>();

  public client$$: BehaviorSubject<Client> = new BehaviorSubject<Client>(null);
  public firstQuery$$: BehaviorSubject<FirstQuery> = new BehaviorSubject<FirstQuery>(null);

  public registerStarted = false;
  public clientCode: string | undefined = undefined;

  constructor(private userService: UserService,
    private snackbarService: SnackbarService,
    private apiService: ApiService,
    private router: Router,
    private progressBarService: ProgressBarService) {
  }

  ngOnInit(): void {
  }

  public registerClient() {
    let clientCode: string;
    this.progressBarService.progressBarState = true;
    this.registerStarted = true;
    this.userService.createClient(this.client$$.getValue(), this.firstQuery$$.getValue())
      .pipe(
        switchMap((code: string) => {
          console.log(code);
          clientCode = code;
          return this.userService.setUserCode(code);
        }),
        switchMap((backendClient: BackendClient) => this.apiService.createFirstReport(this.firstQuery$$.getValue(), clientCode))
      )
      .subscribe(
        () => {
          this.progressBarService.progressBarState = false;
          this.clientCode = clientCode;
          this.snackbarService.success('Die Registrierung war erfolgreich.');
        },
        error => {
          console.log(error);
          this.progressBarService.progressBarState = false;
          this.snackbarService.error('Es ist ein Fehler aufgetreten. Bitte später erneut versuchen.');
        }
      );
  }

  public navigateToDiary() {
    this.router.navigate(['/diary']);
  }

}
