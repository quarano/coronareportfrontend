import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';

const USERCODE_STORAGE_KEY = 'covu';
const MOCK_USER: User = {
  UserId: '5z9475t3zt9h',
  Surname: 'Mustermann',
  Firstname: 'Max',
  Phone: '0123-456789',
  ZipCode: '123456',
  Infected: false,
  HealthDepartmentId: null
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<User>(null);

  public get user(): User | null {
    return this.user$$.getValue();
  }

  private get localUserIdentCode(): string | null {
    return localStorage.getItem(USERCODE_STORAGE_KEY);
  }

  private set localUserIdentCode(code) {
    localStorage.setItem(USERCODE_STORAGE_KEY, code);
  }

  constructor() {
  }

  public isFullyAuthenticated(): boolean {
    return this.localUserIdentCode !== null && this.user !== null;
  }

  public setUserCode(code: string) {
    // ToDo check user code online and load user
    this.localUserIdentCode = code;
    this.user$$.next(MOCK_USER);
  }
}
