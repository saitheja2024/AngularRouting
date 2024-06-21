import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { SelectionComponent } from './components/selection/selection.component';
import { ReviewComponent } from './components/review/review.component';
import { CompleteComponent } from './components/complete/complete.component';
import { SubclasAssignHomeComponent } from './components/subclas-assign-home/subclas-assign-home.component';
import { SubclassAssignSearchComponent } from './components/subclass-assign-search/subclass-assign-search.component';
import { SubclassAssignSearchResultsComponent } from './components/subclass-assign-search-results/subclass-assign-search-results.component';
import { SelectionFamilyDetailsComponent } from './components/selection-family-details/selection-family-details.component';
import { SelectionFamilyregviewComponent } from './components/selection-familyregview/selection-familyregview.component';
import { SelectionFamilysessiondetailsComponent } from './components/selection-familysessiondetails/selection-familysessiondetails.component';
import { SelectionPaymentdetailsComponent } from './components/selection-paymentdetails/selection-paymentdetails.component';

const routes: Routes = [
  {
    path: '',
    component: SubclasAssignHomeComponent,
    children: [
      {
        path: 'subclass-assign-search',
        component: SubclassAssignSearchComponent,
      },
      {
        path: 'subclass-assign-search-results',
        component: SubclassAssignSearchResultsComponent,
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

      { path: '', redirectTo: 'subclass-assign-search', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  declarations: [
    SelectionComponent,
    ReviewComponent,
    CompleteComponent,
    SubclasAssignHomeComponent,
    SubclassAssignSearchComponent,
    SubclassAssignSearchResultsComponent,
    SelectionFamilyDetailsComponent,
    SelectionFamilyregviewComponent,
    SelectionFamilysessiondetailsComponent,
    SelectionPaymentdetailsComponent
  ],

  imports: [
    RouterModule.forChild(routes),
    ChinmayaSharedModule,
  ],
  exports: [RouterModule],
})
export class SubClassAssignmentModule { }
