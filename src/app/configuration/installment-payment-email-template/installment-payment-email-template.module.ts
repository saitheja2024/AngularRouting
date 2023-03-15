import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstallmentPaymentEmailTemplateRoutingModule } from './installment-payment-email-template-routing.module';
import { InstallmentPaymentEmailTemplateComponent } from './installment-payment-email-template.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    InstallmentPaymentEmailTemplateComponent
  ],
  imports: [
    CommonModule,
    InstallmentPaymentEmailTemplateRoutingModule,
    SharedModule
  ]
})
export class InstallmentPaymentEmailTemplateModule { }
