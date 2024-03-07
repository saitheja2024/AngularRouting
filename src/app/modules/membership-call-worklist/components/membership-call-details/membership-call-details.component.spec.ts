import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipCallDetailsComponent } from './membership-call-details.component';

describe('MembershipCallDetailsComponent', () => {
  let component: MembershipCallDetailsComponent;
  let fixture: ComponentFixture<MembershipCallDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipCallDetailsComponent]
    });
    fixture = TestBed.createComponent(MembershipCallDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
