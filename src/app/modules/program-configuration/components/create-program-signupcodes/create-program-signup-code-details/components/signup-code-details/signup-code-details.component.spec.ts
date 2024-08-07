import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCodeDetailsComponent } from './signup-code-details.component';

describe('SignupCodeDetailsComponent', () => {
  let component: SignupCodeDetailsComponent;
  let fixture: ComponentFixture<SignupCodeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupCodeDetailsComponent]
    });
    fixture = TestBed.createComponent(SignupCodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
