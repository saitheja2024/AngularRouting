import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewConfigurationComponent } from './review-configuration.component';

describe('ReviewConfigurationComponent', () => {
  let component: ReviewConfigurationComponent;
  let fixture: ComponentFixture<ReviewConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewConfigurationComponent]
    });
    fixture = TestBed.createComponent(ReviewConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
