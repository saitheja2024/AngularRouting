import { Injectable } from '@angular/core';
import { FamilySearch } from '../../interfaces/family-interfaces/family-search';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(
    private httpService: HttpService,
    private urlService: UrlService
  ) { }



  async searchFamilies(params: FamilySearch) {

    let options: Options = {
      url: this.urlService.familyURL.searchFamilies,
      body: params
    }

    let families: any = await this.httpService.post(options);

    if (families && families.personProgramList) {
      return families.personProgramList;
    }

    return [];

  }



}
