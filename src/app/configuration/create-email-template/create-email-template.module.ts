import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateEmailTemplateRoutingModule } from './create-email-template-routing.module';
import { CreateEmailTemplateComponent } from './create-email-template.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CreateEmailTemplateComponent
  ],
  imports: [
    CommonModule,
    CreateEmailTemplateRoutingModule,
    SharedModule
  ]
})
export class CreateEmailTemplateModule { }
