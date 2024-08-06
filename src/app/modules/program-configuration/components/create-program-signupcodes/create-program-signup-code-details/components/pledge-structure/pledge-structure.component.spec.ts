import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PledgeStructureComponent } from './pledge-structure.component';

describe('PledgeStructureComponent', () => {
  let component: PledgeStructureComponent;
  let fixture: ComponentFixture<PledgeStructureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PledgeStructureComponent]
    });
    fixture = TestBed.createComponent(PledgeStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
