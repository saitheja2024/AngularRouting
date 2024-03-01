import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentScheduleAndHisotryHomeComponent } from './components/payment-schedule-and-hisotry-home/payment-schedule-and-hisotry-home.component';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PaymentScheduleAndHisotryHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: PaymentScheduleAndHisotryHomeComponent,
      },
      


      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  declarations: [
    PaymentScheduleAndHisotryHomeComponent
  ],
  imports: [
    ChinmayaSharedModule,
    RouterModule.forChild(routes)
  ],
  
})
export class PaymentScheduleAndHistoryModule { }
