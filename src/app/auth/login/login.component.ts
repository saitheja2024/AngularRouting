import { Component } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterLink,RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  temp:any;
  username:any;
  password:any;
  constructor(private router:Router){}

  login(){
console.log("the user name is: "+this.username);
console.log("the password is: "+this.password);
  this.router.navigate(['/child1']);
}
}
