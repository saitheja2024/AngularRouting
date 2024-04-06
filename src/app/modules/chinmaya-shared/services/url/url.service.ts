import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  authURL={
    login : "login/validateLogin"
  }

  organzationURL = {
    fetchAllOrgnaztion: "organization/fetchChaptersList",
    fetchAcadamicYear: "registrationProcessing/fetchProgramYearDropdown",
    fetchProgramCodesByChapterCodeAndAcacademicyear:"registrationProcessing/fetchProgramCodesByChapterCodeAndAcademicyear"
    
  }

  registrationProcessingURL = {
    
    fetchAllPrograms: "registration/fetchProgramsByChapter",
    fetchRegistrationDetailsBasedOnSearch:"registrationProcessing/fetchRegistrationDetailsBasedOnSearch",
    fetchRegistrationDetailsBasedOnFamilyId:"registrationProcessing/fetchRegistrationDetailsBasedOnFamilyId",
    saveRegistrationDetails:"registrationProcessing/saveRegistrationDetails",
    acceptFamily:"registrationProcessing/acceptFamily",
    assignChoice:"registrationProcessing/assignChoice"
    
  }

  reportsURL = {
    fetchProgramYears: "reports/fetchProgramYears",
    fetchSessionChoicesList:"reports/fetchSessionChoicesList",
    fetchSignupcodes:"reports/fetchSignupcodes",
    fetchClassList:"reports/fetchClassDropdown",
    fetchAssignedSubClass:"reports/fetchSubClassDropdown"
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
    fetchGenderList: "master/fetchGenderList",
    fetchRegistrationStatusList:"/master/fetchRegistrationStatusList",
    fetchPaymentStatusList:"/master/fetchPaymentStatusList",
    fetchSchoolGradeList:"/master/fetchSchoolGradeList"
  }

  unLockAccountURL={
    unlockAccount:'onlineaccount/saveuserUnblock',
    searchUnlockAccount:'onlineaccount/searchunblockAccount'
  }

  
}