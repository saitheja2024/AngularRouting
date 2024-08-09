import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgramPackageDetailsComponent } from './create-program-package-details.component';

describe('CreateProgramPackageDetailsComponent', () => {
  let component: CreateProgramPackageDetailsComponent;
  let fixture: ComponentFixture<CreateProgramPackageDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProgramPackageDetailsComponent]
    });
    fixture = TestBed.createComponent(CreateProgramPackageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
