import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription, Subject } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../../../auth/models/user.model';
import { AuthModel } from '../../../auth/models/auth.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';
import { KEYS, StoreService } from '../store/store.service';

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
    response.username=params.username;
    response.password=params.password;
    let loggedInUser = KEYS.loggedInUser;
    console.log(loggedInUser);
    console.log('---test---');
    this.store.setValue(loggedInUser,response);
    sessionStorage.setItem('profileData', JSON.stringify(response));
    
    return response;
    
  }


  getLoggedInUser() {
    let logUser = KEYS.loggedInUser;
    return this.store.getValue(logUser);
  }

  async fetchMenutItems(personId: any) {
    let options: Options = {
      url: this.urlService.registrationProcessingURL.fetchModulesByPersonId,
      body: personId
    }

    let response: any = await this.httpService.post(options);

  
    if(response && response.responseScreenModuleList){
      this.store.setValue(KEYS.MenutItems,this.extractDescriptionsGroupedByChapterCode(response))
    }
  }

  

 


  logout() {
   
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
    sessionStorage.removeItem('profileData');
  }

  

  // need create new user then login
  registration(user: UserModel){
   
  }

  forgotPassword(email: string) {
   return null;
  }

  

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
