import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDashboardComponent } from './program-dashboard.component';

describe('ProgramDashboardComponent', () => {
  let component: ProgramDashboardComponent;
  let fixture: ComponentFixture<ProgramDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramDashboardComponent]
    });
    fixture = TestBed.createComponent(ProgramDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
