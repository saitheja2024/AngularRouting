import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgramConfigurationDetailsComponent } from './create-program-configuration-details.component';

describe('CreateProgramConfigurationDetailsComponent', () => {
  let component: CreateProgramConfigurationDetailsComponent;
  let fixture: ComponentFixture<CreateProgramConfigurationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProgramConfigurationDetailsComponent]
    });
    fixture = TestBed.createComponent(CreateProgramConfigurationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
