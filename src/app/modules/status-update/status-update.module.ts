import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { STATUS_UPDATE_COMPONENTS } from './components/status-update.index';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { StatusUpdateRoutingModule } from './status-update-routing.module';
import { StatusSearchHomeComponent } from './components/status-search-home/status-search-home.component';
import { SelectionComponent } from './components/selection/selection.component';
import { ReviewComponent } from './components/review/review.component';
import { CompleteComponent } from './components/complete/complete.component';


@NgModule({
  declarations: [
    STATUS_UPDATE_COMPONENTS,
    SelectionComponent,
    ReviewComponent,
    CompleteComponent
  ],
  imports: [
    ChinmayaSharedModule,
    StatusUpdateRoutingModule
  ]
})
export class StatusUpdateModule { }
