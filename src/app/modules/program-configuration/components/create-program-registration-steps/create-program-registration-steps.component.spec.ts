import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgramRegistrationStepsComponent } from './create-program-registration-steps.component';

describe('CreateProgramRegistrationStepsComponent', () => {
  let component: CreateProgramRegistrationStepsComponent;
  let fixture: ComponentFixture<CreateProgramRegistrationStepsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProgramRegistrationStepsComponent]
    });
    fixture = TestBed.createComponent(CreateProgramRegistrationStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
