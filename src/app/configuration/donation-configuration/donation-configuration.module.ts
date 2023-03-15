import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationConfigurationRoutingModule } from './donation-configuration-routing.module';
import { DonationConfigurationComponent } from './donation-configuration.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DonationConfigurationComponent
  ],
  imports: [
    CommonModule,
    DonationConfigurationRoutingModule,
    SharedModule
  ]
})
export class DonationConfigurationModule { }
