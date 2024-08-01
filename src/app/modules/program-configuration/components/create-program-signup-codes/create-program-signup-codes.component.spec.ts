import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgramSignupCodesComponent } from './create-program-signup-codes.component';

describe('CreateProgramSignupCodesComponent', () => {
  let component: CreateProgramSignupCodesComponent;
  let fixture: ComponentFixture<CreateProgramSignupCodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProgramSignupCodesComponent]
    });
    fixture = TestBed.createComponent(CreateProgramSignupCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
