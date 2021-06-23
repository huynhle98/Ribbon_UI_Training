import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { GlobalstatusService } from './globalstatus.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestService } from 'rbn-common-lib';

describe('GlobalstatusService', () => {
  let service: GlobalstatusService;
  const restAPI = jasmine.createSpyObj('restService', ['get']);
  const vnfmState = {
    body: {
      vnfmState: ['test'],
    },
  };
  const vnfmStateOb = of(vnfmState);

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: RestService, useValue: restAPI }],
    })
  );

  beforeEach(() => {
    restAPI.get.and.returnValue(vnfmStateOb);
    service = TestBed.get(GlobalstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('return Vnfm status', () => {
    service.getVnfmstatus().subscribe(res => {
      expect(res).toEqual(['test']);
    });
  });
});
