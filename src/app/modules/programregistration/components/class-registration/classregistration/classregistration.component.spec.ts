import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassregistrationComponent } from './classregistration.component';

describe('ClassregistrationComponent', () => {
  let component: ClassregistrationComponent;
  let fixture: ComponentFixture<ClassregistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassregistrationComponent]
    });
    fixture = TestBed.createComponent(ClassregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
