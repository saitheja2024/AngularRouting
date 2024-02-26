import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationProcessingComponent } from './registration-processing.component';

const routes: Routes = [{ path: '', component: RegistrationProcessingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationProcessingRoutingModule { }
