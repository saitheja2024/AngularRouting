import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewConfigClasscodeDetailsComponent } from './review-config-classcode-details.component';

describe('ReviewConfigClasscodeDetailsComponent', () => {
  let component: ReviewConfigClasscodeDetailsComponent;
  let fixture: ComponentFixture<ReviewConfigClasscodeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewConfigClasscodeDetailsComponent]
    });
    fixture = TestBed.createComponent(ReviewConfigClasscodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
