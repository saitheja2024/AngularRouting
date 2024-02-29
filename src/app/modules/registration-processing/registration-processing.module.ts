import { NgModule } from '@angular/core';
import { REGISTRATION_PROCESSING_COMPONENTS } from './components/registration-processing.components.index';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { RegistrationProcessingRoutingModule } from './registration-processing-routing.module';
import { RegistrationSearchResultsComponent } from './components/registration-search-results/registration-search-results.component';
import { FamilyRegistrationDetailsComponent } from './components/family-registration-details/family-registration-details.component';



@NgModule({
  declarations: [REGISTRATION_PROCESSING_COMPONENTS, RegistrationSearchResultsComponent, FamilyRegistrationDetailsComponent],
  imports: [
    ChinmayaSharedModule,
    RegistrationProcessingRoutingModule
  ]
})
export class RegistrationProcessingModule { }
