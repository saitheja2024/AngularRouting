import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFamilyViewHomePageComponent } from './search-family-view-home-page.component';

describe('SearchFamilyViewHomePageComponent', () => {
  let component: SearchFamilyViewHomePageComponent;
  let fixture: ComponentFixture<SearchFamilyViewHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFamilyViewHomePageComponent]
    });
    fixture = TestBed.createComponent(SearchFamilyViewHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
