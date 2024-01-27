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
    path: 'search-family-view',
    loadChildren: () =>
      import('../modules/search-family-view/search-family-view.module').then((m) => m.SearchFamilyViewModule),
  },
  {
    path: '',
    redirectTo: 'config',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };