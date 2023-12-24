import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private personType: any = null;
  private statusList: any = null;
  private maritialStatusList: any = null;
  private stateList: any = null;

  constructor(
    private httpService: HttpService,
    private urlService: UrlService
  ) { }





  async getPersonType() {

    if (this.personType != null) {
      return this.personType;
    }

    this.personType = []
    let options: Options = {
      url: this.urlService.masterURL.fetchPersonType,
      body: null
    }

    let personType: any = await this.httpService.get(options);

    if (personType && personType.selectDropdownList) {
      this.personType = personType.selectDropdownList;
    }

    return this.personType;

  }


  async getStatus() {


    if (this.statusList != null) {
      return this.statusList;
    }

    this.statusList = []
    let options: Options = {
      url: this.urlService.masterURL.fetchStatusList,
      body: null
    }

    let statusList: any = await this.httpService.get(options);

    if (statusList && statusList.selectDropdownList) {
      this.statusList = statusList.selectDropdownList;
    }

    return this.statusList;

  }




  async getMaritialStatusList() {
    if (this.maritialStatusList != null) {
      return this.maritialStatusList;
    }

    this.maritialStatusList = []
    let options: Options = {
      url: this.urlService.masterURL.fetchMaritialList,
      body: null
    }

    let maritialStatusList: any = await this.httpService.get(options);

    if (maritialStatusList && maritialStatusList.selectDropdownList) {
      this.maritialStatusList = maritialStatusList.selectDropdownList;
    }

    return this.maritialStatusList;
  }







  async getStateList() {
    if (this.stateList != null) {
      return this.stateList;
    }

    this.stateList = []
    let options: Options = {
      url: this.urlService.masterURL.fetchStateList,
      body: null
    }

    let stateList: any = await this.httpService.get(options);

    if (stateList && stateList.selectDropdownList) {
      this.stateList = stateList.selectDropdownList;
    }

    return this.stateList;
  }
} 
