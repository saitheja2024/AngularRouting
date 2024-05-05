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
    assignChoice:"registrationProcessing/assignChoice",
    
  }

  reportsURL = {
    fetchProgramYears: "reports/fetchProgramYears",
    fetchSessionChoicesList:"reports/fetchSessionChoicesList",
    fetchSignupcodes:"reports/fetchSignupcodes",
    fetchClassList:"reports/fetchClassDropdown",
    fetchAssignedSubClass:"reports/fetchSubClassDropdown",
    fetchSessionChoiceDropDown: "reports/fetchSessionChoicesDropdown"
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
    fetchSchoolGradeList:"/master/fetchSchoolGradeList",
    fetchVaccinationList:'master/fetchVaccinationList',
    fetchTShirtSizeList:'master/fetchTShirtSizeList',
    fetchGCCSession:'master/fetchGCCSession'
  }

  unLockAccountURL={
    unlockAccount:'onlineaccount/saveuserUnblock',
    searchUnlockAccount:'onlineaccount/searchunblockAccount'
  }

  emailProcessingSearch = {
    fetchRegistrationDetailsBasedOnSearch:'registrationProcessing/fetchRegistrationDetailsBasedOnSearch'
  }

  ViewTemplate={
    fetchviewTemplate:'registrationProcessing/viewTemplate'
  }

  sendEmailInfo={
    sendEmail:'registrationProcessing/sendEmail'
  }

  classRegistration = {
    registration: 'registration/fetchPersonsListByFamilyId',
    categoryList:'programSelection/fetchListOfSignupCode',
    personProgramRegi:'programSelection/fetchPersonProgramRegistrationByFamilyIdAndProgramCode',
    deleteSession:'programSelection/deleteFamilySessionPreference',
    saveSessionPreference:"program/saveSessionPreference",
    deletePersonProgramRegistration:'programSelection/deletePersonProgramRegistration',
    ProgramConfigurationFields:'registration/fetchProgramConfigurationFields',
    reviewPrerequisites:'programSelection/reviewPrerequisites',
    fetchAmount:'programSelection/fetchAmount',
    saveProgramRegistration:'programSelection/saveProgramRegistration',
    saveAnnualPledgeRegistration:'programSelection/saveAnnualPledgeRegistration'
  }

  additionalDetails = {
    reviewAndUpdateWaitListedStatus:'programSelection/reviewAndUpdateWaitListedStatus'
  }
  
}