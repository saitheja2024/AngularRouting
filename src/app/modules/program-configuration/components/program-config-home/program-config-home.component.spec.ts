import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramConfigHomeComponent } from './program-config-home.component';

describe('ProgramConfigHomeComponent', () => {
  let component: ProgramConfigHomeComponent;
  let fixture: ComponentFixture<ProgramConfigHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramConfigHomeComponent]
    });
    fixture = TestBed.createComponent(ProgramConfigHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
