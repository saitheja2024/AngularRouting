import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFamilyViewDetailsComponent } from './search-family-view-details.component';

describe('SearchFamilyViewDetailsComponent', () => {
  let component: SearchFamilyViewDetailsComponent;
  let fixture: ComponentFixture<SearchFamilyViewDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFamilyViewDetailsComponent]
    });
    fixture = TestBed.createComponent(SearchFamilyViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
