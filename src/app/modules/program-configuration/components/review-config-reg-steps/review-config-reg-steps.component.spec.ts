import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewConfigRegStepsComponent } from './review-config-reg-steps.component';

describe('ReviewConfigRegStepsComponent', () => {
  let component: ReviewConfigRegStepsComponent;
  let fixture: ComponentFixture<ReviewConfigRegStepsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewConfigRegStepsComponent]
    });
    fixture = TestBed.createComponent(ReviewConfigRegStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
