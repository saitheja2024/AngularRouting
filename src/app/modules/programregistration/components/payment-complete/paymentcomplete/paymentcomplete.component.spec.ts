import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentcompleteComponent } from './paymentcomplete.component';

describe('PaymentcompleteComponent', () => {
  let component: PaymentcompleteComponent;
  let fixture: ComponentFixture<PaymentcompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentcompleteComponent]
    });
    fixture = TestBed.createComponent(PaymentcompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
