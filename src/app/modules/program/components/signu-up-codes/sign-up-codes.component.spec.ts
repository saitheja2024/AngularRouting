import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpCodesComponent } from './sign-up-codes.component';

describe('SignuUpCodesComponent', () => {
  let component: SignUpCodesComponent;
  let fixture: ComponentFixture<SignUpCodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpCodesComponent]
    });
    fixture = TestBed.createComponent(SignUpCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
