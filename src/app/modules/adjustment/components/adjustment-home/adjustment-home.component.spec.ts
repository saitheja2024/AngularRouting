import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustmentHomeComponent } from './adjustment-home.component';

describe('AdjustmentHomeComponent', () => {
  let component: AdjustmentHomeComponent;
  let fixture: ComponentFixture<AdjustmentHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdjustmentHomeComponent]
    });
    fixture = TestBed.createComponent(AdjustmentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
