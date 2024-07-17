import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramRegistrationService {

  constructor(private urlService:UrlService,
    private httpService:HttpService
  ) { }


  async fetchDashboardProgramCodes(params:any){

    var options:Options = {
      url: this.urlService.programSelection.fetchDashboardProgramCodes,
      body: params
    }
    let response: any = await this.httpService.post(options);
    return response;
  }


  async validateCertification(params:any){

    var options:Options = {
      url: this.urlService.programSelection.validateCertification,
      body: params
    }
    let response: any = await this.httpService.post(options);
    return response;

  }
}
