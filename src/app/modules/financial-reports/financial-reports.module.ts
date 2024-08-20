import { NgModule } from '@angular/core';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { Route, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FinancialReportsComponent } from './components/financial-reports/financial-reports.component';

const routes:Routes=[
  {
    path: '',
    component: FinancialReportsComponent,
    children: [
      {
        path: '',
        redirectTo: 'financial-reports',
        pathMatch: 'full',
      },
      {
        path:'financial-reports',
        component:FinancialReportsComponent
      },
    ]
  }
]

@NgModule({
  declarations: [FinancialReportsComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    RouterModule.forChild([
      {
        path: '',
        component: FinancialReportsComponent,
      },
    ]),
  ],
})
export class FinancialReportsModule { }
