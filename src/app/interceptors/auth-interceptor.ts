import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import {UserService} from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.userService.localClientCode;
    console.log('intercepting');

    if (authToken !== null) {
      const authReq = request.clone({setHeaders: {'client-code': authToken}});
      return next.handle(authReq);
    }

    return next.handle(request);
  }
}
