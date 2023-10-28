import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramComponent } from './program.component';

describe('ProgramComponent', () => {
  let component: ProgramComponent;
  let fixture: ComponentFixture<ProgramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramComponent]
    });
    fixture = TestBed.createComponent(ProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
