import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationStepsComponent } from './registration-steps.component';

describe('RegistrationStepsComponent', () => {
  let component: RegistrationStepsComponent;
  let fixture: ComponentFixture<RegistrationStepsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationStepsComponent]
    });
    fixture = TestBed.createComponent(RegistrationStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
