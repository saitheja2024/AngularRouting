/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DynamicReportService } from './dynamicReport.service';

describe('Service: DynamicReport', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicReportService]
    });
  });

  it('should ...', inject([DynamicReportService], (service: DynamicReportService) => {
    expect(service).toBeTruthy();
  }));
});
