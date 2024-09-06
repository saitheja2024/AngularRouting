import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicReportComponent } from './dynamic-report.component';

describe('DynamicReportComponent', () => {
  let component: DynamicReportComponent;
  let fixture: ComponentFixture<DynamicReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicReportComponent]
    });
    fixture = TestBed.createComponent(DynamicReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
