import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigDetailsComponent } from './config-details.component';

describe('ConfigDetailsComponent', () => {
  let component: ConfigDetailsComponent;
  let fixture: ComponentFixture<ConfigDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigDetailsComponent]
    });
    fixture = TestBed.createComponent(ConfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
