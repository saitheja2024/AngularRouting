import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';
import { ReportsService } from '../reports/reports.service';
import { MasterService } from '../master/master.service';
import { AuthService } from 'src/app/modules/auth';
import { KEYS, StoreService } from '../store/store.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class ClassRegistrationService {
    
    constructor(
        private httpService:HttpService,
        private urlService:UrlService,
        private authServie:AuthService,
        private reportService:ReportsService,
        private masterService:MasterService,
        private store:StoreService) { }

    async getPersonList(param: any) {
        let options: Options = {
            url: this.urlService.classRegistration.registration,
            body: param
        }
    
        let response: any = await await this.httpService.post(options);
         return response;

        }

      async  fetchCategoriesList(param: any) {
            let options: Options = {
                url: this.urlService.classRegistration.categoryList,
                body: param
            }
        
            let response: any = await await this.httpService.post(options);
             return response.selectDropdownList;
          }

          async  fetchPersonProgramRegistrationList(param: any) {
            let options: Options = {
                url: this.urlService.classRegistration.personProgramRegi,
                body: param
            }
        
            let response: any = await await this.httpService.post(options);
             return response;
          }

          async  deleteFamilySessionPreference(param: any) {
            let options: Options = {
                url: this.urlService.classRegistration.deleteSession,
                body: param
            }
        
            let response: any = await await this.httpService.post(options);
             return response;
          }
         
          async  saveSessionPreferrence(param: any) {
            let options: Options = {
                url: this.urlService.classRegistration.saveSessionPreference,
                body: param
            }
        
            let response: any = await await this.httpService.post(options);
             return response;
          }

          async  deleteProgramRegistration(param: any) {
            var options:Options = {
                headers: new HttpHeaders({
                  'Content-Type': 'application/json'
                }),
                url: this.urlService.classRegistration.deletePersonProgramRegistration,
                body: param
              }
           
            let response: any = await await this.httpService.post(options);
             return response;
          }

          async  fetchSaveProgramConfigurationFields(param: any) {
            var options:Options = {
                url: this.urlService.classRegistration.ProgramConfigurationFields,
                body: param
              }
           
            let response: any = await await this.httpService.post(options);
             return response;
          }

         async FetchreviewPrerequisites(param: any) {
            var options:Options = {
                url: this.urlService.classRegistration.reviewPrerequisites,
                body: param
              }
              let response: any = await await this.httpService.post(options);
              return response;
          }

          async getClassAmount(param: any) {
            var options:Options = {
                url: this.urlService.classRegistration.fetchAmount,
                body: param
              }
              let response: any = await await this.httpService.post(options);
              return response;
          }

          async saveProgramRegistration(param: any) {
            var options:Options = {
                url: this.urlService.classRegistration.saveProgramRegistration,
                body: param
              }
              let response: any = await await this.httpService.post(options);
              return response;
          }

          async saveAnnualPledgeRegistration(param: any) {
            var options:Options = {
                url: this.urlService.classRegistration.saveAnnualPledgeRegistration,
                body: param
              }
              let response: any = await await this.httpService.post(options);
              return response;
          }

          getLoggedInUser(){
            return this.authServie.getLoggedInUser();
          }
  }