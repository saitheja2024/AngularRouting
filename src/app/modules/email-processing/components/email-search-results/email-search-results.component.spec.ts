import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSearchResultsComponent } from './email-search-results.component';

describe('EmailSearchResultsComponent', () => {
  let component: EmailSearchResultsComponent;
  let fixture: ComponentFixture<EmailSearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailSearchResultsComponent]
    });
    fixture = TestBed.createComponent(EmailSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
