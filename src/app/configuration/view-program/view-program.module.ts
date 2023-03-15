import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProgramRoutingModule } from './view-program-routing.module';
import { ViewProgramComponent } from './view-program.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ViewProgramComponent
  ],
  imports: [
    CommonModule,
    ViewProgramRoutingModule,
    SharedModule
  ]
})
export class ViewProgramModule { }
