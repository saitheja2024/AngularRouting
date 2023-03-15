import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonationConfigurationComponent } from './donation-configuration.component';

const routes: Routes = [
  {
    path:'',
    component: DonationConfigurationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationConfigurationRoutingModule { }
