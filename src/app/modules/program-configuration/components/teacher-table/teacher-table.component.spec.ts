import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherTableComponent } from './teacher-table.component';

describe('TeacherTableComponent', () => {
  let component: TeacherTableComponent;
  let fixture: ComponentFixture<TeacherTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherTableComponent]
    });
    fixture = TestBed.createComponent(TeacherTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
