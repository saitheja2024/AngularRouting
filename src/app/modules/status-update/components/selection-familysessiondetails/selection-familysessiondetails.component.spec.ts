import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionFamilysessiondetailsComponent } from './selection-familysessiondetails.component';

describe('SelectionFamilysessiondetailsComponent', () => {
  let component: SelectionFamilysessiondetailsComponent;
  let fixture: ComponentFixture<SelectionFamilysessiondetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectionFamilysessiondetailsComponent]
    });
    fixture = TestBed.createComponent(SelectionFamilysessiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
