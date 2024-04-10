import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';
import { FamilyMemberSearchInterface, FamilySearchInterface, SearchPersonByPersonIdInterface } from '../../interfaces/family-interfaces/family-search';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {



  familyList: any = [];
  familyMembersList: any = null;
  selectedFamilyMember: any;
  selectedFamily: any;
  familyMember: any;



  constructor(
    private httpService: HttpService,
    private urlService: UrlService
  ) { }



  async searchFamilies(params: FamilySearchInterface) {

    let options: Options = {
      url: this.urlService.familyURL.searchFamilies,
      body: params
    }

    let families: any = await this.httpService.post(options);

    if (families && families.personProgramList) {
      this.familyList = families.personProgramList;
      return families.personProgramList;
    }

    return [];

  }

  async fetchPersonByPersonId(params: SearchPersonByPersonIdInterface) {
    let options: Options = {
      url: this.urlService.familyURL.fetchPersonByPersonId,
      body: params
    }

    let personDetails: any = await this.httpService.post(options);

    if (personDetails) {
      this.familyMember = personDetails;
    }

    return this.familyMember;

  }

  setSelectedFamilyMember(selectedFamilyMember: any) {
    this.selectedFamilyMember = selectedFamilyMember;
  }

  getSelectedFamilyMember() {
    return this.selectedFamilyMember;
  }

  setSelectedFamily(selectedFamily: any) {
    this.selectedFamily = selectedFamily;
  }

  getSelectedFamily() {
    return this.selectedFamily;
  }

  /**
   * 
   * @returns the list of family at service level only. 
   */
  getFamilyList(): any {
    return this.familyList;
  }



  async fetchFamilyDetailsByFamilyID(searchParams: FamilyMemberSearchInterface, forceFetch?: boolean) {
    // This is test message
    if (!forceFetch && this.familyMembersList != null) {
      return this.familyMembersList;
    }

    this.familyMembersList = []
    let options: Options = {
      url: this.urlService.familyURL.fetchFamilyDetailsByFamilyID,
      body: searchParams
    }

    let family: any = await this.httpService.post(options);

    if (family && family.personProgramList) {
      this.familyMembersList = family.personProgramList;
    }

    return this.familyMembersList;
  }



}