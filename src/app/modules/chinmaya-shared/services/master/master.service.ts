import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';
import { ChapterCodeRequestInterface, ProgramRequestInterface, adultpersonListInterface, refreshGradeCode } from './master-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
  private vaccinationList: any;
  private gccSessionData: any;
  private getstateLists: any = null;
  private getGenderList: any = null;
  private relationshipPrimaryConList: any =null;
  private custodyList:any=null;
  private fetchYesorNo:any=null;
  private RelationshipListForChild:any=null;
  constructor(
    private httpService: HttpService,
    private urlService: UrlService,
    private http:HttpClient
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

  async fetchGenderList() {


    if (this.getGenderList != null) {
      return this.getGenderList;
    }

    this.getGenderList = []
    let options: Options = {
      url: this.urlService.masterURL.fetchGenderList,
      body: null
    }

    let getGenderList: any = await this.httpService.get(options);

    if (getGenderList && getGenderList.selectDropdownList) {
      this.getGenderList = getGenderList.selectDropdownList;
    }

    return this.getGenderList;

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

  async fetchstateList(){

    if (this.getstateLists != null) {
      return this.getstateLists;
    }

    this.getstateLists = []
    let options: Options = {
      url: this.urlService.masterURL.fetchRegistrationStatesList,
      body: null
    }

    let stateList: any = await this.httpService.get(options);

    if (stateList && stateList.selectDropdownList) {
      this.getstateLists = stateList.selectDropdownList;
    }

    return this.getstateLists;
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


  async fetchChaptherList(param:ChapterCodeRequestInterface,reload?:any) {

    let options:Options={
      url: this.urlService.organzationURL.fetchAllOrgnaztion,
      body: param
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


  async fetchProgramsByAcademicYearAndChapterCode(param:ProgramRequestInterface){

    let options:Options={
      url: this.urlService.organzationURL.fetchProgramCodesByChapterCodeAndAcacademicyear,
      body:param
    }

   
    let chapterList:any = await this.httpService.post(options);
    if(chapterList && chapterList.selectDropdownList){
      return chapterList.selectDropdownList;
      
    }
    return this.chapterList;

  }

  async fetchVaccinationList() {

    if (this.vaccinationList) {
      return this.vaccinationList
    }

    let options: Options = { body: null, url: "/master/fetchVaccinationList" };
    this.vaccinationList = await this.httpService.get(options);
    return this.vaccinationList;

  }

  fetchTShirtSizeList(): any {
    let options: Options = { body: null, url: "/master/fetchTShirtSizeList" };
    return this.httpService.get(options);

  }

  
  // getdataPersontype(): any {
  //   let options: Options = { body: null, url:"master/fetchPersonTypeList" };
  //   return this.httpService.get(options);

  // }
  // fetchData(): any {
  //   return this.httpService.get('https://nonregqa.cmwrcregistration.org/MR/master/fetchPersonTypeList');
  // }

  async fetchgccSessionData() {

    if (this.gccSessionData) {
      return this.gccSessionData
    }

    let options: Options = { body: null, url: "/master/fetchGCCSession" };
    this.gccSessionData = await this.httpService.get(options);
    return this.gccSessionData;

  }

  async fetchRelationshipPrimaryContactList() {

    if (this.relationshipPrimaryConList) {
      return this.relationshipPrimaryConList
    }

    let options: Options = { body: null, url: this.urlService.masterURL.fetchRelationshipPrimaryContactList };
    this.relationshipPrimaryConList = await this.httpService.get(options);
    return this.relationshipPrimaryConList;

  }

  async fetchCustodyList() {

    if (this.custodyList) {
      return this.custodyList
    }

    let options: Options = { body: null, url: this.urlService.masterURL.fetchCustodyList };
    this.custodyList = await this.httpService.get(options);
    return this.custodyList;

  }

  async fetchfetchYesorNo() {

    if (this.fetchYesorNo) {
      return this.fetchYesorNo
    }

    let options: Options = { body: null, url: this.urlService.masterURL.fetchYesorNo };
    this.fetchYesorNo = await this.httpService.get(options);
    return this.fetchYesorNo;

  }

  async fetchRelationshipListForChild() {

    if (this.RelationshipListForChild) {
      return this.RelationshipListForChild
    }

    let options: Options = { body: null, url: this.urlService.masterURL.fetchRelationshipPrimaryContactList };
    let RelationshipListForChild:any = await this.httpService.get(options);
    this.RelationshipListForChild = RelationshipListForChild.selectDropdownList
    return this.RelationshipListForChild;

  }

  async fetchAdultPersonList(param:adultpersonListInterface){

    let options:Options={
      url: this.urlService.masterURL.fetchAdultPersonsByFamilyId,
      body:param
    }

    let AdultPersonList:any = await this.httpService.post(options);
    return AdultPersonList;

  }

  FetchUpdatePersonData(param:any){
    return this.httpService.post({
      body: param,
      url: this.urlService.masterURL.fetchPersonByPersonId
    })
  }

  upload(URL:any, file:any, queryparam:any): Observable<any> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', file, file?.name);

    // Make http post request over api
    // with formData as req
    return this.http.post(`${environment.baseURL}`+URL+queryparam, formData);
  }

  downloadUploadFile(param:any){
    const headers = new HttpHeaders().set('Accept', '*/*');
    return this.http.get<Blob>(`${environment.baseURL}file/downloadFile`+param,{
      headers: headers,
      responseType: 'blob' as 'json'
    });
  }

  savePersonFamily(param:any, URL:any){
    let APIName= URL;
    return this.http.post<any>(`${environment.baseURL}`+APIName, param);
  }

  async fetchSchoolGradeLabel(body: any) {
    let options: Options = { body: body, url: "organization/fetchSchoolGradeLabel" };
    let data =  await this.httpService.post(options);
    return data;
  }


  async fetchRisingGradeLabel(body: any) {
    let options: Options = { body: body, url: "organization/fetchRisingGradeLabel" };
    let data =  await this.httpService.post(options);
    return data;
  }

  async callRefreshGrade(param:refreshGradeCode){

    let options:Options={
      url: this.urlService.masterURL.refreshGrade,
      body:param
    };

    let refreshCode:any = await this.httpService.post(options);
    
    return refreshCode;

  }
  
} 