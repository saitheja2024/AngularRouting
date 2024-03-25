import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';
import { ReportsService } from '../reports/reports.service';
import { MasterService } from '../master/master.service';
import { AuthService } from 'src/app/modules/auth';
import { signupCodeRequestInteface } from '../master/master-interface';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
  
  
  
  searchCriteria: any;
  selectedFamily: any;
  

  constructor(
    private httpService:HttpService,
    private urlService:UrlService,
    private authServie:AuthService,
    private reportService:ReportsService,
    private masterService:MasterService) { }

  setSearchCriteria(value: any) {
    this.searchCriteria=value;
  }


  getSearchCriteria() {
    return this.searchCriteria;
  }

  setSelectedFamily(selectedFamily: any) {
    this.selectedFamily = selectedFamily;
  }

  getSelectedFamily(){
    return this.selectedFamily;
  }

  getLoggedInUser(){
    return this.authServie.getLoggedInUser();
  }
  


  async fetchRegistrationDetailsBasedOnSearch(searchCriteria: any) {

    
      let options: Options = {
        url: this.urlService.registrationProcessingURL.fetchRegistrationDetailsBasedOnSearch,
        body: searchCriteria
      }
  
      let response: any = await this.httpService.post(options);
  
      if (response) {
        return response;
      }
  
      return [];
  
  }

  async fetchSignupCodes(params:signupCodeRequestInteface) {
    let response = await this.reportService.fetchSignupcode(params);
    return response;
  }

  async fetchClassList(params: any) {
    let response = await this.reportService.fetchClassList(params);
    return response;
  }


  async fetchSessionChoice(params: any) {
    let response = await this.reportService.fetchSessionChoice(params);
    return response;
  }


  async fetchSchoolGradeList() {
    let response = await this.masterService.fetchSchoolGradeList();
    return response;
  }

  
 

}
