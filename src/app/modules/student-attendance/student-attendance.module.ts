import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { RouterModule, Routes } from '@angular/router';
import { StudentAttendanceComponent } from './components/student-attendance/student-attendance.component';

const routes: Routes = [
  {
    path: '',
    component: StudentAttendanceComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: StudentAttendanceComponent,
      },
      


      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  declarations: [
    StudentAttendanceComponent
  ],
  imports: [
    CommonModule,
    ChinmayaSharedModule,
    RouterModule.forChild(routes)
  ]
})
export class StudentAttendanceModule { }
