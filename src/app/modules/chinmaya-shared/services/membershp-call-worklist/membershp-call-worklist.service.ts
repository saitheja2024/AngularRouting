import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';
import { RegistrationStatusList } from './membershp-call-worklist-interface';
import { KEYS, StoreService } from '../store/store.service';
import { AuthService } from 'src/app/modules/auth';

@Injectable({
  providedIn: 'root'
})
export class MemberShipCallWorkListServices {
  

  EmailSearchCriteria: any;

  constructor(private httpService: HttpService,
    private urlService: UrlService,
    private store: StoreService,
    private authService: AuthService) { }

  setEmailSearchCriteria(value: any) {
    this.EmailSearchCriteria = value;
  }


  getEmailSearchCriteria() {
    return this.EmailSearchCriteria;
  }

  setSelectedFamily(selectedFamily: any) {
    this.store.setValue(KEYS.selectedFamily, selectedFamily);
  }

  getSelectedFamily() {
    return this.store.getValue(KEYS.selectedFamily);
  }

  getLoggedInUser() {
    return this.authService.getLoggedInUser();
  }

  async fetchMemberShipCallWork(params: any) {
    let options: Options = {
      url: this.urlService.memberShip.fetchMemberShipCallWork,
      body: params
    }
    let response: any = await this.httpService.post(options);
    return response.memberShipCallWorkList;
  }


  async fetchMemberShipCallWorkDetailsByFamilyId(callWork: any) {
    let options: Options = {
      url: this.urlService.memberShip.fetchMemberShipCallWorkDetailsByFamilyId,
      body: callWork
    }
    let response: any = await this.httpService.post(options);
    return response;
  }

 async saveMembershipCallHistory(formValues: any) {
  let options: Options = {
    url: this.urlService.memberShip.saveMembershipCallHistory,
    body: formValues
  }
  let response: any = await this.httpService.post(options);
  return response;
  }




}