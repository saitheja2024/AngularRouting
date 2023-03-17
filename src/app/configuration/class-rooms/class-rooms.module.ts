import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClassRoomsRoutingModule } from './class-rooms-routing.module';
import { ClassRoomsComponent } from './class-rooms.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ClassRoomsComponent
  ],
  imports: [
    CommonModule,
    ClassRoomsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ClassRoomsModule { }
