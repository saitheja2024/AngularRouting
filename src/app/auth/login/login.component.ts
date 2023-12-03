import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(public fb: FormBuilder, public authService: AuthenticationService, public router: Router){
    this.loginForm = this.fb.group({
      username:['', Validators.required],
      password: ['', Validators.required],
      admin: false
    });
  }
  ngOnInit(){
    
  }

  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm);
      this.router.navigate(['/family-member'])
      // this.authService.login(this.loginForm.value).pipe().subscribe((res:any) =>{
      //   if (res){
      //     localStorage.setItem('token', JSON.stringify(res))
      //     this.router.navigate(['/family-member'])
      //   }
      // });
        
    }
  }
}
