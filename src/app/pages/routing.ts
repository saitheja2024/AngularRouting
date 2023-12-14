import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
 
  {
    path: 'config',
    loadChildren: () =>
      import('../modules/program/program.module').then((m) => m.ProgramModule),
  },
  {
    path: 'family',
    loadChildren: () =>
      import('../modules/family/family.module').then((m) => m.FamilyModule),
  },
  {
    path: '',
    redirectTo: 'family', 
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
