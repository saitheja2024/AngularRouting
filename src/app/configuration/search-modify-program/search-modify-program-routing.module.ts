import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchModifyProgramComponent } from './search-modify-program.component';

const routes: Routes = [
  {
    path:'',
    component: SearchModifyProgramComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchModifyProgramRoutingModule { }
