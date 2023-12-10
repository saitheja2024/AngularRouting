import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpCodeListComponent } from './sign-up-code-list.component';

describe('SignUpCodeListComponent', () => {
  let component: SignUpCodeListComponent;
  let fixture: ComponentFixture<SignUpCodeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpCodeListComponent]
    });
    fixture = TestBed.createComponent(SignUpCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
