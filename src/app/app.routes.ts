import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { ContentComponent } from './content/content.component';
import { Layout2Component } from './temp/layout2/layout2.component';
import { Child1Component } from './child1/child1.component';
import { Child2Component } from './child2/child2.component';

export const routes: Routes = [

{
  path:'head',
  component:HeaderComponent
},
{
  path:'sidebar',
  component:SidebarComponent
},
{
path:'footer',
component:FooterComponent
},
{
  path:'layout',
  component:LayoutComponent
},
{
  path:'content',
  component:ContentComponent
},
{
  path:'layout2',
  component:Layout2Component
},
{
  path:'child1',
  component:Child1Component
},
{
  path:'child2',
  component:Child2Component
},
{
  path:'',
  component:Layout2Component
},
];
