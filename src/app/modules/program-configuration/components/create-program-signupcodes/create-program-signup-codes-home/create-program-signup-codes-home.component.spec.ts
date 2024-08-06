import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgramSignupCodesHomeComponent } from './create-program-signup-codes-home.component';

describe('CreateProgramSignupCodesHomeComponent', () => {
  let component: CreateProgramSignupCodesHomeComponent;
  let fixture: ComponentFixture<CreateProgramSignupCodesHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProgramSignupCodesHomeComponent]
    });
    fixture = TestBed.createComponent(CreateProgramSignupCodesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
