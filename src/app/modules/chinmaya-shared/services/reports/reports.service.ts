import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';
import { signupCodeRequestInteface } from '../master/master-interface';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  
  
  
  programYears: any;
  signupCodes: any[];
  classList: any[]=[];
  sessionChoice: any[]=[];

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


  async fetchSignupcode(params:signupCodeRequestInteface){
    let options:Options={
      url: this.urlService.reportsURL.fetchSignupcodes,
      body: params
    }

  

    this.signupCodes=[];
    let signupCodes:any = await this.httpService.post(options);
    if(signupCodes && signupCodes.selectDropdownList){
      this.signupCodes=signupCodes.selectDropdownList;
      
    }
    return this.signupCodes;
}

async fetchClassList(params:any, reload?: any) {
  let options: Options = {
      url: this.urlService.reportsURL.fetchClassList,
      body: params
  }

  
  this.classList = [];
  let classList: any = await this.httpService.post(options);
  if (classList && classList.selectDropdownList) {
      this.classList = classList.selectDropdownList;
  }
  
  return this.classList;
}

async fetchSessionChoicesDropdown(params:any){
  let options: Options = {
    url: this.urlService.reportsURL.fetchSessionChoicesDropdown,
    body: params
}


let classList:any
let classListResp: any = await this.httpService.post(options);
if (classListResp && classListResp.selectDropdownList) {
  classList = classListResp.selectDropdownList;
}

return classList;
}



async fetchSessionChoice(params:any, reload?: any) {
  let options: Options = {
      url: this.urlService.reportsURL.fetchSessionChoicesList,
      body: params
  }

  
  this.sessionChoice = [];
  let sessionChoice: any = await this.httpService.post(options);
  if (sessionChoice && sessionChoice.selectDropdownList) {
      this.sessionChoice = sessionChoice.selectDropdownList; 
  }
  
  return this.sessionChoice;
}


async fetchSessionChoiceForFamily(params: any) {
  let options: Options = {
    url: this.urlService.reportsURL.fetchSessionChoiceDropDown,
    body: params
}


let sessionChoice:any = [];
sessionChoice = await this.httpService.post(options);
if (sessionChoice && sessionChoice.selectDropdownList) {
    return sessionChoice.selectDropdownList; 
}
return sessionChoice
}


async  fetchAssignedSubClass(params:any) {
  let options: Options = {
    url: this.urlService.reportsURL.fetchAssignedSubClass,
    body:params
}


let response: any = await this.httpService.post(options);

return response;
}
  

  
}
