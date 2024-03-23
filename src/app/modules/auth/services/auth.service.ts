import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription, Subject } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthModel } from '../models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpService, Options } from '../../chinmaya-shared/services/https-service/http-service';
import { UrlService } from '../../chinmaya-shared/services/url/url.service';
import { KEYS, StoreService } from '../../chinmaya-shared/services/store/store.service';

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
 
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;
  loggedInUser:any
  private loggedInUser$: Subject<any> = new Subject();
  loggedInUserSubject: BehaviorSubject<any>;
  private unsubscribe: Subscription[] = [];


  
  

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    private httpService:HttpService,
    private urlService: UrlService,
    private store:StoreService
  ) {
 
  }

  // public methods
  async login(params:any){
    let options: Options = {
      url: this.urlService.authURL.login,
      body: params
    }

    let response: any = await this.httpService.post(options);
    this.store.setValue(KEYS.loggedInUser,response)
    return response;
    
  }


  getLoggedInUser() {
    return this.store.getValue(KEYS.loggedInUser);
  }

  

 


  logout() {
   
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  

  // need create new user then login
  registration(user: UserModel){
   
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
