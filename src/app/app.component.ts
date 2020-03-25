import { Component } from '@angular/core';
import { ProgressBarService } from './services/progress-bar.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'coronareportfrontend';

  public progressBarActive$$ = this.progressBarService.progressBarActive$$;
  public isAuthenticated$$ = this.userService.isAuthenticated$$;

  constructor(
    private userService: UserService,
    private progressBarService: ProgressBarService) {

  }
}
