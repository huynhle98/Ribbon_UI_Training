import { TestBed } from '@angular/core/testing';

import { RibbonLibService } from './ribbon-lib.service';

describe('RibbonLibService', () => {
  let service: RibbonLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RibbonLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
