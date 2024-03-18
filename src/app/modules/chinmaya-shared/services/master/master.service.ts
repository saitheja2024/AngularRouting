import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  

  private personType: any = null;
  private statusList: any = null;
  private maritialStatusList: any = null;
  private stateList: any = null;
  private registrationStatusList: any;
  private paymentStatusList: any;
  private schoolGradeList: any;
  private acadamicYear: any=null;
  private chapterList: any=null;

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


  async getStatus() {


    if (this.statusList != null) {
      return this.statusList;
    }

    this.statusList = []
    let options: Options = {
      url: this.urlService.masterURL.fetchStatusList,
      body: null
    }

    let statusList: any = await this.httpService.get(options);

    if (statusList && statusList.selectDropdownList) {
      this.statusList = statusList.selectDropdownList;
    }

    return this.statusList;

  }




  async getMaritialStatusList() {
    if (this.maritialStatusList != null) {
      return this.maritialStatusList;
    }

    this.maritialStatusList = []
    let options: Options = {
      url: this.urlService.masterURL.fetchMaritialList,
      body: null
    }

    let maritialStatusList: any = await this.httpService.get(options);

    if (maritialStatusList && maritialStatusList.selectDropdownList) {
      this.maritialStatusList = maritialStatusList.selectDropdownList;
    }

    return this.maritialStatusList;
  }







  async getStateList() {
    if (this.stateList != null) {
      return this.stateList;
    }

    this.stateList = []
    let options: Options = {
      url: this.urlService.masterURL.fetchStateList,
      body: null
    }

    let stateList: any = await this.httpService.get(options);

    if (stateList && stateList.selectDropdownList) {
      this.stateList = stateList.selectDropdownList;
    }

    return this.stateList;
  }



  async fetchRegistrationStatusList() {
    if (this.registrationStatusList != null) {
      return this.registrationStatusList;
    }

    this.registrationStatusList = []
    let options: Options = {
      url: this.urlService.masterURL.fetchRegistrationStatusList,
      body: null
    }

    let registrationStatusList: any = await this.httpService.get(options);

    if (registrationStatusList && registrationStatusList.selectDropdownList) {
      this.registrationStatusList = registrationStatusList.selectDropdownList;
    }

    return this.registrationStatusList;
  } 

  async fetchPaymentStatusList() {
    if (this.paymentStatusList != null) {
      return this.paymentStatusList;
    }

    this.paymentStatusList = []
    let options: Options = {
      url: this.urlService.masterURL.fetchPaymentStatusList,
      body: null
    }

    let paymentStatusList: any = await this.httpService.get(options);

    if (paymentStatusList && paymentStatusList.selectDropdownList) {
      this.paymentStatusList = paymentStatusList.selectDropdownList;
    }

    return this.paymentStatusList;
  } 


  async fetchSchoolGradeList() {
    if (this.schoolGradeList != null) {
      return this.schoolGradeList;
    }

    this.schoolGradeList = []
    let options: Options = {
      url: this.urlService.masterURL.fetchSchoolGradeList,
      body: null
    }

    let schoolGradeList: any = await this.httpService.get(options);

    if (schoolGradeList && schoolGradeList.selectDropdownList) {
      this.schoolGradeList = schoolGradeList.selectDropdownList;
    }

    return this.schoolGradeList;
  } 


  async fetchAcademicYear(reload?:any) {

    if (!reload && this.acadamicYear != null) {
      return this.acadamicYear;
    }

    this.acadamicYear = []
    
    let options: Options = {
      url: this.urlService.organzationURL.fetchAcadamicYear,
      body: null
    }

    let acadamicYear: any = await this.httpService.get(options);

    if (acadamicYear && acadamicYear.dropDownList) {
      this.acadamicYear = acadamicYear.dropDownList;
    }

    return this.acadamicYear;
  }


  async fetchChaptherList(reload?:any) {

    let options:Options={
      url: this.urlService.organzationURL.fetchAllOrgnaztion,
      body: null
    }

    if(!reload && this.chapterList){
      return this.chapterList;
    }

    this.chapterList=[];
    let chapterList:any = await this.httpService.get(options);
    if(chapterList && chapterList.selectDropdownList){
      this.chapterList=chapterList.selectDropdownList;
      
    }
    return this.chapterList;
  }


  async fetchProgramsByAcademicYearAndChapterCode(year:any,chapterCode:any){

    let options:Options={
      url: this.urlService.organzationURL.fetchProgramCodesByChapterCodeAndAcacademicyear,
      body: {
        chapterCode:chapterCode,
        academicYear:year
      }
    }

   
    let chapterList:any = await this.httpService.post(options);
    if(chapterList && chapterList.selectDropdownList){
      return chapterList.selectDropdownList;
      
    }
    return this.chapterList;

  }

} 