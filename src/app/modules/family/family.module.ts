import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { FamilyRoutingModule } from './family-routing.module';
import { FamilyComponent } from './components/family/family.component';



@NgModule({
  declarations: [FamilyComponent],
  imports: [
    FamilyRoutingModule,
    ChinmayaSharedModule
  ]
})
export class FamilyModule { }
