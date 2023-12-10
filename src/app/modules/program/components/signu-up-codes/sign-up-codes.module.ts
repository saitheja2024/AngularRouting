import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpCodesComponent } from './sign-up-codes.component';
import { SignUpCodeListComponent } from './components/sign-up-code-list/sign-up-code-list.component';
import { SignUpDetailsComponent } from './components/sign-up-details/sign-up-details.component';
import { SignUpCodeMenuComponent } from './components/sign-up-code-menu/sign-up-code-menu.component';
import { PrerequisitiesComponent } from './components/prerequisities/prerequisities.component';
import { SignupCodePaymentProcessingComponent } from './components/signup-code-payment-processing/signup-code-payment-processing.component';
import { ChoiceDetailsComponent } from './components/choice-details/choice-details.component';
import { PledgeStructureComponent } from './components/pledge-structure/pledge-structure.component';
import { ClassCodesComponent } from './components/class-codes/class-codes.component';
import { RegistrationStepsComponent } from './components/registration-steps/registration-steps.component';
import { ChinmayaSharedModule } from 'src/app/modules/chinmaya-shared/chinmaya-shared.module';
const routes: Routes = [
  {
    path: '',
    component: SignUpCodesComponent,
    children: [
      {
        path: 'signup-code-list',
        component: SignUpCodeListComponent,
      },
      {
        path: 'signup-details',
        component: SignUpDetailsComponent,
      },
      {
        path: 'prerequisities',
        component: PrerequisitiesComponent,
      },
      {
        path: 'class-codes',
        component: ClassCodesComponent,
      },
      {
        path: 'pledge-structure',
        component: PledgeStructureComponent,
      },
      {
        path: 'registration-steps',
        component: RegistrationStepsComponent,
      },
      {
        path: 'choice-details',
        component: ChoiceDetailsComponent,
      },
      {
        path: 'payment-processing',
        component: SignupCodePaymentProcessingComponent,
      },
      
       { path: '', redirectTo: 'signup-code-list', pathMatch: 'full' },
      // { path: '**', redirectTo: 'program/configurationDetailsTab', pathMatch: 'full' },
    ],
  },
];



@NgModule({
  declarations: [
    SignUpCodesComponent,
    SignUpDetailsComponent,
    SignUpCodeListComponent,
    SignUpCodeMenuComponent,
    PrerequisitiesComponent,
    SignupCodePaymentProcessingComponent,
    ChoiceDetailsComponent,
    PledgeStructureComponent,
    ClassCodesComponent,
    RegistrationStepsComponent 
  ],
  imports: [
    RouterModule.forChild(routes),
    ChinmayaSharedModule
   
  ],
  exports:[
  ]
})
export class SignUpCodesModule { }
