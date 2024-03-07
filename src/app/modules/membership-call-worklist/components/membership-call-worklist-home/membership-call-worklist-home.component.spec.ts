import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipCallWorklistHomeComponent } from './membership-call-worklist-home.component';

describe('MembershipCallWorklistHomeComponent', () => {
  let component: MembershipCallWorklistHomeComponent;
  let fixture: ComponentFixture<MembershipCallWorklistHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipCallWorklistHomeComponent]
    });
    fixture = TestBed.createComponent(MembershipCallWorklistHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
