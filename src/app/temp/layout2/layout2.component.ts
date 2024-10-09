import { Component } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { FooterComponent } from "../../footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
@Component({
  selector: 'app-layout2',
  standalone: true,
  imports: [SidebarComponent, FooterComponent,RouterOutlet,HeaderComponent],
  templateUrl: './layout2.component.html',
  styleUrl: './layout2.component.css'
})
export class Layout2Component {

}
