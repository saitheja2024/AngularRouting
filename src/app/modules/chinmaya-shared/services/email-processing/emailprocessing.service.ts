import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';
import { RegistrationStatusList } from './emailprocessing-interface';
import { KEYS, StoreService } from '../store/store.service';
import { AuthService } from 'src/app/modules/auth';

@Injectable({
    providedIn: 'root'
  })
  export class EmailProcessingServices {
    
    EmailSearchCriteria:any;

    constructor(private httpService:HttpService,
        private urlService:UrlService, 
        private store:StoreService,
        private authService:AuthService) { }

        setEmailSearchCriteria(value: any) {
          this.EmailSearchCriteria=value;
        }
      
      
        getEmailSearchCriteria() {
          return this.EmailSearchCriteria;
        }

        setSelectedFamily(selectedFamily: any) {
          this.store.setValue(KEYS.selectedFamily,selectedFamily);
        }
      
        getSelectedFamily(){
          return this.store.getValue(KEYS.selectedFamily);
        }
      
        getLoggedInUser(){
          return this.authService.getLoggedInUser();
        }
        

        async RegistrationStatusList() {
            let options: Options = {
                url: this.urlService.emailProcessingSearchDropDown.fetchRegistrationStatusList,
                body:null
              }
            let response = await await this.httpService.get(options);
            return response;
          }

          async PaymentStatusList() {
            let options: Options = {
                url: this.urlService.emailProcessingSearchDropDown.fetchPaymentStatusList,
                body:null
              }
            let response = await await this.httpService.get(options);
            return response;
          }

          async SessionChoicesList(params:RegistrationStatusList) {
            let options: Options = {
                url: this.urlService.emailProcessingSearchDropDown.fetchSessionChoicesList,
                body: params
              }
            let response = await await this.httpService.post(options);
            return response;
          }

          async Signupcodes(param:any) {
            let options: Options = {
                url: this.urlService.emailProcessingSearchDropDown.fetchSignupcodes,
                body: param
              }
            let response = await await this.httpService.post(options);
            return response;
          }

          async ClassDropdown(param:any) {
            let options: Options = {
                url: this.urlService.emailProcessingSearchDropDown.fetchClassDropdown,
                body: param
              }
            let response = await await this.httpService.post(options);
            return response;
          }

          async SchoolGradeList() {
            let options: Options = {
                url: this.urlService.emailProcessingSearchDropDown.fetchSchoolGradeList,
                body: null
              }
            let response = await await this.httpService.get(options);
            return response;
          }

          async RegistrationDetailsBasedOnSearch(params:RegistrationStatusList) {
            let options: Options = {
                url: this.urlService.emailProcessingSearch.fetchRegistrationDetailsBasedOnSearch,
                body: params
              }
            let response = await await this.httpService.post(options);
            return response;
          }

          async fetchviewTemplate(params:RegistrationStatusList) {
            let options: Options = {
                url: this.urlService.ViewTemplate.fetchviewTemplate,
                body: params
              }
            let response = await await this.httpService.post(options);
            return response;
          }

          async sendEmailTemplate(params:RegistrationStatusList) {
            let options: Options = {
                url: this.urlService.sendEmailInfo.sendEmail,
                body: params
              }
            let response = await await this.httpService.post(options);
            return response;
          }

  }