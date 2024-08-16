import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAccessHomeComponent } from './role-access-home.component';

describe('RoleAccessHomeComponent', () => {
  let component: RoleAccessHomeComponent;
  let fixture: ComponentFixture<RoleAccessHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleAccessHomeComponent]
    });
    fixture = TestBed.createComponent(RoleAccessHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
