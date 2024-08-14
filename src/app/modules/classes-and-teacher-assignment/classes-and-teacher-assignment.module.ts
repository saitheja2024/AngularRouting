import { NgModule } from '@angular/core';
import { ClassesAndTeacherAssignementHomeComponent } from './components/classes-and-teacher-assignement-home/classes-and-teacher-assignement-home.component';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import { TeacherTableComponent } from './components/teacher-table/teacher-table.component';
import { TeacherAssignmentDetailsComponent } from './components/teacher-assignment-details/teacher-assignment-details.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ClassesAndTeacherAssignementHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'classess-and-teacher-assignements',
        pathMatch: 'full',
      },
      // {
      //   path: 'email-search',
      //   component: ClassesAndTeacherAssignementHomeComponent,
      // },
     


      { path: '', redirectTo: 'email-search', pathMatch: 'full' },
    ]
  }
];



@NgModule({
  declarations: [
    ClassesAndTeacherAssignementHomeComponent,
    TeacherProfileComponent,
    TeacherTableComponent,
    TeacherAssignmentDetailsComponent
  ],
  imports: [
    ChinmayaSharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ClassesAndTeacherAssignmentModule { }
