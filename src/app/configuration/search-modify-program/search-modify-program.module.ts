import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchModifyProgramRoutingModule } from './search-modify-program-routing.module';
import { SearchModifyProgramComponent } from './search-modify-program.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SearchModifyProgramComponent
  ],
  imports: [
    CommonModule,
    SearchModifyProgramRoutingModule,
    SharedModule
  ]
})
export class SearchModifyProgramModule { }
