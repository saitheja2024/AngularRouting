import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { ReportsService } from '../reports/reports.service';
import { MasterService } from '../master/master.service';
import { AuthService } from 'src/app/modules/auth';
import { KEYS, StoreService } from '../store/store.service';
import { HttpHeaders } from '@angular/common/http';
import { UrlService } from '../url/url.service';
@Injectable({
    providedIn: 'root'
  })
  export class HealthInfoService {
    
    constructor(
        private httpService:HttpService,
        private urlService:UrlService,
        private authServie:AuthService,
        private reportService:ReportsService,
        private masterService:MasterService,
        private store:StoreService) { }

        saveHealthInfo(body: any) {
            let options: Options = { body: body, url: this.urlService.healthInfo.saveHealthInformation };
            return this.httpService.post(options);
          }

          deleteAllergyInfo(id: any) {
            let options: Options = { body: id, url: this.urlService.healthInfo.deleteAllergyInformation };
            return this.httpService.delete(options);
          }

          fetchPersonHealthInformation(body: any) {
            let options: Options = { body: body, url: this.urlService.healthInfo.fetchPersonHealthInformation };
            return this.httpService.post(options);
          }

          fetchHealthInformation(body: any) {
            let options: Options = { body: body, url: this.urlService.healthInfo.fetchHealthInformation };
            return this.httpService.post(options)
          }
}