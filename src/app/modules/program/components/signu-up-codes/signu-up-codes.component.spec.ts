import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignuUpCodesComponent } from './signu-up-codes.component';

describe('SignuUpCodesComponent', () => {
  let component: SignuUpCodesComponent;
  let fixture: ComponentFixture<SignuUpCodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignuUpCodesComponent]
    });
    fixture = TestBed.createComponent(SignuUpCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
