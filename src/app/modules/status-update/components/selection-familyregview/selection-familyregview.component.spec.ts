import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionFamilyregviewComponent } from './selection-familyregview.component';

describe('SelectionFamilyregviewComponent', () => {
  let component: SelectionFamilyregviewComponent;
  let fixture: ComponentFixture<SelectionFamilyregviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectionFamilyregviewComponent]
    });
    fixture = TestBed.createComponent(SelectionFamilyregviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
