import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramregistrationComponent } from '../programregistration/programregistration/programregistration.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProgramregistrationComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: ProgramregistrationComponent,
      },
      


      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  declarations: [
    ProgramregistrationComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  
})
export class ProgramregistrationModule { }
