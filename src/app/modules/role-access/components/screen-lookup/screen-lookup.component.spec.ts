import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenLookupComponent } from './screen-lookup.component';

describe('ScreenLookupComponent', () => {
  let component: ScreenLookupComponent;
  let fixture: ComponentFixture<ScreenLookupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenLookupComponent]
    });
    fixture = TestBed.createComponent(ScreenLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
