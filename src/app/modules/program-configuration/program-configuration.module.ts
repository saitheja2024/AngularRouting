import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProgramConfigHomeComponent } from './components/program-config-home/program-config-home.component';
import { ClassesAndTeacherAssignmentsComponent } from './components/classes-and-teacher-assignments/classes-and-teacher-assignments.component';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import { TeacherTableComponent } from './components/teacher-table/teacher-table.component';
import { TeacherAssignmentDetailsComponent } from './components/teacher-assignment-details/teacher-assignment-details.component';
import { CreateProgramComponent } from './components/create-program/create-program.component';
import { CreateProgramConfigurationDetailsComponent } from './components/create-program-configuration-details/create-program-configuration-details.component';
import { CreateProgramProgramDetailsComponent } from './components/create-program-program-details/create-program-program-details.component';
import { CreateProgramRegistrationStepsComponent } from './components/create-program-registration-steps/create-program-registration-steps.component';

import { CreateProgramSignupCodesComponent } from './components/create-program-signupcodes/create-program-signup-codes/create-program-signup-codes.component';
import { CreateProgramSignupCodesHomeComponent } from './components/create-program-signupcodes/create-program-signup-codes-home/create-program-signup-codes-home.component';
import { CreateProgramSignupCodeDetailsComponent } from './components/create-program-signupcodes/create-program-signup-code-details/create-program-signup-code-details.component';

import { CreateProgramReviewConfigurationComponent } from './components/create-program-review-configuration/create-program-review-configuration.component';
import { CreateProgramAdditionalCustomFieldsComponent } from './components/create-program-additional-custom-fields/create-program-additional-custom-fields.component';
import { CreateProgramSevaQuestionsComponent } from './components/create-program-seva-questions/create-program-seva-questions.component';
import { CreateProgramRegStepsEmailComponent } from './components/create-program-reg-steps-email/create-program-reg-steps-email.component';
import { MatTabsModule } from '@angular/material/tabs';

import { SignupCodeDetailsComponent } from './components/create-program-signupcodes/create-program-signup-code-details/components/signup-code-details/signup-code-details.component';
import { PreRequisitesComponent } from './components/create-program-signupcodes/create-program-signup-code-details/components/pre-requisites/pre-requisites.component';
import { PaymentProcessingComponent } from './components/create-program-signupcodes/create-program-signup-code-details/components/payment-processing/payment-processing.component';
import { ChoiceDetailsComponent } from './components/create-program-signupcodes/create-program-signup-code-details/components/choice-details/choice-details.component';
import { PledgeStructureComponent } from './components/create-program-signupcodes/create-program-signup-code-details/components/pledge-structure/pledge-structure.component';
import { ClassCodesComponent } from './components/create-program-signupcodes/create-program-signup-code-details/components/class-codes/class-codes.component';
import { RegistrationStepsComponent } from './components/create-program-signupcodes/create-program-signup-code-details/components/registration-steps/registration-steps.component';

import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ProgramConfigHomeComponent,
    children: [
      {
        path: 'create-program',
        component: CreateProgramComponent,
          children: [
            {
              path:'configuration',
              component:CreateProgramConfigurationDetailsComponent
            },
            {
              path:'program-details',
              component:CreateProgramProgramDetailsComponent
            },
            {
              path:'registration-steps',
              component:CreateProgramRegistrationStepsComponent
            },
            {
              path:'',
              component:CreateProgramSignupCodesHomeComponent,
              children: [
                {
                  path: 'signup-codes',
                  component: CreateProgramSignupCodesComponent,
                },
                {
                  path: 'signup-codes/signup-code-details',
                  component: CreateProgramSignupCodeDetailsComponent,
                  children:[{
                    path: 'signup-code-details',
                    component: SignupCodeDetailsComponent,
                    },
                    {
                      path:'pre-requisites',
                      component:PreRequisitesComponent
                    },
                    {
                      path:'payment-processing',
                      component:PaymentProcessingComponent
                    },
                    {
                      path:'choice-details',
                      component:ChoiceDetailsComponent
                    },
                    {
                      path:'pledge-structure',
                      component:PledgeStructureComponent
                    },
                    {
                      path:'class-codes',
                      component:ClassCodesComponent
                    },
                    {
                      path:'registration-steps',
                      component:RegistrationStepsComponent
                    },
                    {
                      path:"",
                      redirectTo:"recent-payment",
                      pathMatch:"full"
                    }]
                },
      
                { path: '', redirectTo: 'signup-code-details', pathMatch: 'full' }
              ]
            },
            {
              path:'review-configuration',
              component:CreateProgramReviewConfigurationComponent
            },
            {
              path: '',
              redirectTo: 'configuration',
              pathMatch: 'full',
            },
          ]
      },
      {
        path: 'classes-and-teacher-assignments',
        component: ClassesAndTeacherAssignmentsComponent,
      },
      {
        path: 'classes-and-teacher-assignments/teacher-assignment-details',
        component: TeacherAssignmentDetailsComponent,
      },
      { path: '', redirectTo: 'create-program', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  declarations: [
    ProgramConfigHomeComponent,
    ClassesAndTeacherAssignmentsComponent,
    TeacherProfileComponent,
    TeacherTableComponent,
    TeacherAssignmentDetailsComponent,
    CreateProgramComponent,
    CreateProgramConfigurationDetailsComponent,
    CreateProgramProgramDetailsComponent,
    CreateProgramRegistrationStepsComponent,
    CreateProgramSignupCodesHomeComponent,
    CreateProgramSignupCodesComponent,
    CreateProgramSignupCodeDetailsComponent,
    CreateProgramReviewConfigurationComponent,
    CreateProgramAdditionalCustomFieldsComponent,
    CreateProgramSevaQuestionsComponent,
    CreateProgramRegStepsEmailComponent,
    SignupCodeDetailsComponent,
    PreRequisitesComponent,
    PaymentProcessingComponent,
    ChoiceDetailsComponent,
    PledgeStructureComponent,
    ClassCodesComponent,
    RegistrationStepsComponent
  ],
  imports: [
    FormsModule,
    ChinmayaSharedModule,
    CommonModule,
    MatTabsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ProgramConfigurationModule { }
