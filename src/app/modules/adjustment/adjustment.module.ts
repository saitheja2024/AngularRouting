import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdjustmentHomeComponent } from './components/adjustment-home/adjustment-home.component';
import { ApplyAdjustmentComponent } from './components/apply-adjustment/apply-adjustment.component';
import { RouterModule, Routes } from '@angular/router';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';


const routes: Routes = [
  {
    path: '',
    component: AdjustmentHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'apply-adjustment',
        pathMatch: 'full',
      },
      {
        path: 'apply-adjustment',
        component: ApplyAdjustmentComponent,
      },
      { path: '', redirectTo: 'apply-adjustment', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  declarations: [
    AdjustmentHomeComponent,
    ApplyAdjustmentComponent
  ],
  imports: [
    ChinmayaSharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AdjustmentModule { }
