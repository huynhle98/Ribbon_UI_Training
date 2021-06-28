import { TestBed, inject, async} from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AppModule } from '../app.module';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
// import { GetInformationService } from '../services/get-information.service';
// import { LeftnavService } from '../services/leftnav.service';
import { RestService } from 'rbn-common-lib';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockSnapshot: RouterStateSnapshot;
  let activeSnapshot: ActivatedRouteSnapshot;
  const restAPI = jasmine.createSpyObj('restService', ['get']);
  const svc = jasmine.createSpyObj('svc', ['getUserLogged']);
  let mockRouter: any;
  class MockRouter {
    // noinspection TypeScriptUnresolvedFunction
    navigate = jasmine.createSpy('navigate');
  }
  let originalTimeout: number;
  beforeEach(function() {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });
  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    TestBed.resetTestingModule();
  });
  beforeEach(async(() => {
    mockRouter = new MockRouter();
    mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
    activeSnapshot = jasmine.createSpyObj<ActivatedRouteSnapshot>('ActivatedRouteSnapshot', ['toString']);
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthGuard,
        { provide: RestService, useValue: restAPI },
        { provide: 'LoginInterfaceService', useClass: LoginService },
        { provide: LoginService, useValue: svc },
        // { provide: 'GetInfoInterfaceService', useClass: GetInformationService },
        // { provide: 'LeftnavInterfaceService', useClass: LeftnavService },
        { provide: Router, useValue: mockRouter }
      ]
    });
  }));

  beforeEach(inject([
    AuthGuard
  ], (_guard: AuthGuard) => {
    guard = _guard;
  }));

  it('should created', () => {
    expect(guard).toBeTruthy();
  });

  it('should have a canActivate method', () => {
    expect(typeof guard.canActivate).toBe('function');
  });

  it('should check user is authenticated', () => {
    svc.getUserLogged.and.returnValue(of({body: 'test'}));
    guard.checkUserLoggedForLoginComponent().subscribe(res => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['vnfm/dashboard']);
      expect(res).toBe(false);
    });
  });

  it('should check user return data but wrong', () => {
    svc.getUserLogged.and.returnValue(of({username: 'test'}));
    guard.checkUserLoggedForLoginComponent().subscribe(res => {
      expect(res).toBe(true);
    });
  });

  it('shoud call function #checkUserLoggedForLoginComponent', () => {
    spyOn(guard, 'checkUserLoggedForLoginComponent');
    mockSnapshot.url = '/login';
    guard.canActivate(activeSnapshot, mockSnapshot);
    expect(guard.checkUserLoggedForLoginComponent).toHaveBeenCalled();
  });

  it('shoud call function #checkUserLogged', () => {
    spyOn(guard, 'checkUserLogged');
    mockSnapshot.url = '/vnfm/dashboard';
    guard.canActivate(activeSnapshot, mockSnapshot);
    expect(guard.checkUserLogged).toHaveBeenCalled();
  });

  it('should return true if user logged', () => {
    svc.getUserLogged.and.returnValue(of({body: 'test'}));
    guard.checkUserLogged().subscribe(res => {
      expect(res).toBe(true);
    });
  });

  it('should return false when check user return wrong data', () => {
    svc.getUserLogged.and.returnValue(of({username: 'test'}));
    guard.checkUserLogged().subscribe(res => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
      expect(res).toBe(false);
    });
  });

  it('should navigate login when get user login fail', () => {
    svc.getUserLogged.and.returnValue(of({username: 'test'}));
    guard.getUserLoggedFc();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should return false for getUserLoggedFc when check user return error', () => {
    restAPI.get.and.returnValue(throwError({ error: 'Error Message', status: 403 }));
    svc.getUserLogged.and.returnValue(throwError({ error: 'Error Message', status: 403 }));
    guard.getUserLoggedFc();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  });

  // it('should return false for checkUserLogged when check user return error', () => {
  //   restAPI.get.and.returnValue(throwError({ error: 'Error Message', status: 403 }));
  //   svc.getUserLogged.and.returnValue(throwError({ error: 'Error Message', status: 403 }));
  //   guard.checkUserLogged().subscribe(() => { }, (res: any) => {
  //     expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  //     expect(res).toBe(false);
  //   });
  // });

  // it('should return true for checkUserLoggedForLoginComponent when check user return error', () => {
  //   restAPI.get.and.returnValue(throwError({ error: 'Error Message', status: 403 }));
  //   svc.getUserLogged.and.returnValue(throwError({ error: 'Error Message', status: 403 }));
  //   guard.checkUserLoggedForLoginComponent().subscribe(() => { }, (res: any) => {
  //     expect(res).toBe(true);
  //   });
  // });
});


