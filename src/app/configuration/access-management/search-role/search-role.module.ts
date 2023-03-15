import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoleRoutingModule } from './search-role-routing.module';
import { SearchRoleComponent } from './search-role.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SearchRoleComponent
  ],
  imports: [
    CommonModule,
    SearchRoleRoutingModule,
    SharedModule
  ]
})
export class SearchRoleModule { }
