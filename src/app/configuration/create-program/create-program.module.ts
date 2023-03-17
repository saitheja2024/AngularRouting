import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CreateProgramModule { }
