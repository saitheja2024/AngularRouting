import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionaldetailsComponent } from './additionaldetails.component';

describe('AdditionaldetailsComponent', () => {
  let component: AdditionaldetailsComponent;
  let fixture: ComponentFixture<AdditionaldetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionaldetailsComponent]
    });
    fixture = TestBed.createComponent(AdditionaldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
