import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgramRegStepsEmailComponent } from './create-program-reg-steps-email.component';

describe('CreateProgramRegStepsEmailComponent', () => {
  let component: CreateProgramRegStepsEmailComponent;
  let fixture: ComponentFixture<CreateProgramRegStepsEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProgramRegStepsEmailComponent]
    });
    fixture = TestBed.createComponent(CreateProgramRegStepsEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
