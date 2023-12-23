import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFamiliesComponent } from './family-list.component';

describe('AllFamiliesComponent', () => {
  let component: AllFamiliesComponent;
  let fixture: ComponentFixture<AllFamiliesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllFamiliesComponent]
    });
    fixture = TestBed.createComponent(AllFamiliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
