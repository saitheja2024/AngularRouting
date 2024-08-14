import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesAndTeacherAssignementHomeComponent } from './classes-and-teacher-assignement-home.component';

describe('ClassesAndTeacherAssignementHomeComponent', () => {
  let component: ClassesAndTeacherAssignementHomeComponent;
  let fixture: ComponentFixture<ClassesAndTeacherAssignementHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesAndTeacherAssignementHomeComponent]
    });
    fixture = TestBed.createComponent(ClassesAndTeacherAssignementHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
