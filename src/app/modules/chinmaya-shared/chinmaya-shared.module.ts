import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToastComponent } from './components/toast/toast.component';
import { ModalsModule } from 'src/app/_metronic/partials';
import { RouterModule } from '@angular/router';


const MODULES = [CommonModule, FormsModule,ReactiveFormsModule, HttpClientModule,ModalsModule]
const COMPONENTS:any = [SpinnerComponent,ToastComponent]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports:[...MODULES,...COMPONENTS]
})
export class ChinmayaSharedModule { }
