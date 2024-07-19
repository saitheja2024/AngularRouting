import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifymemberComponent } from './certifymember.component';

describe('CertifymemberComponent', () => {
  let component: CertifymemberComponent;
  let fixture: ComponentFixture<CertifymemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertifymemberComponent]
    });
    fixture = TestBed.createComponent(CertifymemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
