import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionPaymentdetailsComponent } from './selection-paymentdetails.component';

describe('SelectionPaymentdetailsComponent', () => {
  let component: SelectionPaymentdetailsComponent;
  let fixture: ComponentFixture<SelectionPaymentdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectionPaymentdetailsComponent]
    });
    fixture = TestBed.createComponent(SelectionPaymentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
