import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path:'family-member',
    loadChildren: () => import('./pages/family-member/family-member.module').then(m => m.FamilyMemberModule)
  },
  {
    path:'create-program',
    loadChildren: () => import('./configuration/create-program/create-program.module').then(m => m.CreateProgramModule)
  },
  {
    path:'search-modify-program',
    loadChildren: () => import('./configuration/search-modify-program/search-modify-program.module').then(m => m.SearchModifyProgramModule)
  },
  {
    path:'view-program',
    loadChildren: () => import('./configuration/view-program/view-program.module').then(m => m.ViewProgramModule)
  },
  {
    path:'role',
    loadChildren: () => import('./configuration/access-management/role/role.module').then(m => m.RoleModule)
  },
  {
    path:'user',
    loadChildren: () => import('./configuration/access-management/user/user.module').then(m => m.UserModule)
  },
  {
    path:'search-role',
    loadChildren: () => import('./configuration/access-management/search-role/search-role.module').then(m => m.SearchRoleModule)
  },
  {
    path:'create-email-template',
    loadChildren: () => import('./configuration/create-email-template/create-email-template.module').then(m => m.CreateEmailTemplateModule)
  },
  {
    path:'installment-payment-email-template',
    loadChildren: () => import('./configuration/installment-payment-email-template/installment-payment-email-template.module').then(m => m.InstallmentPaymentEmailTemplateModule)
  },
  {
    path:'class-rooms',
    loadChildren: () => import('./configuration/class-rooms/class-rooms.module').then(m => m.ClassRoomsModule)
  },
  {
    path:'donation-configuration',
    loadChildren: () => import('./configuration/donation-configuration/donation-configuration.module').then(m => m.DonationConfigurationModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
