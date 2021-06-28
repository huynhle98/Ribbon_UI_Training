import { LoginService } from './login.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { RestService, RbnCommonLibModule, HttpLoaderFactory } from 'rbn-common-lib';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

describe('LoginService', () => {
  let loginService: LoginService;
  let translateSevice: TranslateService | undefined;
  let http: HttpTestingController | undefined;
  const restAPI = jasmine.createSpyObj('appInfoService', ['postNonJson', 'get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RbnCommonLibModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
        HttpClientTestingModule,
      ],
      providers: [{ provide: RestService, useValue: restAPI }],
    });

    // Inject the http service and test controller for each test
    translateSevice = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);
    if (http) {
      http.expectOne('./assets/i18n/en.json').flush({
        LOGIN: {
          VERSION: 'Version',
          USERNAME: 'Username',
          PASSWORD: 'Password',
          I_AGREE_TO_THE: 'I agree to the ',
          TERM_AND_CONDITION: 'terms and conditions',
          SIGNIN: 'Sign In',
          COPY_RIGHT:
            'Copyright \u00A9 1999-2019, Ribbon Communications Operating Company, Inc. (\"Ribbon\"). All Rights Reserved.',
          TERMS_LINK: 'https://ribboncommunications.com/company/company-policies/end-user-license-agreement',
        },
        MESSAGE_LOGIN: {
          INCORRECT: 'Username or password is incorrect!',
        },
      });
      http.expectOne('./assets/i18n/rbn_en.json').flush({
        COMMON: {
          RECORDS_FOUND: 'records found',
          RECORD_FOUND: 'record found',
          NO_RECORDS: 'No records found',
          CLOSE: 'Close',
          CLEAR: 'Clear Table',
          REFRESH: 'Refresh Table',
          SHOW_COLUMN: 'Show Columns',
          SEARCH: 'Search',
        },
      });
    }
    if (translateSevice) {
      translateSevice.addLangs(['en']);
      translateSevice.setDefaultLang('en');
    }
    loginService = TestBed.get(LoginService);
  });
  /// Tests begin ///

  it('should be created', () => {
    expect(loginService).toBeTruthy();
  });

  it('Call method post of rest API service from Login service', () => {
    loginService.login('admin', 'admin');
    expect(restAPI.postNonJson).toHaveBeenCalled();
  });

  it('Return token from rest API', () => {
    restAPI.postNonJson.and.returnValue(of({ token: '123456' }));
    loginService.login('admin', 'admin').subscribe((res: any) => {
      expect(res.token).toEqual('123456');
    });
  });

  it('Return logged info', () => {
    const testData = { username: 'test' };
    restAPI.get.and.returnValue(of(testData));
    loginService.getUserLogged().subscribe((res: any) => {
      expect(res.username).toEqual(testData.username);
    });
  });

  it('Should return logged success', () => {
    const isSuccess = loginService.isLoginSuccess(
      new HttpResponse({
        status: 200,
      })
    );
    expect(isSuccess).toBeTruthy();
  });

  it('Should return logged fail', () => {
    const isSuccess = loginService.isLoginSuccess(
      new HttpResponse({
        status: 500,
      })
    );
    expect(isSuccess).toBeFalsy();
  });

  it('return change password', () => {
    loginService.changePassword('username', 'password', 'newpassword', 'newpassword2').subscribe(res => {
      expect(res).toEqual(new HttpResponse());
    });
  });

  it('return false when call isChangePasswordSuccess', () => {
    const res = loginService.isChangePasswordSuccess(new HttpResponse());
    expect(res).toBeFalsy();
  });

  it('return get error message', () => {
    loginService.getErrorMessage().subscribe(res => {
      expect(res).toEqual(new HttpResponse());
    });
  });

  it('return get parse error message', () => {
    const res = loginService.parseError(new HttpResponse());
    expect(res).toEqual('Username or password is incorrect!');
  });

  it('return get parse password change', () => {
    const res = loginService.parsePasswordChange(new HttpResponse());
    expect(res).toBeFalsy();
  });
});
