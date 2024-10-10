import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { ContentComponent } from './content/content.component';
import { Layout2Component } from './temp/layout2/layout2.component';
import { Child1Component } from './child1/child1.component';
import { Child2Component } from './child2/child2.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { Child3Component } from './child3/child3.component';

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
  path:'child3',
  component:Child3Component
},
{
  path:"about",
  loadComponent:()=>
    import('./about/about.component').then((mod) => mod.AboutComponent)
},
{
  path:"contactus",
  loadComponent:()=>
    import("./contactus/contactus.component").then((mod)=>mod.ContactusComponent)
},
{
  path:'',
  component:LoginComponent
},
{
  path:'login',
  component:LoginComponent
},
{
  path:'signup',
  component:SignupComponent
},
{
  path:'forgot',
  component:ForgotPasswordComponent
}
];

