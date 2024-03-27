import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../../chinmaya-shared/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  defaultAuth: any = {
    username: '',
    password: '',
  };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  loggedInUser:any

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  userName: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // redirect to home if already logged in
    // if (this.authService.getLoggedInUser()) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    
    this.loggedInUser=this.authService.getLoggedInUser()
    // if(this.loggedInUser){
    //   this.defaultAuth.username="nmohamme12345";
    //   this.defaultAuth.password="123456"
    // }
    this.initForm();

    if(this.loggedInUser){
      this.onLogin(false);
    }
    
  

    
   
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: [
        '',
        Validators.compose([
          Validators.required
          
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required
         
        ]),
      ],
    });
  }
 
  async onLogin(loginFromAdminPortal:any) {
    this.hasError = false;
    var loginParam = this.loginForm.value;
    if(loginFromAdminPortal){
      loginParam.password=  window.btoa(loginParam.password);
    }
    const user = await this.authService.login(loginParam);
    this.router.navigateByUrl("")
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
