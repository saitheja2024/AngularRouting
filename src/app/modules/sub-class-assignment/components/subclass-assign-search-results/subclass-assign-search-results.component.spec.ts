import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubclassAssignSearchResultsComponent } from './subclass-assign-search-results.component';

describe('SubclassAssignSearchResultsComponent', () => {
  let component: SubclassAssignSearchResultsComponent;
  let fixture: ComponentFixture<SubclassAssignSearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubclassAssignSearchResultsComponent]
    });
    fixture = TestBed.createComponent(SubclassAssignSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
