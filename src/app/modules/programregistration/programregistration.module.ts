import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramregistrationComponent } from '../programregistration/programregistration/programregistration.component';
import { RouterModule, Routes } from '@angular/router';
import { ClassregistrationComponent } from './components/class-registration/classregistration/classregistration.component';
import { AdditionaldetailsComponent } from './components/additional-details/additionaldetails/additionaldetails.component';
import { HealthinformationComponent } from './components/health-information/healthinformation/healthinformation.component';
import { TimeslotsignupComponent } from './components/timeslot-signup/timeslotsignup/timeslotsignup.component';
import { ReviewComponent } from './components/review/review/review.component';
import { ConstantComponent } from './components/constant/constant/constant.component';
import { PaymentComponent } from './components/payment/payment/payment.component';
import { PaymentcompleteComponent } from './components/payment-complete/paymentcomplete/paymentcomplete.component';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { TrimPipe } from 'src/app/pipes/trim.pipe';
import { RouteChangeCall } from '../chinmaya-shared/services/program-registration/routechange.service';
import { DatapasstoComponent } from '../chinmaya-shared/services/program-registration/datapassing.service';
import { PhoneNumberFormatDirective } from 'src/app/utils/directives/phone-number-format.directive';
import * as $ from 'jquery';
import { FamilyRegWorkflowComponent } from './family-reg-workflow/family-reg-workflow.component';
import { SearchFamilyComponent } from './search-family/search-family.component';

const routes: Routes = [
  {
    path: '',
    component: ProgramregistrationComponent,
    children: [
      {
        path: '',
        redirectTo: 'registration',
        pathMatch: 'full',
      },
      {
        path: 'registration',
        component: ClassregistrationComponent,
      },
      {
        path: 'additionaldetails',
        component: AdditionaldetailsComponent,
      },
      {
        path: 'healthinformation',
        component: HealthinformationComponent,
      },
      {
        path: 'timeslot-signup',
        component: TimeslotsignupComponent,
      },
      {
        path: 'review',
        component: ReviewComponent,
      },
      {
        path: 'consent',
        component: ConstantComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
      {
        path: 'family-reg-workflow',
        component: FamilyRegWorkflowComponent,
      },
      {
        path: 'search-family',
        component: SearchFamilyComponent,
      },
      // {
      //   path: 'paymentcomplete',
      //   component: PaymentcompleteComponent,
      // },
      { path: '', redirectTo: 'registration', pathMatch: 'full' },
    ]
  },
];
const DIRECTIVES : any[] = [PhoneNumberFormatDirective]

@NgModule({
  declarations: [
    ProgramregistrationComponent,
    ClassregistrationComponent,
    AdditionaldetailsComponent,
    HealthinformationComponent,
    TimeslotsignupComponent,
    ReviewComponent,
    ConstantComponent,
    PaymentComponent,
    PaymentcompleteComponent,
    TrimPipe,
    DIRECTIVES,
    FamilyRegWorkflowComponent,
    SearchFamilyComponent
  ],
  imports: [
    ChinmayaSharedModule,
    RouterModule.forChild(routes)
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[TrimPipe, RouteChangeCall, DatapasstoComponent],
})
export class ProgramregistrationModule { }