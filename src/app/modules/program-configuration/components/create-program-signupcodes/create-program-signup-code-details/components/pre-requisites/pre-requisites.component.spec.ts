import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRequisitesComponent } from './pre-requisites.component';

describe('PreRequisitesComponent', () => {
  let component: PreRequisitesComponent;
  let fixture: ComponentFixture<PreRequisitesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreRequisitesComponent]
    });
    fixture = TestBed.createComponent(PreRequisitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
