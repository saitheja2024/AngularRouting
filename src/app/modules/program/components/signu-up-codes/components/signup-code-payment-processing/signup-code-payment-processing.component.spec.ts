import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCodePaymentProcessingComponent } from './signup-code-payment-processing.component';

describe('SignupCodePaymentProcessingComponent', () => {
  let component: SignupCodePaymentProcessingComponent;
  let fixture: ComponentFixture<SignupCodePaymentProcessingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupCodePaymentProcessingComponent]
    });
    fixture = TestBed.createComponent(SignupCodePaymentProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
