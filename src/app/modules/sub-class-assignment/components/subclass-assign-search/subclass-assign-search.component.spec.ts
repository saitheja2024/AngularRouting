import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubclassAssignSearchComponent } from './subclass-assign-search.component';

describe('SubclassAssignSearchComponent', () => {
  let component: SubclassAssignSearchComponent;
  let fixture: ComponentFixture<SubclassAssignSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubclassAssignSearchComponent]
    });
    fixture = TestBed.createComponent(SubclassAssignSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
