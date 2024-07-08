import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProgramConfigHomeComponent } from './components/program-config-home/program-config-home.component';
import { ClassesAndTeacherAssignmentsComponent } from './components/classes-and-teacher-assignments/classes-and-teacher-assignments.component';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';

const routes: Routes = [
  {
    path: '',
    component: ProgramConfigHomeComponent,
    children: [
      {
        path: 'classes-and-teacher-assignments',
        component: ClassesAndTeacherAssignmentsComponent,
      },

      { path: '', redirectTo: 'classes-and-teacher-assignments', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  declarations: [
    ProgramConfigHomeComponent,
    ClassesAndTeacherAssignmentsComponent
  ],
  imports: [
    ChinmayaSharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ProgramConfigurationModule { }
