import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProgramComponent } from './view-program.component';

const routes: Routes = [
  {
    path:'',
    component: ViewProgramComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewProgramRoutingModule { }
