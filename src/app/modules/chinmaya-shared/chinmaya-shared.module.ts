import { NgModule } from '@angular/core';
import { COMPONENTS } from './components/components.index';
import { MODULES } from './module.index';


const ALL_MODULES = MODULES;
const ALL_COMPONENTS: any = COMPONENTS;

@NgModule({
  declarations: [...ALL_COMPONENTS],
  imports: [...ALL_MODULES],
  exports: [...ALL_MODULES, ...COMPONENTS]
})
export class ChinmayaSharedModule { }
