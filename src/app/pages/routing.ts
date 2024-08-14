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
    path: 'status-update',
    loadChildren: () =>
      import('../modules/status-update/status-update.module').then((m) => m.StatusUpdateModule),
  },
  {
    path: 'sub-class-assignment',
    loadChildren: () =>
      import('../modules/sub-class-assignment/sub-class-assignment.module').then((m) => m.SubClassAssignmentModule),
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
    path: 'unlock-account',
    loadChildren: () =>
      import('../modules/unlock-account/unlock-account.module').then((m) => m.UnlockAccountModule),
  },
  {
    path: 'activate-user',
    loadChildren: () =>
      import('../modules/activate-user/activate-user.module').then((m) => m.ActivateUserModule),
  },
  {
    path: 'programregistration',
    loadChildren: () =>
      import('../modules/programregistration/programregistration.module').then((m) => m.ProgramregistrationModule),
  },
  {
    path: 'program-configuration',
    loadChildren: () =>
      import('../modules/program-configuration/program-configuration.module').then((m) => m.ProgramConfigurationModule),
  },
  {
    path: 'student-attendance',
    loadChildren: () =>
      import('../modules/student-attendance/student-attendance.module').then((m) => m.StudentAttendanceModule),
  },
  {
    path: 'classess-and-teacher-assignements',
    loadChildren: () =>
      import('../modules/classes-and-teacher-assignment/classes-and-teacher-assignment.module').then((m) => m.ClassesAndTeacherAssignmentModule),
  },
  {
    path: '',
    redirectTo: 'registration-processing',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };