import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

import { GetMessagesService } from './get-messages.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestService } from 'rbn-common-lib';

describe('GetMessagesService', () => {
  let service: GetMessagesService;
  const restAPI = jasmine.createSpyObj('restService', ['get']);
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: RestService, useValue: restAPI }],
    })
  );
  beforeEach(() => {
    service = TestBed.get(GetMessagesService);
    restAPI.get.and.returnValue(of({ body: 'test' }));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call get method and return value in getSystemMessage method', () => {
    service.getSystemMessage().subscribe(res => {
      expect(res.body).toEqual('test');
    });
  });

  it('should be call get method and return value in getOrchestrationMessage method', () => {
    service.getOrchestrationMessage().subscribe(res => {
      expect(res.body).toEqual('test');
    });
  });
});
