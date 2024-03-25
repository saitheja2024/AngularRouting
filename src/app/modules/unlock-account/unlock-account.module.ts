import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnlockAcounntHomeComponent } from './components/unlock-acounnt-home/unlock-acounnt-home.component';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: UnlockAcounntHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: UnlockAcounntHomeComponent,
      },
      


      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
];


@NgModule({
  declarations: [
    UnlockAcounntHomeComponent
  ],
  imports: [
    ChinmayaSharedModule,
    RouterModule.forChild(routes)
  
  ]
})
export class UnlockAccountModule { }
