import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSearchHomeComponent } from './status-search-home.component';

describe('StatusSearchHomeComponent', () => {
  let component: StatusSearchHomeComponent;
  let fixture: ComponentFixture<StatusSearchHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusSearchHomeComponent]
    });
    fixture = TestBed.createComponent(StatusSearchHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
