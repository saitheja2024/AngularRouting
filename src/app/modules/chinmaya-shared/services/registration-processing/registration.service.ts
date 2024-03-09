import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
  searchCriteria: any;
  

  constructor(
    private httpService:HttpService,
    private urlService:UrlService) { }

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

}
