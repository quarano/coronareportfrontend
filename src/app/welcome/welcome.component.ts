import {Component} from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  public identCode = 'A47-9GE-BB1';
  public enteredCode = '';
  public existingCode: boolean | null = null;

  constructor() {
  }

  public setExistingCode(state: boolean) {
    this.existingCode = state;
  }

  public reset() {
    this.existingCode = null;
  }

}
