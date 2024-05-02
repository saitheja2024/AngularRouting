import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';
import { ReportsService } from '../reports/reports.service';
import { MasterService } from '../master/master.service';
import { AuthService } from 'src/app/modules/auth';
import { KEYS, StoreService } from '../store/store.service';

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
         return response.personProgramList;

        }
         
    
  }