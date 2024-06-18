import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { StatusSearchHomeComponent } from './components/status-search-home/status-search-home.component';
import { StatusSearchComponent } from './components/status-search/status-search.component';
import { StatusSearchResultsComponent } from './components/status-search-results/status-search-results.component';
import { SelectionComponent } from './components/selection/selection.component';
import { ReviewComponent } from './components/review/review.component';
import { CompleteComponent } from './components/complete/complete.component';
import { SelectionFamilyregviewComponent } from './components/selection-familyregview/selection-familyregview.component';
import { SelectionFamilyDetailsComponent } from './components/selection-family-details/selection-family-details.component';
import { SelectionFamilysessiondetailsComponent } from './components/selection-familysessiondetails/selection-familysessiondetails.component';
import { SelectionPaymentdetailsComponent } from './components/selection-paymentdetails/selection-paymentdetails.component';

const routes: Routes = [
  {
    path: '',
    component: StatusSearchHomeComponent,
    children: [
      {
        path: 'status-search',
        component: StatusSearchComponent,
      },
      {
        path: 'status-search-results',
        component: StatusSearchResultsComponent,
          children: [
            {
              path:'selection',
              component:SelectionComponent
            },
            {
              path:'review',
              component:ReviewComponent
            },
            {
              path:'complete',
              component:CompleteComponent
            },
            {
              path: '',
              redirectTo: 'selection',
              pathMatch: 'full',
            },
          ]
      },

      { path: '', redirectTo: 'status-search', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  declarations: [
    StatusSearchHomeComponent,
    StatusSearchComponent,
    StatusSearchResultsComponent,
    SelectionComponent,
    ReviewComponent,
    CompleteComponent,
    SelectionFamilyregviewComponent,
    SelectionFamilyDetailsComponent,
    SelectionFamilysessiondetailsComponent,
    SelectionPaymentdetailsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ChinmayaSharedModule,
  ],
  exports: [RouterModule],
})
export class StatusUpdateModule { }
