import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{

  public identCode = 'A47-9GE-BB1';
  public enteredCode = '';
  public existingCode$$ = new BehaviorSubject<boolean>(null);

  constructor(private userService: UserService,
              private router: Router) {
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
    this.userService.setUserCode(this.enteredCode);
    this.enteredCode = null;
  }

}
