import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusSearchHomeComponent } from './components/status-search-home/status-search-home.component';
import { StatusSearchComponent } from './components/status-search/status-search.component';
import { StatusSearchResultsComponent } from './components/status-search-results/status-search-results.component';
import { ReviewComponent } from './components/review/review.component';
import { CompleteComponent } from './components/complete/complete.component';

const routes: Routes = [
  {
    path: '',
    component: StatusSearchHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'status-search',
        pathMatch: 'full',
      },
      {
        path: 'status-search',
        component: StatusSearchComponent,
      },
      {
        path: 'status-search-results',
        component: StatusSearchResultsComponent,
          children: [
            {
              path: '',
              redirectTo: 'selection',
              pathMatch: 'full',
            },
            {
              path:'reveiw',
              component:ReviewComponent
            },
            {
              path:'complete',
              component:CompleteComponent
            }
          ]
      },

      { path: '', redirectTo: 'status-search', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatusUpdateRoutingModule { }
