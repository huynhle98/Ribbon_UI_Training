import { TestBed } from '@angular/core/testing';

import { FmService } from './fm.service';

describe('FmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FmService = TestBed.get(FmService);
    expect(service).toBeTruthy();
  });
});
