import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


const MODULES = [CommonModule, FormsModule,ReactiveFormsModule, HttpClientModule]
const COMPONENTS:any = []

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports:[...MODULES,...COMPONENTS]
})
export class SharedModule { }
