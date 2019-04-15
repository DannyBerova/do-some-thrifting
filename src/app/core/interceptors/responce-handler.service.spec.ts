import { TestBed } from '@angular/core/testing';

import { ResponceHandlerService } from './responce-handler.service';

describe('ResponceHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResponceHandlerService = TestBed.get(ResponceHandlerService);
    expect(service).toBeTruthy();
  });
});
