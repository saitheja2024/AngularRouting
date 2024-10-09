import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { LayoutComponent2 } from "./layout/layout.component";
import { Layout2Component } from './temp/layout2/layout2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Layout2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mtronic-Angular';
}
