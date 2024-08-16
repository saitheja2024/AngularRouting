import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesLookupComponent } from './roles-lookup.component';

describe('RolesLookupComponent', () => {
  let component: RolesLookupComponent;
  let fixture: ComponentFixture<RolesLookupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolesLookupComponent]
    });
    fixture = TestBed.createComponent(RolesLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
