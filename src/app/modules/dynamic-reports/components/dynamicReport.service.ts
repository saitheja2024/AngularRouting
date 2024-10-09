import { Injectable } from '@angular/core';
import {
  HttpService,
  Options,
} from '../../chinmaya-shared/services/https-service/http-service';
import { UrlService } from '../../chinmaya-shared/services/url/url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { param } from 'jquery';
@Injectable({
  providedIn: 'root',
})
export class DynamicReportService {
  constructor(
    private httpService: HttpService,
    private urlService: UrlService,
    private http: HttpClient
  ) {}

  async fetchCategoryList() {
    let options: Options = {
      url: this.urlService.reports.fetchCategoryList,
      body: '',
    };
    let categoryList: any = await this.httpService.get(options);
    if (categoryList && categoryList.dropDownList) {
      categoryList = categoryList.dropDownList;
    }
    return categoryList;
  }

  async fetchSubCategoryList(parameters: any) {
    let options: Options = {
      url: this.urlService.reports.fetchSubCategoryListByCategory,
      body: parameters,
    };
    let subCategoryList: any = await this.httpService.post(options);
    if (subCategoryList && subCategoryList.dropDownList) {
      subCategoryList = subCategoryList.dropDownList;
    }
    return subCategoryList;
  }

  async fetchReportListByCategoryAndSubCategory(parameters: any) {
    let options: Options = {
      url: this.urlService.reports.fetchReportListByCategoryAndSubCategory,
      body: parameters,
    };
    let ReportList: any = await this.httpService.post(options);

    if (ReportList && ReportList.reportList) {
      ReportList = ReportList.reportList;
    }

    return ReportList;
  }

  async fetchReportFilterListByReportId(parameters: any) {
    let options: Options = {
      url: this.urlService.reports.fetchReportFilterListByReportId,
      body: parameters,
    };
    let reportFilterList: any = await this.httpService.post(options);
    if(reportFilterList && reportFilterList.reportFilterResponseList){
      reportFilterList = reportFilterList.reportFilterResponseList;
    }
    return reportFilterList;
  }

  // fteching dropdownlistApi


  async fetchChapterLists() {
    let options: Options = {
      url: this.urlService.organization.fetchChaptersList,
      body: '',
    };

    let chapterList: any = await this.httpService.get(options);
    if (chapterList && chapterList.selectDropdownList) {
      chapterList = chapterList.selectDropdownList;
    }
    return chapterList;
  }
  //  for fetching programCode
  async fetchProgramCode(parameter: any) {
    let options: Options = {
      url: this.urlService.programConfig.fetchProgramCodesByChapterCode,
      body: parameter,
    };
    let programCode: any = await this.httpService.post(options);
    if (programCode && programCode.selectDropdownList) {
      programCode = programCode.selectDropdownList;
    }
    return programCode;
  }

  // for fetching  signupCode

  async fetchSignUpCode(parameter: any) {
    let options: Options = {
      url: this.urlService.program.getSignUpCodesByProgram,
      body: parameter,
    };
    let SignUpCode: any = await this.httpService.post(options);
    // console.log('this is inside servicefile');
    // console.log(JSON.stringify(SignUpCode.signupCodeList));
    if (SignUpCode && SignUpCode.signupCodeList) {
      SignUpCode = SignUpCode.signupCodeList;
    }
    return SignUpCode;
  }

  async fetchClassCode(parameters:any){
    let options:Options={
      url:this.urlService.reports.fetchClassList,
      body:parameters,
    }
    let classCode:any= await this.httpService.post(options);
    console.log("the class code is shown below");
    console.log(classCode);
    if(classCode && classCode.selectDropdownList){
      classCode = classCode.selectDropdownList;
    }
    return classCode;
  }

  async fetchSubClassCode(parameters:any){
    let options:Options = {
      url:this.urlService.registrationReviewURL.fetchSubClassDetails,
      body:parameters,
    }
    let subClassCode:any = await this.httpService.post(options);
    console.log("the sub class code is shown below ");
    console.log(subClassCode);
    if(subClassCode && subClassCode.selectDropdownList){
      subClassCode = subClassCode.selectDropdownList;
    }
    return subClassCode
  }

  async  fetchSessionCode(parameters:any){
    let options:Options={
      url:this.urlService.reports.fetchSessionChoiceDropDown,
      body:parameters,
    }
    let sessionCode:any= await this.httpService.post(options);
    console.log("the session code is shown below");
    console.log(sessionCode);
    if(sessionCode && sessionCode.selectDropdownList){
      sessionCode = sessionCode.selectDropdownList;
    }
    return sessionCode;
  }

  async  saveReportShedules(parameters:any){
    console.log("this is inside service file THE SAVE REPORT LIST API PARAMETERS ARE "+JSON.stringify(parameters));

  let options:Options={
    url:this.urlService.reports.saveReportSchedule,
    body:parameters,
  }
  let savesheduleReports:any= await this.httpService.post(options);
  console.log("the session code is shown below");
  console.log(savesheduleReports);
  if(savesheduleReports && savesheduleReports.selectDropdownList){
    savesheduleReports = savesheduleReports.selectDropdownList;
  }
  return savesheduleReports;
}

async fetchReportShedules(parameters:any){

  let options:Options={
    url:this.urlService.reports.fetchReportScheduleList,
    body:parameters,
  }
  let sheduleReports:any= await this.httpService.post(options);
  console.log("the session code is shown below");
  console.log(sheduleReports);
  if(sheduleReports && sheduleReports.responseReportScheduleList){
    sheduleReports = sheduleReports.responseReportScheduleList;
  }
  return sheduleReports;
}


async edirReportShedules(parameters:any){
  let options:Options={
    url:this.urlService.reports.fetchReportScheduleById,
    body:parameters,
  }
  let editReportShedule:any= await this.httpService.post(options);
  // console.log("the edit report shedules shown below");
  // console.log(editReportShedule);
  // if(editReportShedule && editReportShedule.responseReportScheduleList){
  //   editReportShedule = editReportShedule.responseReportScheduleList;
  // }
  return editReportShedule;
}
}
