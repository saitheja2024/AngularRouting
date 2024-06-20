import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubclasAssignHomeComponent } from './subclas-assign-home.component';

describe('SubclasAssignHomeComponent', () => {
  let component: SubclasAssignHomeComponent;
  let fixture: ComponentFixture<SubclasAssignHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubclasAssignHomeComponent]
    });
    fixture = TestBed.createComponent(SubclasAssignHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
