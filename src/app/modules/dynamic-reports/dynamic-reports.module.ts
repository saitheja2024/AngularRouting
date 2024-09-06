import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicReportComponent } from './components/dynamic-report/dynamic-report.component';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';

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
      },
    ]
  }
]

@NgModule({
  declarations: [
    DynamicReportComponent
  ],
  imports: [
    ChinmayaSharedModule,
    RouterModule.forChild(routes)
  ]
})
export class DynamicReportsModule { }
