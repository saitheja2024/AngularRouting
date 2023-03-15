import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassRoomsComponent } from './class-rooms.component';

const routes: Routes = [
  {
    path:'',
    component: ClassRoomsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoomsRoutingModule { }
