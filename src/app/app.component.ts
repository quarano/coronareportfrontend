import { Component } from '@angular/core';
import { ProgressBarService } from './services/progress-bar.service';
import { UserService } from './services/user.service';
import { TenantService } from './services/tenant.service';
import { TenantsEnum } from './services/tenantsEnum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public progressBarActive$$ = this.progressBarService.progressBarActive$$;
  public isAuthenticated$$ = this.userService.isAuthenticated$$;
  public urlTenant = this.tenantService.urlTenant;
  public tenant$$ = this.tenantService.tenant$$;
  public tenantsEnum = TenantsEnum;

  constructor(
    private userService: UserService,
    private progressBarService: ProgressBarService,
    public router: Router,
    private tenantService: TenantService) {
  }

  get isTenantAdminRoute(): boolean {
    return this.router.url.startsWith('/tenant-admin');
  }
}
