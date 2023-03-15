import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchRoleComponent } from './search-role.component';

const routes: Routes = [
  {
    path:'',
    component: SearchRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoleRoutingModule { }
