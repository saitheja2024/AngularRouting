import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FamilyMemberRoutingModule } from './family-member-routing.module';
import { FamilyMemberComponent } from './family-member.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    FamilyMemberComponent
  ],
  imports: [
    CommonModule,
    FamilyMemberRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class FamilyMemberModule { }
