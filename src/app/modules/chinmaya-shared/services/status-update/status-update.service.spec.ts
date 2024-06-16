import { TestBed } from '@angular/core/testing';

import { StatusUpdateService } from './status-update.service';

describe('StatusUpdateService', () => {
  let service: StatusUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
