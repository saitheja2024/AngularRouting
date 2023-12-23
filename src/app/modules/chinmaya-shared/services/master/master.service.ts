import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  personType: any = null;

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
} 
