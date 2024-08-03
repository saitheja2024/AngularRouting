import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgramSevaQuestionsComponent } from './create-program-seva-questions.component';

describe('CreateProgramSevaQuestionsComponent', () => {
  let component: CreateProgramSevaQuestionsComponent;
  let fixture: ComponentFixture<CreateProgramSevaQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProgramSevaQuestionsComponent]
    });
    fixture = TestBed.createComponent(CreateProgramSevaQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
