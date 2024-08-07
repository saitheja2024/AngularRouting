import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentProcessingComponent } from './payment-processing.component';

describe('PaymentProcessingComponent', () => {
  let component: PaymentProcessingComponent;
  let fixture: ComponentFixture<PaymentProcessingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentProcessingComponent]
    });
    fixture = TestBed.createComponent(PaymentProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
