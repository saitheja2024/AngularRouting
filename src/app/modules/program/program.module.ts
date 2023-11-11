import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramDetailsComponent } from './components/program-details/program-details.component';
// import { SharedModule  } from '../../_metronic/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ConfigDetailsComponent } from './components/config-details/config-details.component';
import { ProgramComponent } from './program.component';
import { RegistrationStepsComponent } from './components/registration-steps/registration-steps.component';
import { SignuUpCodesComponent } from './components/signu-up-codes/signu-up-codes.component';
import { ReviewConfigurationComponent } from './components/review-configuration/review-configuration.component';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';

const routes: Routes = [
  {
    path: '',
    component: ProgramComponent,
    children: [
      {
        path: 'program/configurationDetailsTab',
        component: ConfigDetailsComponent,
      },
      {
        path: 'program/programDetailsTab',
        component: ProgramDetailsComponent,
      },
      {
        path: 'program/registrationStepsTab',
        component: RegistrationStepsComponent,
      },
      {
        path: 'program/reviewConfigurationTab',
        component: ReviewConfigurationComponent,
      },
      {
        path: 'program/signupCodeTab',
        component: SignuUpCodesComponent,
      },
       { path: '', redirectTo: 'program/configurationDetailsTab', pathMatch: 'full' },
      // { path: '**', redirectTo: 'program/configurationDetailsTab', pathMatch: 'full' },
    ],
  },
];


@NgModule({
  declarations: [
    ProgramDetailsComponent,
    ConfigDetailsComponent,
    ProgramComponent,
    RegistrationStepsComponent,
    SignuUpCodesComponent,
    ReviewConfigurationComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ChinmayaSharedModule

  ]
})
export class ProgramModule { }
