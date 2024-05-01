import { NgModule } from '@angular/core';
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
        path: 'constant',
        component: ConstantComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
      {
        path: 'paymentcomplete',
        component: PaymentcompleteComponent,
      },
      { path: '', redirectTo: 'registration', pathMatch: 'full' },
    ]
  },
];

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
  ],
  imports: [
    ChinmayaSharedModule,
    RouterModule.forChild(routes)
  ],
  
})
export class ProgramregistrationModule { }
