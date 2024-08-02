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
import { CreateProgramSignupCodesComponent } from './components/create-program-signup-codes/create-program-signup-codes.component';
import { CreateProgramReviewConfigurationComponent } from './components/create-program-review-configuration/create-program-review-configuration.component';

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
              path:'signup-codes',
              component:CreateProgramSignupCodesComponent
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
    CreateProgramSignupCodesComponent,
    CreateProgramReviewConfigurationComponent
  ],
  imports: [
    ChinmayaSharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ProgramConfigurationModule { }
