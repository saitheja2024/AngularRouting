import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMemberDetailsComponent } from './family-member-details.component';

describe('FamilyMemberDetailsComponent', () => {
  let component: FamilyMemberDetailsComponent;
  let fixture: ComponentFixture<FamilyMemberDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyMemberDetailsComponent]
    });
    fixture = TestBed.createComponent(FamilyMemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
