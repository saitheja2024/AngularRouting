import { NgModule } from '@angular/core';
import { EmailHomeComponent } from './components/email-home/email-home.component';
import { RouterModule, Routes } from '@angular/router';
import { EmailSearchComponent } from './components/email-search/email-search.component';
import { EmailSearchResultsComponent } from './components/email-search-results/email-search-results.component';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
const routes: Routes = [
  {
    path: '',
    component: EmailHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'email-search',
        pathMatch: 'full',
      },
      {
        path: 'email-search',
        component: EmailSearchComponent,
      },
      {
        path: 'email-search-results',
        component: EmailSearchResultsComponent,
      },


      { path: '', redirectTo: 'email-search', pathMatch: 'full' },
    ]
  }
];


@NgModule({
  declarations: [
    EmailHomeComponent,
    EmailSearchComponent,
    EmailSearchResultsComponent
  ],
  imports: [
    ChinmayaSharedModule,
    RouterModule.forChild(routes)
   
  ]
})
export class EmailProcessingModule { }
