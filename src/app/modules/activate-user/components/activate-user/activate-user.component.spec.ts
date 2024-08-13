import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateUserComponent } from './activate-user.component';

describe('ActivateUserComponent', () => {
  let component: ActivateUserComponent;
  let fixture: ComponentFixture<ActivateUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateUserComponent]
    });
    fixture = TestBed.createComponent(ActivateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
