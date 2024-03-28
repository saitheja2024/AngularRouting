import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramregistrationComponent } from './programregistration.component';

describe('ProgramregistrationComponent', () => {
  let component: ProgramregistrationComponent;
  let fixture: ComponentFixture<ProgramregistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramregistrationComponent]
    });
    fixture = TestBed.createComponent(ProgramregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
