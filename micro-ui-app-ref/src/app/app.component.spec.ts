import { TestBed, ComponentFixture } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { RbnCommonLibModule, HttpLoaderFactory } from 'rbn-common-lib';

import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/primeng';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let translateSevice: TranslateService | undefined;
  let http: HttpTestingController | undefined;

  let originalTimeout: number;
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });
  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
      declarations: [AppComponent],
      providers: [ MessageService, { provide: APP_BASE_HREF, useValue: '/' }],
    }).compileComponents();
  });

  beforeEach(() => {
    translateSevice = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);
    if (http) {
      http.expectOne('./assets/i18n/en.json').flush({
        MESSAGE_LOGIN: {
          INCORRECT: 'Username or password is incorrect!',
          SUCCESS: 'Logging in is success!',
          USERNAME_REQUIRED: 'Username is required.',
          PASSWORD_REQUIRED: 'Password is required.',
          PASSWORD_LONGER: 'Please enter at least 3 characters',
          TERMS: 'You have to agree to the terms and conditions!',
          CAPSLOCK: 'Warning: CapsLock is ON',
          PASSWORD_SHORTER: 'Please enter no more than 20 characters',
        },
      });
      http.expectOne('./assets/i18n/rbn_en.json').flush({
        MESSAGE_LOGIN: {
          INCORRECT: 'Username or password is incorrect!',
          SUCCESS: 'Logging in is success!',
          USERNAME_REQUIRED: 'Username is required',
          PASSWORD_REQUIRED: 'Password is required',
          PASSWORD_LONGER: 'Please enter at least 3 characters',
          TERMS: 'You have to agree to the terms and conditions!',
          CAPSLOCK: 'Warning: CapsLock is ON',
          PASSWORD_SHORTER: 'Please enter no more than 20 characters',
        },
      });
    }
    if (translateSevice) {
      translateSevice.addLangs(['en']);
      translateSevice.setDefaultLang('en');
    }
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  // it(`should have as title 'vnfm'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('vnfm');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to vnfm!');
  // }));
});
