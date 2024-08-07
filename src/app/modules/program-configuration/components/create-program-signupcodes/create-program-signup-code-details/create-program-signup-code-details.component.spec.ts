import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgramSignupCodeDetailsComponent } from './create-program-signup-code-details.component';

describe('CreateProgramSignupCodeDetailsComponent', () => {
  let component: CreateProgramSignupCodeDetailsComponent;
  let fixture: ComponentFixture<CreateProgramSignupCodeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProgramSignupCodeDetailsComponent]
    });
    fixture = TestBed.createComponent(CreateProgramSignupCodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
