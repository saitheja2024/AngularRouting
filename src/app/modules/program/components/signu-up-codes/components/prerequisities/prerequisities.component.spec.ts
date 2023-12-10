import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerequisitiesComponent } from './prerequisities.component';

describe('PrerequisitiesComponent', () => {
  let component: PrerequisitiesComponent;
  let fixture: ComponentFixture<PrerequisitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrerequisitiesComponent]
    });
    fixture = TestBed.createComponent(PrerequisitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
