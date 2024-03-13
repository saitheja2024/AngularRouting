import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';
import { ReportsService } from '../reports/reports.service';
import { MasterService } from '../master/master.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
  
  
  
  searchCriteria: any;
  

  constructor(
    private httpService:HttpService,
    private urlService:UrlService,
    private reportService:ReportsService,
    private masterService:MasterService) { }

  setSearchCriteria(value: any) {
    this.searchCriteria=value;
  }


  getSearchCriteria() {
    return this.searchCriteria;
  }


  async fetchRegistrationDetailsBasedOnSearch(searchCriteria: any) {

    
      let options: Options = {
        url: this.urlService.registrationProcessingURL.fetchRegistrationDetailsBasedOnSearch,
        body: searchCriteria
      }
  
      let response: any = await this.httpService.post(options);
  
      if (response && response.responseRegistationList) {
        return response.responseRegistationList
      }
  
      return [];
  
  }

  async fetchSignupCodes(orgCode: string, programCode: string) {
    let response = await this.reportService.fetchSignupcode(orgCode,programCode);
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
