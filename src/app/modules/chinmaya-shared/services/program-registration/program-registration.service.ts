import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';
import { AlertService } from '../alert/alert.service';
import { MasterService } from '../master/master.service';
import { RegistrationService } from '../registration-processing/registration.service';
import { FamilyService } from '../family/family.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramRegistrationService {
  
  selectedProgram: any;
  
  
  

  constructor(private urlService:UrlService,
    private httpService:HttpService,
    private alertService:AlertService,
    private masterService:MasterService,
    private registrationService:RegistrationService,
    private familyService:FamilyService,
    
  ) { }


  getSelectedFamily(): any {
    return this.familyService.getSelectedFamily();
  }

  setSelectedProgram(selectedProgram: any) {
    this.selectedProgram=selectedProgram;
  }

  getSelectedProgram() {
    return  this.selectedProgram;
  }

  async fetchRisingGradeLabel(param: any){
    let response: any = await this.masterService.fetchRisingGradeLabel(param);
    return response;
  }


  async fetchDashboardProgramCodes(params:any){

    var options:Options = {
      url: this.urlService.programSelection.fetchDashboardProgramCodes,
      body: params
    }
    let response: any = await this.httpService.post(options);
    return response;
  }


  async validateCertification(params:any){

    var options:Options = {
      url: this.urlService.programSelection.validateCertification,
      body: params,
      returnError:true
    }
    let response = null
    try {
      let response: any = await this.httpService.post(options);
      return true;
      // Handle successful response here
    } catch (e:any) {
      // Handle error here
      if (e?.error?.code === 'BusinessExceptionReason' && e?.error?.status === 400 &&
         e?.error.message=="Family certification does not exists for this program"
      ) {
        return false; 
      }
      else{
        this.alertService.showErrorALert(e.error.message);
      }

    }
  }

  async fetchPrimaryContactByFamilyId(params:any){
    let response = await this.registrationService.fetchPrimaryContactByFamilyId(params);
    return response;
    
  }


  async fetchSchoolGradeList() {
    let response = await this.masterService.fetchSchoolGradeList();
    return response;
  }


  async getStatesList() {
    let response = await this.masterService.fetchstateList();
    return response;
  }

  async saveFamilyCertification(params:any){
    var options:Options = {
      url: this.urlService.programSelection.saveFamilyCertification,
      body: params
    }
    let response: any = await this.httpService.post(options);
    return response;
  }
}
