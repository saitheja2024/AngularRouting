import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFamilyViewHomePageComponent } from './components/search-family-view-home-page/search-family-view-home-page.component';
import { SearchFamilyViewRoutingModule } from './search-family-view-routing.module';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { SearchFamilyViewDetailsComponent } from './components/search-family-view-details/search-family-view-details.component';



@NgModule({
  declarations: [
    SearchFamilyViewHomePageComponent,
    SearchFamilyViewDetailsComponent
  ],
  imports: [
    ChinmayaSharedModule,
    SearchFamilyViewRoutingModule

  ]
})
export class SearchFamilyViewModule { }
