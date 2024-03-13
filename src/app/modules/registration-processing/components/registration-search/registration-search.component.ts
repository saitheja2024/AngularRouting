import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/modules/chinmaya-shared/services/master/master.service';
import { RegistrationService } from '../../../chinmaya-shared/services/registration-processing/registration.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ReportsService } from 'src/app/modules/chinmaya-shared/services/reports/reports.service';

@Component({
  selector: 'app-registration-search',
  templateUrl: './registration-search.component.html',
  styleUrls: ['./registration-search.component.scss']
})
export class RegistrationSearchComponent implements OnInit {
  
  
  searchCriteriaForm:any
  registrationStatus: any;
  paymentStatus: any;
  signupCodes: any;
  classList: any;
  sessionChoice: any;
  schoolGrade: any;

  constructor(
    private masterService:MasterService,
    private fb:FormBuilder,
    private router:Router,
    private regiStrationService:RegistrationService,
    ){
    
  }

  async ngOnInit(){


    
    await this.fetchRegistrationStatusList();
    await this.fetchPaymentStatusList();
    await this.fetchSignupCodes();
    await this.fetchSessionChoice();
    await this.fetchSchoolGradeList();
    //this.fetchSessionChoicesList();
    this.prepareSearchCriteriaForm();

  }


  
  

  prepareSearchCriteriaForm(){
    this.searchCriteriaForm = this.fb.group({
      requestPageModel: this.fb.group({
        page: [0],
        size: [0],
        sortFieldName: [''],
        sortOrder: ['']
      }),
      requestRegistrationProcessingSearch: this.fb.group({
        chapterID: ['CSVA'],
        programCode: ['CS_BALAVIHAR_2023-24'],
        registrationStatusList: this.fb.array([]),
        paymentStatusList: this.fb.array([]),
        choiceLabel: [''],
        choiceCode: [''],
        assignedSession: [''],
        signupCode: [''],
        className: [''],
        currentSchoolGrade: [''],
        risingSchoolGrade: [''],
        familyID: [""],
        firstName: [''],
        lastName: [''],
        homePhone: ['']
      })
    });

    for(let i=0;i<this.registrationStatus.length;i++){
      this.registrationStatusArray.push(new FormControl(false));
    }


    for(let i=0;i<this.paymentStatus.length;i++){
      this.paymentStatusArray.push(new FormControl(false));
    }

  }

  


  get registrationStatusArray(): FormArray {
    let retValue = this.searchCriteriaForm?.controls?.requestRegistrationProcessingSearch?.controls?.registrationStatusList as FormArray;
    return retValue;
  }
 

  get paymentStatusArray(): FormArray {
    let retValue = this.searchCriteriaForm?.controls?.requestRegistrationProcessingSearch?.controls?.paymentStatusList as FormArray;
    return retValue;
  }


  async fetchRegistrationStatusList() {
    this.registrationStatus=await this.masterService.fetchRegistrationStatusList()
  }

  async fetchPaymentStatusList(){
    this.paymentStatus=await this.masterService.fetchPaymentStatusList()
  }

  async fetchSignupCodes(){
    this.signupCodes = await this.regiStrationService.fetchSignupCodes("CSVA","CS_BALAVIHAR_2023-24");
  }



  async fecthClassList(params:any){
    this.classList = await this.regiStrationService.fetchClassList(params);
  }

  async fetchSchoolGradeList(){
    this.schoolGrade = await this.regiStrationService.fetchSchoolGradeList() 
  }

  async fetchSessionChoice(){
    let params = {
      "programCode": "CS_BALAVIHAR_2023-24"
    }
    this.sessionChoice = await this.regiStrationService.fetchSessionChoice(params);
  }

  onSignupCodeChange(ev:any){
    let params={
      "programCode": "CS_BALAVIHAR_2023-24",
      "chapterCode": "CSVA",
      "signupCode": ev.target.value,
    }
    this.fecthClassList(params);
  }


  onSearchButtonClick(){
   let searchFormValues:any = JSON.parse(JSON.stringify(this.searchCriteriaForm.value))
   const selectedCodes = this.mapBooleanArrayToCodes(searchFormValues.requestRegistrationProcessingSearch.registrationStatusList,this.registrationStatus);
   searchFormValues.requestRegistrationProcessingSearch.registrationStatusList = selectedCodes;

   const selectedPaymentStatus = this.mapBooleanArrayToCodes(searchFormValues.requestRegistrationProcessingSearch.paymentStatusList,this.paymentStatus);
   searchFormValues.requestRegistrationProcessingSearch.paymentStatusList = selectedPaymentStatus;

   this.regiStrationService.setSearchCriteria(searchFormValues);
   this.router.navigateByUrl("/registration-processing/registration-search-results")

  }



  mapBooleanArrayToCodes(booleanArray: boolean[],codesArray: any[]): string[] {
    
    return booleanArray
      .map((value, index) => (value ? codesArray[index].code : null))
      .filter(Boolean);
  }
  
 

}
