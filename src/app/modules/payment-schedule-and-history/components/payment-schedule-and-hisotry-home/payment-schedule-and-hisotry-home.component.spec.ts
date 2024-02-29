import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentScheduleAndHisotryHomeComponent } from './payment-schedule-and-hisotry-home.component';

describe('PaymentScheduleAndHisotryHomeComponent', () => {
  let component: PaymentScheduleAndHisotryHomeComponent;
  let fixture: ComponentFixture<PaymentScheduleAndHisotryHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentScheduleAndHisotryHomeComponent]
    });
    fixture = TestBed.createComponent(PaymentScheduleAndHisotryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
