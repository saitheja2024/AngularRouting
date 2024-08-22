import { TestBed } from '@angular/core/testing';

import { QuicksiteService } from './quicksite.service';

describe('QuicksiteService', () => {
  let service: QuicksiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuicksiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
