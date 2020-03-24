import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {TENANTS} from './tenants';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  public readonly tenant: TENANTS;

  constructor(@Inject(DOCUMENT) private document) {
    this.tenant = this.getTenantFromLocation(document.location);
  }

  private getTenantFromLocation(location: Location) {
    const hostname = location.hostname;

    const domainParts = hostname.split('.');
    const subdomain = domainParts[0];

    switch (subdomain) {
      case 'develop': {
        return TENANTS.develop;
      }
      case 'testhausen': {
        return TENANTS.testhausen;
      }
      default: {
        return TENANTS.default;
      }
    }


  }
}
