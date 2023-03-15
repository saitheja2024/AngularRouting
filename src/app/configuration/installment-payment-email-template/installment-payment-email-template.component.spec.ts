import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentPaymentEmailTemplateComponent } from './installment-payment-email-template.component';

describe('InstallmentPaymentEmailTemplateComponent', () => {
  let component: InstallmentPaymentEmailTemplateComponent;
  let fixture: ComponentFixture<InstallmentPaymentEmailTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallmentPaymentEmailTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstallmentPaymentEmailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
