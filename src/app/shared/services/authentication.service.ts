import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 environment: any;
 

  constructor(private http: HttpClient ) {
    const environment = {
      baseUrl:"https://nonregqa.cmwrcregistration.org"
  };
  
    this.environment = environment;
   }

  login(body:any): Observable<any>{
    return this.http.post(`${this.environment.baseUrl}/MR/login/validateLogin`, body);
  }

  getFamilyDetails(body:any): Observable<any>{
    
    return this.http.post(`${this.environment.baseUrl}/MR/manageFamily/manageFamilySearch`, body);
   
  }

  searchFamilyMember(body:any): Observable<any>{
    return this.http.post(`${this.environment.baseUrl}/MR/manageFamily/manageFamilySearch`, body);
  }
}
