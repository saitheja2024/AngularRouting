import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCodesComponent } from './class-codes.component';

describe('ClassCodesComponent', () => {
  let component: ClassCodesComponent;
  let fixture: ComponentFixture<ClassCodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassCodesComponent]
    });
    fixture = TestBed.createComponent(ClassCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
