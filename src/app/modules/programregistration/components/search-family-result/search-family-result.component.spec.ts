import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFamilyResultComponent } from './search-family-result.component';

describe('SearchFamilyResultComponent', () => {
  let component: SearchFamilyResultComponent;
  let fixture: ComponentFixture<SearchFamilyResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFamilyResultComponent]
    });
    fixture = TestBed.createComponent(SearchFamilyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
