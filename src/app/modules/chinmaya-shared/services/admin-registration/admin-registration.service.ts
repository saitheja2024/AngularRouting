import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';
import { KEYS, StoreService } from '../store/store.service';
import { AuthService } from 'src/app/modules/auth';

@Injectable({
    providedIn: 'root'
  })
  export class AdminregistrationServices {
  
    
    EmailSearchCriteria:any;

    constructor(private httpService:HttpService,
        private urlService:UrlService, 
        private store:StoreService,
        private authService:AuthService) { }

       
      
  getLoggedInUser(){
    return this.authService.getLoggedInUser();
  }

  async fetchEnrolledClassesList(params:any) {
   let url = this.urlService.adminRegistrationURL.fetchEnrolledClassesList;
   url = url.replace("$programCode",params.programCode);
   url = url.replace("$signupCode",params.signupCode);
   let options: Options = {
          url: url,
          body: params
      }
    let response = await this.httpService.post(options);
    return response;
}   
        
         
         

  }