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
import { NewRegistrationComponent } from './components/new-registration/new-registration.component';
import { SearchFamilyResultComponent } from './components/search-family-result/search-family-result.component';
import { ProgramDashboardComponent } from './components/program-dashboard/program-dashboard.component';
import { CertifymemberComponent } from './components/certifymember/certifymember.component';
import { CapitalizeDirective } from 'src/app/utils/directives/CapitalizeDirective/capitalize.directive';
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
        path: 'family-reg-workflow/:memberFlag',
        component: FamilyRegWorkflowComponent,
      },
      {
        path: 'search-family',
        component: SearchFamilyComponent,
      },
      {
        path: 'program-dashboard',
        component: ProgramDashboardComponent,
      },
      {
        path: 'certify-member/:memberFlag',
        component: CertifymemberComponent,
      },
      // {
      //   path: 'paymentcomplete',
      //   component: PaymentcompleteComponent,
      // },
      { path: '', redirectTo: 'family-reg-workflow', pathMatch: 'full' },
    ]
  },
];
const DIRECTIVES : any[] = [PhoneNumberFormatDirective, CapitalizeDirective]

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
    SearchFamilyComponent,
    NewRegistrationComponent,
    SearchFamilyResultComponent,
    ProgramDashboardComponent,
    CertifymemberComponent
  ],
  imports: [
    ChinmayaSharedModule,
    RouterModule.forChild(routes)
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[TrimPipe, RouteChangeCall, DatapasstoComponent],
})
export class ProgramregistrationModule { }