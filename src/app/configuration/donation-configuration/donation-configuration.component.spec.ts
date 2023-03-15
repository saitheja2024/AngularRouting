import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationConfigurationComponent } from './donation-configuration.component';

describe('DonationConfigurationComponent', () => {
  let component: DonationConfigurationComponent;
  let fixture: ComponentFixture<DonationConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
