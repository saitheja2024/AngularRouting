import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  organzationURL = {
    fetchAllOrgnaztion: "organization/fetchChaptersList"
  }

  registrationURL = {
    fetchAllPrograms: "registration/fetchProgramsByChapter"
  }

  reportsURL = {
    fetchProgramYears: "reports/fetchProgramYears"
  }

  familyURL = {
    searchFamilies: "manageFamily/manageFamilySearch",
    fetchFamilyDetailsByFamilyID: "manageFamily/fetchfamilyDetails",
    fetchPersonByPersonId: "registration/fetchPersonByPersonId"
  }

  masterURL = {
    fetchPersonType: "master/fetchPersonTypeList",
    fetchStatusList: "master/fetchStatusList",
    fetchStateList: "master/fetchStatesList",
    fetchMaritialList: "master/fetchMaritalStatusList",
    fetchGenderList: "master/fetchGenderList"
  }
}
