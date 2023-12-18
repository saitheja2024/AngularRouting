import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { FamilyRoutingModule } from './family-routing.module';
import { FamilyComponent } from './components/family/family.component';
import { AllFamilyMembersComponent } from './components/all-family-members/all-family-members.component';
import { AllFamiliesComponent } from './components/all-families/all-families.component';



@NgModule({
  declarations: [FamilyComponent,AllFamiliesComponent,AllFamilyMembersComponent],
  imports: [
    FamilyRoutingModule,
    ChinmayaSharedModule
  ]
})
export class FamilyModule { }
