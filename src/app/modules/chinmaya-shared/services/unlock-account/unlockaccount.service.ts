import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';
import { SearchunlockAccountInterface, unlockAccountInterface } from './unlockaccount-interface';
@Injectable({
    providedIn: 'root'
  })
  export class UnlockaccountService {
    

    constructor(private httpService:HttpService,
        private urlService:UrlService) { }

        async getUnlockAccount(params:unlockAccountInterface) {
            let options: Options = {
                url: this.urlService.unLockAccountURL.unlockAccount,
                body: params
              }
            let response = await await this.httpService.post(options);
            return response;
          }

          async fetchUnlockAccount(params:SearchunlockAccountInterface) {
            let options: Options = {
                url: this.urlService.unLockAccountURL.searchUnlockAccount,
                body: params
              }
            let response = await await this.httpService.post(options);
            return response;
          }

  }