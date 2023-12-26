import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFamiliesComponent } from './search-families.component';

describe('SearchFamiliesComponent', () => {
  let component: SearchFamiliesComponent;
  let fixture: ComponentFixture<SearchFamiliesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFamiliesComponent]
    });
    fixture = TestBed.createComponent(SearchFamiliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});