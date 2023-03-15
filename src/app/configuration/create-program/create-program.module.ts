import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProgramRoutingModule } from './create-program-routing.module';
import { CreateProgramComponent } from './create-program.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CreateProgramComponent
  ],
  imports: [
    CommonModule,
    CreateProgramRoutingModule,
    SharedModule
  ]
})
export class CreateProgramModule { }
