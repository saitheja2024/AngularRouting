import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstallmentPaymentEmailTemplateComponent } from './installment-payment-email-template.component';

const routes: Routes = [
  {
    path:'',
    component: InstallmentPaymentEmailTemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstallmentPaymentEmailTemplateRoutingModule { }
