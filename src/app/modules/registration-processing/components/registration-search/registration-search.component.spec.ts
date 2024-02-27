import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationSearchComponent } from './registration-search.component';

describe('RegistrationSearchComponent', () => {
  let component: RegistrationSearchComponent;
  let fixture: ComponentFixture<RegistrationSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationSearchComponent]
    });
    fixture = TestBed.createComponent(RegistrationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
