import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFamilyMembersComponent } from './all-family-members.component';

describe('AllFamilyMembersComponent', () => {
  let component: AllFamilyMembersComponent;
  let fixture: ComponentFixture<AllFamilyMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllFamilyMembersComponent]
    });
    fixture = TestBed.createComponent(AllFamilyMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
