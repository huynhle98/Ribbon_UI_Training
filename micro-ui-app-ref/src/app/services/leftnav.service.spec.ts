import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LeftnavService } from './leftnav.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestService } from 'rbn-common-lib';

describe('LeftnavService', () => {
  const menuItemsOb = {
    body: {
      dashboard: 'dashboard',
      vnfcatalog: 'false',
      livevnf: 'false',
      // actions: 'false',
      vnfmconfig: 'vnfmconfig',
      cloud: 'cloud',
      tenants: 'false',
      adminroot: 'false',
      users: 'false',
      roles: 'false',
      securityRealms: 'false',
      settings: 'false',
      database: 'false',
      vnfms: 'false',
      maintenance: 'false',
      restapis: 'false',
    },
  };

  let service: LeftnavService;
  const restAPI = jasmine.createSpyObj('restService', ['get', 'post']);

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: RestService, useValue: restAPI }],
    })
  );

  beforeEach(() => {
    restAPI.get.and.returnValue(of(menuItemsOb));
    service = TestBed.get(LeftnavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('return left nav items', () => {
    service.getLeftnavItems().subscribe(res => {
      expect(res.length).toEqual(2);
      expect(res[1].items && res[1].items.length).toEqual(1);
    });
  });
});
