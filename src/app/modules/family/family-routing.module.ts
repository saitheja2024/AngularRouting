import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllFamiliesComponent } from './components/all-families/all-families.component';
import { AllFamilyMembersComponent } from './components/all-family-members/all-family-members.component';
import { FamilyComponent } from './components/family/family.component';
import { FamilyMemberDetailsComponent } from './components/family-member-details/family-member-details.component';


const routes: Routes = [
  {
    path: '',
    component: FamilyComponent,
    children: [
      {
        path: '',
        redirectTo: 'allFamilies',
        pathMatch: 'full',
      },
      {
        path: 'allFamilies',
        component: AllFamiliesComponent,
      },
      {
        path: 'allFamilyMembers',
        component: AllFamilyMembersComponent,
      },
      {
        path: 'familyMemberDetails',
        component: FamilyMemberDetailsComponent,
      },
     
     
      { path: '', redirectTo: 'allFamilies', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilyRoutingModule {}
