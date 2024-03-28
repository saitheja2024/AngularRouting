import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/modules/chinmaya-shared/services/master/master.service';
import { RegistrationService } from '../../../chinmaya-shared/services/registration-processing/registration.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ReportsService } from 'src/app/modules/chinmaya-shared/services/reports/reports.service';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';
import { signupCodeRequestInteface } from 'src/app/modules/chinmaya-shared/services/master/master-interface';

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
  selectedAcademicYear: any;
  selectedChapterCode: any;
  selectedProgram: any;
  loggedInUser: any;

  constructor(
    private masterService:MasterService,
    private fb:FormBuilder,
    private router:Router,
    private regiStrationService:RegistrationService,
    private store:StoreService
    ){
    
  }

  async ngOnInit(){

    this.store.onProgramUpdate().subscribe(async (program:any)=>{
      this.selectedProgram=program;
      await this.populateData()
    })

    this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.selectedProgram = this.store.getValue(KEYS.program);
    this.loggedInUser = this.regiStrationService.getLoggedInUser();

   if(!this.selectedAcademicYear || !this.selectedChapterCode || !this.selectedProgram){
    return;
   }
   this.populateData();
    
   
    //this.fetchSessionChoicesList();
   

  }

  async populateData(){

    this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.selectedProgram = this.store.getValue(KEYS.program);
    await this.fetchRegistrationStatusList();
    await this.fetchPaymentStatusList();
    await this.fetchSignupCodes();
    await this.fetchSessionChoice();
    await this.fetchSchoolGradeList();
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
        chapterID: [this.selectedChapterCode],
        programCode: [this.selectedProgram.code],
        registrationStatusList: this.fb.array([]),
        paymentStatusList: this.fb.array([]),
        choiceLabel: [''],
        choiceCode: [''],
        assignedSessionList: this.fb.array([]),
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

    for(let i=0;i<this.sessionChoice.length;i++){
      this.assignedSessionArray.push(new FormControl(false));
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

  get assignedSessionArray(): FormArray {
    let retValue = this.searchCriteriaForm?.controls?.requestRegistrationProcessingSearch?.controls?.assignedSessionList as FormArray;
    return retValue;
  }


  async fetchRegistrationStatusList() {
    this.registrationStatus=await this.masterService.fetchRegistrationStatusList()
  }

  async fetchPaymentStatusList(){
    this.paymentStatus=await this.masterService.fetchPaymentStatusList()
  }

  async fetchSignupCodes(){
    // if(!this.selectedChapterCode || !this.selectedProgram){
    //   this.signupCodes=[];
    //   return;
    // }

    let param:signupCodeRequestInteface = {
    organizationCode:this.selectedChapterCode,
    programCode:this.selectedProgram.code,
    userName:this.loggedInUser.username
    }

    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.signupCodes = await this.regiStrationService.fetchSignupCodes(param);
  }



  async fecthClassList(params:any){
    this.classList = await this.regiStrationService.fetchClassList(params);
  }

  async fetchSchoolGradeList(){
    this.schoolGrade = await this.regiStrationService.fetchSchoolGradeList() 
  }

  async fetchSessionChoice(){
    let params = {
      "programCode":this.selectedProgram.code
    }
    this.sessionChoice = await this.regiStrationService.fetchSessionChoice(params);
  }

  onSignupCodeChange(ev:any){
    let params={
      "programCode": this.selectedProgram.code,
      "chapterCode": this.selectedChapterCode,
      "signupCode": ev.target.value,
    }
    this.fecthClassList(params);
  }


  onSearchButtonClick(){
   let searchFormValues:any = JSON.parse(JSON.stringify(this.searchCriteriaForm.value))
   const selectedCodes = this.mapBooleanArrayToCodes(searchFormValues.requestRegistrationProcessingSearch.registrationStatusList,this.registrationStatus,"code");
   searchFormValues.requestRegistrationProcessingSearch.registrationStatusList = selectedCodes;

   const selectedPaymentStatus = this.mapBooleanArrayToCodes(searchFormValues.requestRegistrationProcessingSearch.paymentStatusList,this.paymentStatus,"code");
   searchFormValues.requestRegistrationProcessingSearch.paymentStatusList = selectedPaymentStatus;

   const assignedSession = this.mapBooleanArrayToCodes(searchFormValues.requestRegistrationProcessingSearch.assignedSessionList,this.sessionChoice,"choicecode");
   searchFormValues.requestRegistrationProcessingSearch.assignedSessionList = assignedSession;

   this.regiStrationService.setSearchCriteria(searchFormValues);
   this.router.navigateByUrl("/registration-processing/registration-search-results")

  }



  mapBooleanArrayToCodes(booleanArray: boolean[],codesArray: any[],key:string): string[] {
    
    return booleanArray
      .map((value, index) => (value ? codesArray[index][key] : null))
      .filter(Boolean);
  }
  
 

}
