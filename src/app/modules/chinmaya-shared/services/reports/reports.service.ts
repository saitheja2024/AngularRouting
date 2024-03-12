import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  
  programYears: any;
  signupCodes: never[];

  constructor(private httpService:HttpService,private urlService:UrlService) { }

  async fetchProgramYears(programCode:any,reload?:any){
      let options:Options={
        url: this.urlService.reportsURL.fetchProgramYears,
        body: {code:programCode}
      }

      if(!reload && this.programYears){
        return this.programYears;
      }

      this.programYears=[];
      let programYears:any = await this.httpService.post(options);
      if(programYears && programYears.selectDropdownList){
        this.programYears=programYears.selectDropdownList;
        
      }
      return this.programYears;
  }


  async fetchSignupcode(orgCode:any,programCode:any,reload?:any){
    let options:Options={
      url: this.urlService.reportsURL.fetchSignupcodes,
      body: {organizationCode:orgCode,programCode:programCode}
    }

    if(!reload && this.signupCodes){
      return this.signupCodes;
    }

    this.signupCodes=[];
    let signupCodes:any = await this.httpService.post(options);
    if(signupCodes && signupCodes.selectDropdownList){
      this.signupCodes=signupCodes.selectDropdownList;
      
    }
    return this.signupCodes;
}

  

  
}
