import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HeaderuserService } from './headeruser.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestService, RbnCommonLibModule } from 'rbn-common-lib';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

describe('HeaderuserService', () => {
  const loggedUser = {
    body: {
      username: 'sysadmin',
    },
  };

  const versionInfo = {
    body: {
      buildVersion: 'buildVersion',
      buildTime: 'buildTime',
      commitId: 'commitId',
      sourceIp: 'sourceIp',
      vnfmRestUrl: 'vnfmRestUrl',
      vnfmRestUrlIpv6: 'vnfmRestUrlIpv6',
      buildNumber: 'buildNumber',
    },
  };

  let service: HeaderuserService;
  const restAPI = jasmine.createSpyObj('restService', ['get', 'post']);
  const router = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, RbnCommonLibModule],
      providers: [{ provide: RestService, useValue: restAPI }, { provide: Router, useValue: router }, MessageService],
    });
    service = TestBed.get(HeaderuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('return logged user info', () => {
    restAPI.get.and.returnValue(of(loggedUser));
    service.getLoginUser().subscribe(res => {
      expect(res.items[0].label).toEqual('sysadmin');
    });
  });

  it('return user actions', () => {
    restAPI.get.and.returnValue(of(versionInfo));
    service.getUserActions().subscribe(res => {
      expect(res.items[0].label).toEqual('sysadmin');
      expect(res.infoContent[0]).toEqual('Version: ' + versionInfo.body.buildVersion);
    });
  });

  it('should logout success', () => {
    restAPI.post.and.returnValue(of(true));
    service.logout();
    expect(restAPI.post).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should logout fail', () => {
    restAPI.post.and.returnValue(throwError('error'));
    service.logout();
    expect(restAPI.post).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
