import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesAndTeacherAssignmentsComponent } from './classes-and-teacher-assignments.component';

describe('ClassesAndTeacherAssignmentsComponent', () => {
  let component: ClassesAndTeacherAssignmentsComponent;
  let fixture: ComponentFixture<ClassesAndTeacherAssignmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesAndTeacherAssignmentsComponent]
    });
    fixture = TestBed.createComponent(ClassesAndTeacherAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
