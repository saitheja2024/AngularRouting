import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
    SharedModule,
    ReactiveFormsModule
  ]
})
export class SearchRoleModule { }
