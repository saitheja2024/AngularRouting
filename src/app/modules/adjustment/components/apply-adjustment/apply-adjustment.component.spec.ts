import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyAdjustmentComponent } from './apply-adjustment.component';

describe('ApplyAdjustmentComponent', () => {
  let component: ApplyAdjustmentComponent;
  let fixture: ComponentFixture<ApplyAdjustmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyAdjustmentComponent]
    });
    fixture = TestBed.createComponent(ApplyAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
