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
  searchCriteria: any;
  registerWithMembership: any;



  constructor(
    private httpService: HttpService,
    private urlService: UrlService
  ) { }


  setSearchCriteria(param: any) {
    this.searchCriteria = param;
  }

  getSearchCriteria() {
    return this.searchCriteria;
  }

  setRegisterWithMembership(registerWithMembership: any) {
    this.registerWithMembership = registerWithMembership;
  }

  isRegisterWithMembership(){
    return this.registerWithMembership;
  }

  async searchFamilies(params: FamilySearchInterface) {

    let options: Options = {
      url: this.urlService.familyURL.searchFamilies,
      body: params
    }

    let families: any = await this.httpService.post(options);

    if (families && families.projectSummaryList) {
      //this.familyList = families.projectSummaryList;
      return families;
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

  async saveFamilyAndPerson(params:any){
    let options: Options = {
      url: this.urlService.registration.saveFamilyAndPerson,
      body: params
    }

    let personDetails: any = await this.httpService.post(options);
   return personDetails;  
  }

  async saveFamilyPerson(params:any){
    let options: Options = {
      url: this.urlService.registration.SaveFamilyPerson,
      body: params
    }

    let personDetails: any = await this.httpService.post(options);
   return personDetails;  
  }

  async getProgramDesc(formValues: any) {
    let options: Options = {
      url: this.urlService.memberShip.MemberShipProgramDescription,
      body: formValues
    }
    let response: any = await this.httpService.post(options);
    return response;
    }


    async fetchProgramDetails(params: any) {
      let options: Options = {
        url: this.urlService.manageFamily.fetchProgramDetails,
        body: params
      }
      let response: any = await this.httpService.post(options);
      return response;
    }
    


}