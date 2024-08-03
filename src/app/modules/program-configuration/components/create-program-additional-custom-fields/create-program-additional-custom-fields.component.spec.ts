import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgramAdditionalCustomFieldsComponent } from './create-program-additional-custom-fields.component';

describe('CreateProgramAdditionalCustomFieldsComponent', () => {
  let component: CreateProgramAdditionalCustomFieldsComponent;
  let fixture: ComponentFixture<CreateProgramAdditionalCustomFieldsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProgramAdditionalCustomFieldsComponent]
    });
    fixture = TestBed.createComponent(CreateProgramAdditionalCustomFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
