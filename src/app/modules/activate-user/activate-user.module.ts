import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivateUserComponent } from './components/activate-user/activate-user.component';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ActivateUserComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: ActivateUserComponent,
      },
      


      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
];


@NgModule({
  declarations: [
    ActivateUserComponent
  ],
  imports: [
    CommonModule,
    ChinmayaSharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ActivateUserModule { }
