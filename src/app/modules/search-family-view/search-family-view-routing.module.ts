import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchFamilyViewHomePageComponent } from './components/search-family-view-home-page/search-family-view-home-page.component';
import { SearchFamilyViewDetailsComponent } from './components/search-family-view-details/search-family-view-details.component';


const routes: Routes = [
    {
        path: '',
        component: SearchFamilyViewHomePageComponent
    },
    {
        path: 'details',
        component: SearchFamilyViewDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SearchFamilyViewRoutingModule { }