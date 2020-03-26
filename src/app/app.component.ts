import { Component } from '@angular/core';
import { ProgressBarService } from './services/progress-bar.service';
import { UserService } from './services/user.service';
import { TenantService } from './services/tenant.service';
import { TENANTS } from './services/tenants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public progressBarActive$$ = this.progressBarService.progressBarActive$$;
  public isAuthenticated$$ = this.userService.isAuthenticated$$;
  public tenant = this.tenantService.tenant;
  public tenantsEnum = TENANTS;

  constructor(
    private userService: UserService,
    private progressBarService: ProgressBarService,
    private tenantService: TenantService) {

  }
}
