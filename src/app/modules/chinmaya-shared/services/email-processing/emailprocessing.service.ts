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