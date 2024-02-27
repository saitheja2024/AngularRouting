import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSearchComponent } from './email-search.component';

describe('EmailSearchComponent', () => {
  let component: EmailSearchComponent;
  let fixture: ComponentFixture<EmailSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailSearchComponent]
    });
    fixture = TestBed.createComponent(EmailSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
