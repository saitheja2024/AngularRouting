import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipCallWorklistHomeComponent } from './components/membership-call-worklist-home/membership-call-worklist-home.component';
import { RouterModule, Routes } from '@angular/router';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { MembershipCallDetailsComponent } from './components/membership-call-details/membership-call-details.component';


const routes: Routes = [
  {
    path: '',
    component: MembershipCallWorklistHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: MembershipCallWorklistHomeComponent,
      },
      


      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  declarations: [
    MembershipCallWorklistHomeComponent,
    MembershipCallDetailsComponent
  ],
  imports: [
    ChinmayaSharedModule,
    RouterModule.forChild(routes)

  ]
})
export class MembershipCallWorklistModule { }
