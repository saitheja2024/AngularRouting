import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationSearchComponent } from './components/registration-search/registration-search.component';
import { RegistrationProcessingHomeComponent } from './components/registration-processing-home/registration-processing-home.component';




const routes: Routes = [
  {
    path: '',
    component: RegistrationProcessingHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'registration-search',
        pathMatch: 'full',
      },
      {
        path: 'registration-search',
        component: RegistrationSearchComponent,
      },


      { path: '', redirectTo: 'registration-search', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationProcessingRoutingModule { }