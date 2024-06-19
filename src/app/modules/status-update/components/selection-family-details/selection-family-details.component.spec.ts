import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionFamilyDetailsComponent } from './selection-family-details.component';

describe('SelectionFamilyDetailsComponent', () => {
  let component: SelectionFamilyDetailsComponent;
  let fixture: ComponentFixture<SelectionFamilyDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectionFamilyDetailsComponent]
    });
    fixture = TestBed.createComponent(SelectionFamilyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
