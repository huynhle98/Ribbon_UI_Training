import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopheaderComponent } from './topheader.component';
import { RbnCommonLibModule } from 'rbn-common-lib';
import { GlobalstatusService } from '../../services/globalstatus.service';
import { HeaderuserService } from '../../services/headeruser.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA, NgZone } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';

describe('TopheaderComponent', () => {
  let component: TopheaderComponent;
  let fixture: ComponentFixture<TopheaderComponent>;
  let originalTimeout: number;
  const globalStatusService = jasmine.createSpyObj('globalStatusService', ['getVnfmstatus', 'callVnfmState']);

  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });
  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    TestBed.resetTestingModule();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RbnCommonLibModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [TopheaderComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: GlobalstatusService, useValue: globalStatusService },
        { provide: 'HeaderuserInterfaceService', useClass: HeaderuserService },
        MessageService
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopheaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call get Vnfm State function', (done) => {
    spyOn(component, 'getVnfmstateOnce');
    const ngZone = TestBed.get(NgZone);
    spyOn(ngZone, 'runOutsideAngular').and.callFake((fn: Function) => fn());
    spyOn(ngZone, 'run').and.callFake((fn: Function) => fn());
    component.ngOnInit();
    setTimeout(() => {
      expect(component.getVnfmstateOnce).toHaveBeenCalled();
      window.clearInterval();
      done();
    }, 8001);
  });

  it('should not display value when vmfState is empty', () => {
    globalStatusService.getVnfmstatus.and.returnValue(of(''));
    component.getVnfmstateOnce();
    expect(component.vnfmStateTxt).toEqual('');
  });

  it('should not display value vmfState is Available', () => {
    globalStatusService.getVnfmstatus.and.returnValue(of('Available'));
    component.getVnfmstateOnce();
    expect(component.vnfmStateTxt).toEqual('');
  });

  it('should display "VNFM is in Maintenance mode" vmfState is Maintenance', () => {
    globalStatusService.getVnfmstatus.and.returnValue(of('Maintenance'));
    component.getVnfmstateOnce();
    expect(component.vnfmStateTxt).toEqual('VNFM is in Maintenance mode');
  });

  it('should display "VNFM is in DR mode" when vmfState is DisasterRecovery', () => {
    globalStatusService.getVnfmstatus.and.returnValue(of('DisasterRecovery'));
    component.getVnfmstateOnce();
    expect(component.vnfmStateTxt).toEqual('VNFM is in DR mode');
  });
});
