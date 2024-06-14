import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSearchResultsComponent } from './status-search-results.component';

describe('StatusSearchResultsComponent', () => {
  let component: StatusSearchResultsComponent;
  let fixture: ComponentFixture<StatusSearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusSearchResultsComponent]
    });
    fixture = TestBed.createComponent(StatusSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
