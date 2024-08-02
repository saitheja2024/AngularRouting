import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgramReviewConfigurationComponent } from './create-program-review-configuration.component';

describe('CreateProgramReviewConfigurationComponent', () => {
  let component: CreateProgramReviewConfigurationComponent;
  let fixture: ComponentFixture<CreateProgramReviewConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProgramReviewConfigurationComponent]
    });
    fixture = TestBed.createComponent(CreateProgramReviewConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
