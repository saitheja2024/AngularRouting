import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyRegistrationDetailsComponent } from './family-registration-details.component';

describe('FamilyRegistrationDetailsComponent', () => {
  let component: FamilyRegistrationDetailsComponent;
  let fixture: ComponentFixture<FamilyRegistrationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyRegistrationDetailsComponent]
    });
    fixture = TestBed.createComponent(FamilyRegistrationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
