import { NgModule } from '@angular/core';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { FamilyRoutingModule } from './family-routing.module';
import { FAMILY_COMPONENTS } from './components/family.components.index';



@NgModule({
  declarations: [FAMILY_COMPONENTS],
  imports: [
    FamilyRoutingModule,
    ChinmayaSharedModule
  ]
})
export class FamilyModule { }
