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
    path: 'registration-processing',
    loadChildren: () =>
      import('../modules/registration-processing/registration-processing.module').then((m) => m.RegistrationProcessingModule),
  },
  {
    path: 'email-processing',
    loadChildren: () =>
      import('../modules/email-processing/email-processing.module').then((m) => m.EmailProcessingModule),
  },
  {
    path: 'payment-adjustment',
    loadChildren: () =>
      import('../modules/adjustment/adjustment.module').then((m) => m.AdjustmentModule),
  },
  {
    path: 'payment-schedule-and-history',
    loadChildren: () =>
      import('../modules/payment-schedule-and-history/payment-schedule-and-history.module').then((m) => m.PaymentScheduleAndHistoryModule),
  },
  {
    path: 'membership-call-worklist',
    loadChildren: () =>
      import('../modules/membership-call-worklist/membership-call-worklist.module').then((m) => m.MembershipCallWorklistModule),
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