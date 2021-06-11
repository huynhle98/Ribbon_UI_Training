import { TestBed } from '@angular/core/testing';

import { RibbonLibService } from './ribbon-lib.service';

describe('RibbonLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RibbonLibService = TestBed.get(RibbonLibService);
    expect(service).toBeTruthy();
  });
});
