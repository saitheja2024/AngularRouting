import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicReportComponent } from './components/dynamic-report/dynamic-report.component';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
const routes:Routes=[
  {
    path: '',
    component: DynamicReportComponent,
    children: [
      {
        path: '',
        redirectTo: 'dynamic-reports',
        pathMatch: 'full',
      },
      {
        path:'dynamic-reports',
        component:DynamicReportComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    DynamicReportComponent
  ],
  imports: [
    ChinmayaSharedModule,
    RouterModule.forChild(routes),
    MatSelectModule,
    MatCheckboxModule,
    MatOptionModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule

  ]
})
export class DynamicReportsModule { }
