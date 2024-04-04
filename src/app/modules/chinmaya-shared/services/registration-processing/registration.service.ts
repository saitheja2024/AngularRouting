import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';
import { ReportsService } from '../reports/reports.service';
import { MasterService } from '../master/master.service';
import { AuthService } from 'src/app/modules/auth';
import { signupCodeRequestInteface } from '../master/master-interface';
import { KEYS, StoreService } from '../store/store.service';
import { fetchRegistrationDetailsBasedOnFamilyIdRequestInterface } from './registration.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
  
  
  
  
  searchCriteria: any;
  selectedFamily: any;
  

  constructor(
    private httpService:HttpService,
    private urlService:UrlService,
    private authServie:AuthService,
    private reportService:ReportsService,
    private masterService:MasterService,
    private store:StoreService) { }

    getSelectedChapter(): any {
       return this.store.getValue(KEYS.chapter);
    }

    getSelectedProgram(): any {
      return this.store.getValue(KEYS.program);
   }

  setSearchCriteria(value: any) {
    this.searchCriteria=value;
  }


  getSearchCriteria() {
    return this.searchCriteria;
  }

  setSelectedFamily(selectedFamily: any) {
    this.store.setValue(KEYS.selectedFamily,selectedFamily);
  }

  getSelectedFamily(){
    return this.store.getValue(KEYS.selectedFamily);
  }

  getLoggedInUser(){
    return this.authServie.getLoggedInUser();
  }
  


  async fetchRegistrationDetailsBasedOnSearch(searchCriteria: any) {

    
      let options: Options = {
        url: this.urlService.registrationProcessingURL.fetchRegistrationDetailsBasedOnSearch,
        body: searchCriteria
      }
  
      let response: any = await this.httpService.post(options);
  
      if (response) {
        return response;
      }
  
      return [];
  
  }

  async fetchSignupCodes(params:signupCodeRequestInteface) {
    let response = await this.reportService.fetchSignupcode(params);
    return response;
  }

  async fetchClassList(params: any) {
    let response = await this.reportService.fetchClassList(params);
    return response;
  }


  async fetchSessionChoice(params: any) {
    let response = await this.reportService.fetchSessionChoice(params);
    return response;
  }


  async fetchSchoolGradeList() {
    let response = await this.masterService.fetchSchoolGradeList();
    return response;
  }

  async getSelectedFamilyRegistrationDetails(params:fetchRegistrationDetailsBasedOnFamilyIdRequestInterface)
  {
    let options: Options = {
      url: this.urlService.registrationProcessingURL.fetchRegistrationDetailsBasedOnFamilyId,
      body: params
    }


  //   return {
  //     "adultSessions": "Session Choice 1: Sunday 1 (9:15-10:50 AM) Session Choice 2: Sunday 2 (12:15-1:50 PM) Session Choice 3: Friday (06:45-08:20 PM) ",
  //     "registrationDetailsList": [
  //         {
  //             "personId": 15104,
  //             "responsePersonProgramList": [
  //                 {
  //                     "personID": 15104,
  //                     "familyId": 5226,
  //                     "primaryPersonId": 15104,
  //                     "firstName": "Mohan",
  //                     "middleName": "Mn",
  //                     "lastName": "Su",
  //                     "gender": "M",
  //                     "primaryContact": "1",
  //                     "personType": "ADULT",
  //                     "chapterCode": "CMWRC",
  //                     "chapterName": "Chinmaya Mission",
  //                     "registrationId": 44445,
  //                     "programCode": "CMWRC24_25",
  //                     "signupCode": "ANNUALPLEDGE",
  //                     "paymentStatus": "PRE-AUTH_SUCCESS",
  //                     "registrationStatus": "PENDING",
  //                     "choiceLabel": "Session Choice 1:",
  //                     "choiceCode": "SUN_BVSESSION1",
  //                     "choicePreference": 1,
  //                     "sessionAssignment": null,
  //                     "schoolGradeCode": "",
  //                     "classAssignment": null,
  //                     "subClassAssignment": null,
  //                     "primaryFirstName": "Mohan",
  //                     "primaryLastName": "Su",
  //                     "adminComment": null,
  //                     "displayAmount": null,
  //                     "dueAmount": null,
  //                     "sessions": ""
  //                 }
  //             ]
  //         },
  //         {
  //             "personId": 15107,
  //             "responsePersonProgramList": [
  //                 {
  //                     "personID": 15107,
  //                     "familyId": 5226,
  //                     "primaryPersonId": 15104,
  //                     "firstName": "Sontwo",
  //                     "middleName": "",
  //                     "lastName": "Su",
  //                     "gender": "M",
  //                     "primaryContact": null,
  //                     "personType": "CHILD",
  //                     "chapterCode": "CSVA",
  //                     "chapterName": "Chinmaya Somnath",
  //                     "registrationId": 44447,
  //                     "programCode": "CS_BALAVIHAR_2024-25",
  //                     "signupCode": "2024-25_BALA_VIHAR_CLASS",
  //                     "paymentStatus": "PRE-AUTH_SUCCESS",
  //                     "registrationStatus": "PENDING",
  //                     "choiceLabel": "Session Choice 1:",
  //                     "choiceCode": "SUN_BVSESSION1",
  //                     "choicePreference": 1,
  //                     "sessionAssignment": null,
  //                     "schoolGradeCode": "24",
  //                     "classAssignment": "SATYAM",
  //                     "subClassAssignment": "SUN_P2",
  //                     "primaryFirstName": "Mohan",
  //                     "primaryLastName": "Su",
  //                     "adminComment": null,
  //                     "displayAmount": null,
  //                     "dueAmount": null,
  //                     "sessions": ""
  //                 }
  //             ]
  //         },
  //         {
  //             "personId": 15113,
  //             "responsePersonProgramList": [
  //                 {
  //                     "personID": 15113,
  //                     "familyId": 5226,
  //                     "primaryPersonId": 15104,
  //                     "firstName": "sonthree",
  //                     "middleName": "",
  //                     "lastName": "Su",
  //                     "gender": "M",
  //                     "primaryContact": null,
  //                     "personType": "CHILD",
  //                     "chapterCode": "CSVA",
  //                     "chapterName": "Chinmaya Somnath",
  //                     "registrationId": 44448,
  //                     "programCode": "CS_BALAVIHAR_2024-25",
  //                     "signupCode": "2024-25_BALA_VIHAR_CLASS",
  //                     "paymentStatus": "PRE-AUTH_SUCCESS",
  //                     "registrationStatus": "PENDING",
  //                     "choiceLabel": "Session Choice 1:",
  //                     "choiceCode": "SUN_BVSESSION1",
  //                     "choicePreference": 1,
  //                     "sessionAssignment": null,
  //                     "schoolGradeCode": "24",
  //                     "classAssignment": "SATYAM",
  //                     "subClassAssignment": "SUN_P2",
  //                     "primaryFirstName": "Mohan",
  //                     "primaryLastName": "Su",
  //                     "adminComment": null,
  //                     "displayAmount": null,
  //                     "dueAmount": null,
  //                     "sessions": ""
  //                 }
  //             ]
  //         },
  //         {
  //             "personId": 15242,
  //             "responsePersonProgramList": [
  //                 {
  //                     "personID": 15242,
  //                     "familyId": 5226,
  //                     "primaryPersonId": 15104,
  //                     "firstName": "Child-1",
  //                     "middleName": "",
  //                     "lastName": "Su",
  //                     "gender": "M",
  //                     "primaryContact": null,
  //                     "personType": "CHILD",
  //                     "chapterCode": "CSVA",
  //                     "chapterName": "Chinmaya Somnath",
  //                     "registrationId": 44449,
  //                     "programCode": "CS_BALAVIHAR_2024-25",
  //                     "signupCode": "2024-25_BALA_VIHAR_CLASS",
  //                     "paymentStatus": "PRE-AUTH_SUCCESS",
  //                     "registrationStatus": "PENDING",
  //                     "choiceLabel": "Session Choice 1:",
  //                     "choiceCode": "SUN_BVSESSION1",
  //                     "choicePreference": 1,
  //                     "sessionAssignment": null,
  //                     "schoolGradeCode": "22",
  //                     "classAssignment": "SATYAM",
  //                     "subClassAssignment": "SUN_A1",
  //                     "primaryFirstName": "Mohan",
  //                     "primaryLastName": "Su",
  //                     "adminComment": null,
  //                     "displayAmount": null,
  //                     "dueAmount": null,
  //                     "sessions": ""
  //                 }
  //             ]
  //         },
  //         {
  //             "personId": 15243,
  //             "responsePersonProgramList": [
  //                 {
  //                     "personID": 15243,
  //                     "familyId": 5226,
  //                     "primaryPersonId": 15104,
  //                     "firstName": "cc",
  //                     "middleName": "",
  //                     "lastName": "Su",
  //                     "gender": "M",
  //                     "primaryContact": null,
  //                     "personType": "CHILD",
  //                     "chapterCode": "CSVA",
  //                     "chapterName": "Chinmaya Somnath",
  //                     "registrationId": 44450,
  //                     "programCode": "CS_BALAVIHAR_2024-25",
  //                     "signupCode": "2024-25_BALA_VIHAR_CLASS",
  //                     "paymentStatus": "PRE-AUTH_SUCCESS",
  //                     "registrationStatus": "PENDING",
  //                     "choiceLabel": "Session Choice 1:",
  //                     "choiceCode": "SUN_BVSESSION1",
  //                     "choicePreference": 1,
  //                     "sessionAssignment": null,
  //                     "schoolGradeCode": "27",
  //                     "classAssignment": "SHIVANANDAM",
  //                     "subClassAssignment": "SUN_A1",
  //                     "primaryFirstName": "Mohan",
  //                     "primaryLastName": "Su",
  //                     "adminComment": null,
  //                     "displayAmount": null,
  //                     "dueAmount": null,
  //                     "sessions": ""
  //                 }
  //             ]
  //         },
  //         {
  //             "personId": 15244,
  //             "responsePersonProgramList": [
  //                 {
  //                     "personID": 15244,
  //                     "familyId": 5226,
  //                     "primaryPersonId": 15104,
  //                     "firstName": "child-11",
  //                     "middleName": "",
  //                     "lastName": "Su",
  //                     "gender": "M",
  //                     "primaryContact": null,
  //                     "personType": "CHILD",
  //                     "chapterCode": "CSVA",
  //                     "chapterName": "Chinmaya Somnath",
  //                     "registrationId": 44451,
  //                     "programCode": "CS_BALAVIHAR_2024-25",
  //                     "signupCode": "2024-25_BALA_VIHAR_CLASS",
  //                     "paymentStatus": "PRE-AUTH_SUCCESS",
  //                     "registrationStatus": "PENDING",
  //                     "choiceLabel": "Session Choice 1:",
  //                     "choiceCode": "SUN_BVSESSION1",
  //                     "choicePreference": 1,
  //                     "sessionAssignment": null,
  //                     "schoolGradeCode": "23",
  //                     "classAssignment": "SATYAM",
  //                     "subClassAssignment": "SUN_P2",
  //                     "primaryFirstName": "Mohan",
  //                     "primaryLastName": "Su",
  //                     "adminComment": null,
  //                     "displayAmount": null,
  //                     "dueAmount": null,
  //                     "sessions": ""
  //                 }
  //             ]
  //         },
  //         {
  //             "personId": 15245,
  //             "responsePersonProgramList": [
  //                 {
  //                     "personID": 15245,
  //                     "familyId": 5226,
  //                     "primaryPersonId": 15104,
  //                     "firstName": "child-12",
  //                     "middleName": "",
  //                     "lastName": "Su",
  //                     "gender": "M",
  //                     "primaryContact": null,
  //                     "personType": "CHILD",
  //                     "chapterCode": "CSVA",
  //                     "chapterName": "Chinmaya Somnath",
  //                     "registrationId": 44452,
  //                     "programCode": "CS_BALAVIHAR_2024-25",
  //                     "signupCode": "2024-25_BALA_VIHAR_CLASS",
  //                     "paymentStatus": "PRE-AUTH_SUCCESS",
  //                     "registrationStatus": "PENDING",
  //                     "choiceLabel": "Session Choice 1:",
  //                     "choiceCode": "SUN_BVSESSION1",
  //                     "choicePreference": 1,
  //                     "sessionAssignment": null,
  //                     "schoolGradeCode": "27",
  //                     "classAssignment": "SHIVANANDAM",
  //                     "subClassAssignment": "SUN_A1",
  //                     "primaryFirstName": "Mohan",
  //                     "primaryLastName": "Su",
  //                     "adminComment": null,
  //                     "displayAmount": null,
  //                     "dueAmount": null,
  //                     "sessions": ""
  //                 },
  //                 {
  //                     "personID": 15245,
  //                     "familyId": 5226,
  //                     "primaryPersonId": 15104,
  //                     "firstName": "child-12",
  //                     "middleName": "",
  //                     "lastName": "Su",
  //                     "gender": "M",
  //                     "primaryContact": null,
  //                     "personType": "CHILD",
  //                     "chapterCode": "CSVA",
  //                     "chapterName": "Chinmaya Somnath",
  //                     "registrationId": 44453,
  //                     "programCode": "CS_BALAVIHAR_2024-25",
  //                     "signupCode": "SATURDAY_TELUGU_CLASS",
  //                     "paymentStatus": "PRE-AUTH_SUCCESS",
  //                     "registrationStatus": "PENDING",
  //                     "choiceLabel": "Session Choice 1:",
  //                     "choiceCode": "SUN_BVSESSION1",
  //                     "choicePreference": 1,
  //                     "sessionAssignment": null,
  //                     "schoolGradeCode": "27",
  //                     "classAssignment": "Telugu",
  //                     "subClassAssignment": "Saturday Telugu",
  //                     "primaryFirstName": "Mohan",
  //                     "primaryLastName": "Su",
  //                     "adminComment": null,
  //                     "displayAmount": null,
  //                     "dueAmount": null,
  //                     "sessions": ""
  //                 },
  //                 {
  //                     "personID": 15245,
  //                     "familyId": 5226,
  //                     "primaryPersonId": 15104,
  //                     "firstName": "child-12",
  //                     "middleName": "",
  //                     "lastName": "Su",
  //                     "gender": "M",
  //                     "primaryContact": null,
  //                     "personType": "CHILD",
  //                     "chapterCode": "CSVA",
  //                     "chapterName": "Chinmaya Somnath",
  //                     "registrationId": 44454,
  //                     "programCode": "CS_BALAVIHAR_2024-25",
  //                     "signupCode": "SHLOKA_CLASS",
  //                     "paymentStatus": "PRE-AUTH_SUCCESS",
  //                     "registrationStatus": "PENDING",
  //                     "choiceLabel": "Session Choice 1:",
  //                     "choiceCode": "SUN_BVSESSION1",
  //                     "choicePreference": 1,
  //                     "sessionAssignment": null,
  //                     "schoolGradeCode": "27",
  //                     "classAssignment": "SHLOKA",
  //                     "subClassAssignment": "Sunday Shloka",
  //                     "primaryFirstName": "Mohan",
  //                     "primaryLastName": "Su",
  //                     "adminComment": null,
  //                     "displayAmount": null,
  //                     "dueAmount": null,
  //                     "sessions": "Choice 1: Sunday Shloka (11:00 - 11:50 PM) "
  //                 },
  //                 {
  //                     "personID": 15245,
  //                     "familyId": 5226,
  //                     "primaryPersonId": 15104,
  //                     "firstName": "child-12",
  //                     "middleName": "",
  //                     "lastName": "Su",
  //                     "gender": "M",
  //                     "primaryContact": null,
  //                     "personType": "CHILD",
  //                     "chapterCode": "CSVA",
  //                     "chapterName": "Chinmaya Somnath",
  //                     "registrationId": 44539,
  //                     "programCode": "CS_BALAVIHAR_2024-25",
  //                     "signupCode": "SAMSKRITAM_FOR_CHILDREN",
  //                     "paymentStatus": "PRE-AUTH_SUCCESS",
  //                     "registrationStatus": "PENDING",
  //                     "choiceLabel": "Session Choice 1:",
  //                     "choiceCode": "SUN_BVSESSION1",
  //                     "choicePreference": 1,
  //                     "sessionAssignment": null,
  //                     "schoolGradeCode": "27",
  //                     "classAssignment": "Samskritam",
  //                     "subClassAssignment": "Sunday_Samskritam",
  //                     "primaryFirstName": "Mohan",
  //                     "primaryLastName": "Su",
  //                     "adminComment": null,
  //                     "displayAmount": null,
  //                     "dueAmount": null,
  //                     "sessions": ""
  //                 }
  //             ]
  //         }
  //     ]
  // }
    let response: any = await this.httpService.post(options);
    return response;
  }


  async fetchPaymentStatus() {
    return await this.masterService.fetchPaymentStatusList();
  }

  async fetchRegistrationStatus() {
    return await this.masterService.fetchRegistrationStatusList()
  }
  
  async fetchAssignedSubClass(params:any) {
    let response =  await this.reportService.fetchAssignedSubClass(params);
    if(response && response.selectDropdownList){
      return response.selectDropdownList;
    }

    return [];
  }


  async saveFamilyRegistrationDetails(param:any) {
    let options: Options = {
      url: this.urlService.registrationProcessingURL.saveRegistrationDetails,
      body: param
    }

    let response: any = await this.httpService.post(options);
  }
  
    
 

}


