import { NgModule } from '@angular/core';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { Route, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SafeUrlPipe } from './components/dashboard/safe-url.pipe';

const routes:Routes=[
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'financial-reports',
        pathMatch: 'full',
      },
      {
        path:'financial-reports',
        component:DashboardComponent
      },
    ]
  }
]

@NgModule({
  declarations: [DashboardComponent, 
                 SafeUrlPipe],
  imports: [
    CommonModule,
    ChinmayaSharedModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
  ],
})
export class ReportsDashboardModule { }
