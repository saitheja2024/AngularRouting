import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyMemberRoutingModule } from './family-member-routing.module';
import { FamilyMemberComponent } from './family-member.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FamilyMemberComponent
  ],
  imports: [
    CommonModule,
    FamilyMemberRoutingModule,
    SharedModule
  ]
})
export class FamilyMemberModule { }
