import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProgramConfigHomeComponent } from './components/program-config-home/program-config-home.component';
import { ClassesAndTeacherAssignmentsComponent } from './components/classes-and-teacher-assignments/classes-and-teacher-assignments.component';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import { TeacherTableComponent } from './components/teacher-table/teacher-table.component';
import { TeacherAssignmentDetailsComponent } from './components/teacher-assignment-details/teacher-assignment-details.component';

const routes: Routes = [
  {
    path: '',
    component: ProgramConfigHomeComponent,
    children: [
      {
        path: 'classes-and-teacher-assignments',
        component: ClassesAndTeacherAssignmentsComponent,
      },
      {
        path: 'classes-and-teacher-assignments/teacher-assignment-details',
        component: TeacherAssignmentDetailsComponent,
      },
      { path: '', redirectTo: 'classes-and-teacher-assignments', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  declarations: [
    ProgramConfigHomeComponent,
    ClassesAndTeacherAssignmentsComponent,
    TeacherProfileComponent,
    TeacherTableComponent,
    TeacherAssignmentDetailsComponent
  ],
  imports: [
    ChinmayaSharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ProgramConfigurationModule { }
