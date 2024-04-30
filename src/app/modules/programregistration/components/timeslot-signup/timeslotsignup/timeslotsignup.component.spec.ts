import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotsignupComponent } from './timeslotsignup.component';

describe('TimeslotsignupComponent', () => {
  let component: TimeslotsignupComponent;
  let fixture: ComponentFixture<TimeslotsignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeslotsignupComponent]
    });
    fixture = TestBed.createComponent(TimeslotsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
