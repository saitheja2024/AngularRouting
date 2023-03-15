import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    SharedModule
  ]
})
export class ClassRoomsModule { }
