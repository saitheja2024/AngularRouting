import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAssignmentDetailsComponent } from './teacher-assignment-details.component';

describe('TeacherAssignmentDetailsComponent', () => {
  let component: TeacherAssignmentDetailsComponent;
  let fixture: ComponentFixture<TeacherAssignmentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherAssignmentDetailsComponent]
    });
    fixture = TestBed.createComponent(TeacherAssignmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
