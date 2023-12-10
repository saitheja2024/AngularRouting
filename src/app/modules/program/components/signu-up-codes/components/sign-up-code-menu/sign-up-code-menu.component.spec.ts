import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpCodeMenuComponent } from './sign-up-code-menu.component';

describe('SignUpCodeMenuComponent', () => {
  let component: SignUpCodeMenuComponent;
  let fixture: ComponentFixture<SignUpCodeMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpCodeMenuComponent]
    });
    fixture = TestBed.createComponent(SignUpCodeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
