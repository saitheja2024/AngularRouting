import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';
import { ReportsService } from '../reports/reports.service';
import { MasterService } from '../master/master.service';
import { AuthService } from 'src/app/modules/auth';
import { signupCodeRequestInteface } from '../master/master-interface';
import { KEYS, StoreService } from '../store/store.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistratioReviewService {
  
  
  searchCriteria: any;
  selectedFamily: any;
  selectedFamilyRecords: any[];
  updatedReviewRecords:any
  initVal:any='';
  selectedProgramDesc = new BehaviorSubject<any>(this.initVal);
  programSel = this.selectedProgramDesc.asObservable();

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

  setProgramDesc(program:any) {

    this.initVal = program;
    this.selectedProgramDesc.next(this.initVal);
  }

  setSelectedFamily(selectedFamily: any) {
    this.store.setValue(KEYS.selectedFamily,selectedFamily);
  }

  getSelectedFamily(){
    return this.store.getValue(KEYS.selectedFamily);
  }

  async fetchRegistrationStatusList() {
    let list = await this.masterService.fetchRegistrationStatusList();
    return list;
  }
  
  

  getLoggedInUser(){
    let logUser = KEYS.loggedInUser;
    return this.store.getValue(logUser);
  }

  setSelectedFamilyRecords(records: any[]) {
    this.selectedFamilyRecords = records;
  }

  getSelectedFamilyRecords(){
    return this.selectedFamilyRecords;
  }

  setUpdatedReviewedRecords(response:any) {
    this.updatedReviewRecords = response;
  }

  getUpdatedReviewedRecords() {
    //personprogramregistrationList
    return  this.updatedReviewRecords.personprogramregistrationList;
  }
  



  async acceptFamily(param:any) {
    let options: Options = {
      url: this.urlService.registrationProcessingURL.acceptFamily,
      body: param
    }

    let response: any = await this.httpService.post(options);

  }


  
 
  


  async fetchRegistrationReviewDetailsBasedOnSearch(searchCriteria: any) {

    
      let options: Options = {
        url: this.urlService.registrationReviewURL.fetchRegistrationReviewDetailsBasedOnSearch,
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

  async fetchSessionChoicesDropdown(params: any) {
    let response = await this.reportService.fetchSessionChoicesDropdown(params);
    return response;
  }


  async fetchSessionChoice(params: any) {
    let response = await this.reportService.fetchSessionChoice(params);
    return response;
  }

  async fetchSessionChoiceForFamily(params: any) {
    let response = await this.reportService.fetchSessionChoiceForFamily(params);
    return response;
  }

 
  


  async fetchSchoolGradeList() {
    let response = await this.masterService.fetchSchoolGradeList();
    return response;
  }
  

  async getSelectedFamilyRegistrationReviewDetails(params:any)
  {
    let options: Options = {
      url: this.urlService.registrationProcessingURL.fetchRegistrationDetailsBasedOnFamilyId,
      body: params
    }
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

  async fetchSubClassDetails(params:any){
      let options: Options = {
        url: this.urlService.registrationReviewURL.fetchSubClassDetails,
        body: params
      }
      let response: any = await this.httpService.post(options);

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

  async saveRegistrationReview(param: any) {
    let options: Options = {
      url: this.urlService.registrationReviewURL.saveRegistrationReview,
      body: param
    }

    let response: any = await this.httpService.post(options);
    return response;
  }
  
  async fetchPaymentDetails(param: any) {
    let options: Options = {
      url: this.urlService.registrationReviewURL.fetchPaymentHistoryDetails,
      body: param
    }

    let response: any = await this.httpService.post(options);
    return response;
  }
 

}


