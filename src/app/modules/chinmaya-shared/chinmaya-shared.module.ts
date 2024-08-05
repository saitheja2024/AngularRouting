import { NgModule } from '@angular/core';
import { COMPONENTS } from './components/components.index';
import { MODULES } from './module.index';
import { PIPES } from './pipes/pipes.index';


const ALL_MODULES = MODULES;
const ALL_COMPONENTS: any = COMPONENTS;
const ALL_PIPES = PIPES

@NgModule({
  declarations: [...ALL_COMPONENTS,...ALL_PIPES],
  imports: [...ALL_MODULES],
  exports: [...ALL_MODULES, ...COMPONENTS,...ALL_PIPES]
})
export class ChinmayaSharedModule { }