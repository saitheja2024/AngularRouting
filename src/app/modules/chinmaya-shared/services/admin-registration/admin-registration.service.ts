import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';
import { KEYS, StoreService } from '../store/store.service';
import { AuthService } from 'src/app/modules/auth';
import { RegistrationService } from '../registration-processing/registration.service';

@Injectable({
  providedIn: 'root'
})
export class AdminregistrationServices {



  EmailSearchCriteria: any;

  constructor(private httpService: HttpService,
    private urlService: UrlService,
    private store: StoreService,
    private authService: AuthService,
    private registrationService: RegistrationService) { }



  getLoggedInUser() {
    return this.authService.getLoggedInUser();
  }

  async fetchEnrolledClassesList(params: any) {
    let url = this.urlService.adminRegistrationURL.fetchEnrolledClassesList;
    let options: Options = {
      url: url,
      body: params
    }
    let response = await this.httpService.post(options);
    return response;
  }


  async fetchSignupCodes(param: any) {
    let list = await this.registrationService.fetchSignupCodes(param);
    return list;
  }

  async refreshEmailDistributionList(params: any) {

    let url = this.urlService.adminRegistrationURL.refreshEmailDistributionList;
    let options: Options = {
      url: url,
      body: params
    }
    let response = await this.httpService.post(options);
    return response;
  }





}