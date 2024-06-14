import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { STATUS_UPDATE_COMPONENTS } from './components/status-update.index';
import { ChinmayaSharedModule } from '../chinmaya-shared/chinmaya-shared.module';
import { StatusUpdateRoutingModule } from './status-update-routing.module';


@NgModule({
  declarations: [
    STATUS_UPDATE_COMPONENTS
  ],
  imports: [
    ChinmayaSharedModule,
    StatusUpdateRoutingModule
  ]
})
export class StatusUpdateModule { }
