import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationSearchComponent } from './components/registration-search/registration-search.component';
import { RegistrationProcessingHomeComponent } from './components/registration-processing-home/registration-processing-home.component';
import { RegistrationSearchResultsComponent } from './components/registration-search-results/registration-search-results.component';
import { FamilyRegistrationDetailsComponent } from './components/family-registration-details/family-registration-details.component';




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
      {
        path: 'registration-search-results',
        component: RegistrationSearchResultsComponent,
      },
      {
        path: "family-registration-details",
        component: FamilyRegistrationDetailsComponent,
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