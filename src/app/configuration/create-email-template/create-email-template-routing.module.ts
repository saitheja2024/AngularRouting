import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmailTemplateComponent } from './create-email-template.component';

const routes: Routes = [
  {
    path:'',
    component: CreateEmailTemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEmailTemplateRoutingModule { }
