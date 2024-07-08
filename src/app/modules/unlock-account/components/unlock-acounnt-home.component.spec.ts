import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockAcounntHomeComponent } from './unlock-acounnt-home.component';

describe('UnlockAcounntHomeComponent', () => {
  let component: UnlockAcounntHomeComponent;
  let fixture: ComponentFixture<UnlockAcounntHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnlockAcounntHomeComponent]
    });
    fixture = TestBed.createComponent(UnlockAcounntHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
