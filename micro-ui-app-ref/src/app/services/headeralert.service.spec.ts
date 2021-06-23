import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { HeaderalertService } from './headeralert.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestService } from 'rbn-common-lib';

describe('HeaderalertService', () => {
  const headeralertOb = of({
    body: [{ severity: 'ERROR' }, { severity: 'DEBUG' }, { severity: 'INFO' }],
  });

  let service: HeaderalertService;
  const restAPI = jasmine.createSpyObj('restService', ['get']);

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: RestService, useValue: restAPI }],
    })
  );

  beforeEach(() => {
    restAPI.get.and.returnValue(headeralertOb);
    service = TestBed.get(HeaderalertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('return alert count', () => {
    service.getAlertCounts().subscribe(res => {
      expect(res.info).toEqual(1);
      expect(res.debug).toEqual(1);
      expect(res.error).toEqual(1);
    });
  });
});
