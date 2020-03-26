import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { delay, filter, tap } from 'rxjs/operators';
import { Client } from '../models/client';
import { SnackbarService } from '../services/snackbar.service';
import { ProgressBarService } from '../services/progress-bar.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public identCode = 'A47-9GE-BB1';
  public enteredCode = '';
  public existingCode$$ = new BehaviorSubject<boolean>(null);
  public checkingCode = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbarService: SnackbarService,
    private progressBarService: ProgressBarService) {
  }

  ngOnInit(): void {
    this.existingCode$$.asObservable().pipe(
      filter(value => value === false)
    ).subscribe(() => this.router.navigate(['/welcome/create-user']));
  }

  public setExistingCodeState(state: boolean) {
    this.existingCode$$.next(state);
  }

  public reset() {
    this.existingCode$$.next(null);
  }

  public authenticateCode() {
    this.checkingCode = true;
    this.progressBarService.progressBarState = true;
    this.userService.setUserCode(this.enteredCode)
      .subscribe(
        (client: Client) => {
          this.checkingCode = false;
          this.progressBarService.progressBarState = false;
          this.snackbarService.confirm('Der Code wurde erfolgreich geladen.');
          this.router.navigate(['/diary']);
        },
        error => {
          this.checkingCode = false;
          this.progressBarService.progressBarState = false;
          this.snackbarService.error('Der Code ist nicht vergeben.');
          this.router.navigate(['/welcome/create-user']);
        }
      );
  }

}
