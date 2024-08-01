import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgramProgramDetailsComponent } from './create-program-program-details.component';

describe('CreateProgramProgramDetailsComponent', () => {
  let component: CreateProgramProgramDetailsComponent;
  let fixture: ComponentFixture<CreateProgramProgramDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProgramProgramDetailsComponent]
    });
    fixture = TestBed.createComponent(CreateProgramProgramDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
