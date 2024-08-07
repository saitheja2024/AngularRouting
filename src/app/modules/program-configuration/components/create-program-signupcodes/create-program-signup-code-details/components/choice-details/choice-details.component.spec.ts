import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceDetailsComponent } from './choice-details.component';

describe('ChoiceDetailsComponent', () => {
  let component: ChoiceDetailsComponent;
  let fixture: ComponentFixture<ChoiceDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoiceDetailsComponent]
    });
    fixture = TestBed.createComponent(ChoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
