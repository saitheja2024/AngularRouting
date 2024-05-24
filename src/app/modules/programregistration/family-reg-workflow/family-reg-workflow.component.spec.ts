import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyRegWorkflowComponent } from './family-reg-workflow.component';

describe('FamilyRegWorkflowComponent', () => {
  let component: FamilyRegWorkflowComponent;
  let fixture: ComponentFixture<FamilyRegWorkflowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyRegWorkflowComponent]
    });
    fixture = TestBed.createComponent(FamilyRegWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
