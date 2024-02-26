import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationProcessingRoutingModule } from './registration-processing-routing.module';
import { RegistrationProcessingComponent } from './registration-processing.component';


@NgModule({
  declarations: [
    RegistrationProcessingComponent
  ],
  imports: [
    CommonModule,
    RegistrationProcessingRoutingModule
  ]
})
export class RegistrationProcessingModule { }
