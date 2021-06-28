import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RestService } from 'rbn-common-lib';
import { HttpParams } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HOST, VERSION } from '../api/constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  messages: any = {};
  userInfo: any = {};

  constructor(private rest2Service: RestService, public translate: TranslateService) {
    // get all notifications from JSON to use in loginComponent
    this.translate.get('MESSAGE_LOGIN').subscribe((res: string) => {
      this.messages = res;
    });
  }

  login(username: string, password: string) {
    const url = `${HOST}/pre-auth/authentication/login.html`;
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.rest2Service.postNonJson(url, body);
  }
  getUserLogged() {
    return this.rest2Service.get(`${HOST}/${VERSION}/gui/vim/config/users/logged`).pipe(
      map(res => {
        this.userInfo = res && res.body;
        return res;
      })
    );
  }
  isLoginSuccess(res: HttpResponse<any>): boolean {
    if (res.status === 200) {
      return true;
    }
    return false;
  }

  // Stubbed methods that are not used for VNFM
  changePassword(username: string, password: string, newpassword: string, newpassword2: string): Observable<HttpResponse<any>> {
    return of(new HttpResponse());
  }
  isChangePasswordSuccess(res: HttpResponse<any>): boolean {
    return false;
  }
  getErrorMessage(): Observable<HttpResponse<any>> {
    return of(new HttpResponse());
  }
  parseError(res: HttpResponse<any>): string {
    return this.messages.INCORRECT;
  }
  parsePasswordChange(res: HttpResponse<any>): boolean {
    return false;
  }
  checkUserPermission(name: string, action: string) {
    const arrPermission: Array<string> = this.userInfo.permissions || [];
    return arrPermission.includes(name + ':' + action);
  }
  getLoggedUserInfo() {
    return this.userInfo;
  }
}
