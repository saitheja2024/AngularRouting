import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewConfigChoiceCodeDetailsComponent } from './review-config-choice-code-details.component';

describe('ReviewConfigChoiceCodeDetailsComponent', () => {
  let component: ReviewConfigChoiceCodeDetailsComponent;
  let fixture: ComponentFixture<ReviewConfigChoiceCodeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewConfigChoiceCodeDetailsComponent]
    });
    fixture = TestBed.createComponent(ReviewConfigChoiceCodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
