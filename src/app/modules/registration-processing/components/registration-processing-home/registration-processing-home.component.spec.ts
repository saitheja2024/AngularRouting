import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationProcessingHomeComponent } from './registration-processing-home.component';

describe('RegistrationProcessingHomeComponent', () => {
  let component: RegistrationProcessingHomeComponent;
  let fixture: ComponentFixture<RegistrationProcessingHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationProcessingHomeComponent]
    });
    fixture = TestBed.createComponent(RegistrationProcessingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
