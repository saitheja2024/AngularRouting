import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilyComponent } from './components/family/family.component';
import { FamilyMemberDetailsComponent } from './components/family-member-details/family-member-details.component';
import { FamilyListomponent } from './components/family-list/family-list.component';
import { FamilyMemberListComponent } from './components/family-member-list/family-member-list.component';


const routes: Routes = [
  {
    path: '',
    component: FamilyComponent,
    children: [
      {
        path: '',
        redirectTo: 'familyList',
        pathMatch: 'full',
      },
      {
        path: 'familyList',
        component: FamilyListomponent,
      },
      {
        path: 'familyMemberList/:forceFetch',
        component: FamilyMemberListComponent,
      },
      {
        path: 'familyMemberDetails',
        component: FamilyMemberDetailsComponent,
      },


      { path: '', redirectTo: 'familyList', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilyRoutingModule { }