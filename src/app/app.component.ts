import { ApiService } from './services/api.service';
import { SymptomDto } from './models/symptom';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {ProgressBarService} from './services/progress-bar.service';
import {UserService} from './services/user.service';
import {TenantService} from './services/tenant.service';
import {TENANTS} from './services/tenants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'coronareportfrontend';
  /*symptoms: Symptom[] = [];
  private apiSubscription: */

  public progressBarActive$$ = this.progressBarService.progressBarActive$$;
  public isAuthenticated$$ = this.userService.isAuthenticated$$;
  public tenant = this.tenantService.tenant;
  public tenantsEnum = TENANTS;

  constructor(private apiService: ApiService,
              private userService: UserService,
              private progressBarService: ProgressBarService,
              private tenantService: TenantService) {

  }

  ngOnDestroy(): void {
    /*this.apiSubscription.unsubscribe();*/
  }

  ngOnInit(): void {
    /*this.apiService.getSymptoms()
      .subscribe(symtpoms => this.symptoms = symtpoms);*/
  }
}
