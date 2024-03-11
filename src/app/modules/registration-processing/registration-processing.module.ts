import { NgModule } from '@angular/core';
import { REGISTRATION_PROCESSING_COMPONENTS } from './components/registration-processing.components.index';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { RegistrationProcessingRoutingModule } from './registration-processing-routing.module';



@NgModule({
  declarations: [REGISTRATION_PROCESSING_COMPONENTS],
  imports: [
    RegistrationProcessingRoutingModule,
    ChinmayaSharedModule
  ]
})
export class RegistrationProcessingModule { }
