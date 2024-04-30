import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthinformationComponent } from './healthinformation.component';

describe('HealthinformationComponent', () => {
  let component: HealthinformationComponent;
  let fixture: ComponentFixture<HealthinformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthinformationComponent]
    });
    fixture = TestBed.createComponent(HealthinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
