import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { RouterModule, Routes } from '@angular/router';
import { RoleAccessHomeComponent } from './components/role-access-home/role-access-home.component';
import { ScreenLookupComponent } from './components/screen-lookup/screen-lookup.component';
import { RolesLookupComponent } from './components/roles-lookup/roles-lookup.component';
import { AssignRoleComponent } from './components/assign-role/assign-role.component';
import { ScreenAccessComponent } from './components/screen-access/screen-access.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const routes: Routes = [
  {
    path: '',
    component: RoleAccessHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'role-access',
        pathMatch: 'full',
      },
      {
        path: 'screen-lookup',
        component: ScreenLookupComponent,
      },
      {
        path: 'roles-lookup',
        component: RolesLookupComponent,
      },
      {
        path: 'assign-role',
        component: AssignRoleComponent,
      },
      {
        path: 'screen-access',
        component: ScreenAccessComponent,
      },
      { path: '', redirectTo: 'role-access', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  declarations: [
    RoleAccessHomeComponent,
    ScreenLookupComponent,
    RolesLookupComponent,
    AssignRoleComponent,
    ScreenAccessComponent
  ],
  imports: [
    MatSelectModule,
    MatOptionModule,
    CommonModule,
    ChinmayaSharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class RoleAccessModule { }
