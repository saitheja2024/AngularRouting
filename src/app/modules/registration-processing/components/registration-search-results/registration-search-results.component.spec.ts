import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationSearchResultsComponent } from './registration-search-results.component';

describe('RegistrationSearchResultsComponent', () => {
  let component: RegistrationSearchResultsComponent;
  let fixture: ComponentFixture<RegistrationSearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationSearchResultsComponent]
    });
    fixture = TestBed.createComponent(RegistrationSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
