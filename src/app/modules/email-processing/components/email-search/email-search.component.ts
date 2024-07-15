import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/modules/chinmaya-shared/services/master/master.service';
import { RegistrationService } from '../../../chinmaya-shared/services/registration-processing/registration.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ReportsService } from 'src/app/modules/chinmaya-shared/services/reports/reports.service';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';
import { signupCodeRequestInteface } from 'src/app/modules/chinmaya-shared/services/master/master-interface';
import { EmailProcessingServices } from 'src/app/modules/chinmaya-shared/services/email-processing/emailprocessing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-email-search',
  templateUrl: './email-search.component.html',
  styleUrls: ['./email-search.component.scss']
})
export class EmailSearchComponent{

 
  
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
  errorpaymentStatusListFlag:boolean=false;
  errorregistrationStatusListFlag:boolean=false;

  constructor(
    private masterService:MasterService,
    private fb:FormBuilder,
    private router:Router,
    private regiStrationService:RegistrationService,
    private store:StoreService,
    private emailproService:EmailProcessingServices
    ){
    
  }

  async ngOnInit(){

    this.store.onProgramUpdate().subscribe(async (program:any)=>{
      this.selectedProgram=program;
      await this.populateEmailData()
    });

    this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.selectedProgram = this.store.getValue(KEYS.program);
    this.loggedInUser = this.emailproService.getLoggedInUser();

   if(!this.selectedAcademicYear || !this.selectedChapterCode || !this.selectedProgram){
    return;
   }
   this.populateEmailData();
  
  }

  async populateEmailData(){

    this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.selectedProgram = this.store.getValue(KEYS.program);
    await this.fetchRegistrationStatusList();
    await this.fetchPaymentStatusList();
    await this.fetchSignupCodes();
    await this.fetchSessionChoice();
    await this.fetchSchoolGradeList();
    this.prepareEmailSearchCriteriaForm();
  }



  prepareEmailSearchCriteriaForm(){
    this.searchCriteriaForm = this.fb.group({
      requestPageModel: this.fb.group({
        page: [0],
        size: [100],
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
        homePhone: [''],
        email: [''],
        emailSent:[]
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
   
    this.loggedInUser = this.emailproService.getLoggedInUser();
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);

    let param:signupCodeRequestInteface = {
    organizationCode:this.selectedChapterCode,
    programCode:this.selectedProgram.code,
    userName:this.loggedInUser.username
    }

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
      programCode:this.selectedProgram.code
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

  paymentStatusListCheck(eve:any){
    let searchFormValuesCheck:any = JSON.parse(JSON.stringify(this.searchCriteriaForm.value))
     
    const selectedPaymentStatus = this.mapBooleanArrayToCodes(searchFormValuesCheck.requestRegistrationProcessingSearch.paymentStatusList,this.paymentStatus,"code");
    searchFormValuesCheck.requestRegistrationProcessingSearch.paymentStatusList = selectedPaymentStatus;

    if(searchFormValuesCheck.requestRegistrationProcessingSearch.paymentStatusList.length==0){
      this.errorpaymentStatusListFlag=true;
      this.MessageofpayError='Payment Status field is required.'
     }else{
      this.errorpaymentStatusListFlag=false;
      this.MessageofpayError='';
    }
    
  }

  regiStatusListCheck(eve:any){

    let searchFormValuesregiCheck:any = JSON.parse(JSON.stringify(this.searchCriteriaForm.value))
    const selectedCodes = this.mapBooleanArrayToCodes(searchFormValuesregiCheck.requestRegistrationProcessingSearch.registrationStatusList,this.registrationStatus,"code");
    searchFormValuesregiCheck.requestRegistrationProcessingSearch.registrationStatusList = selectedCodes;
  
    if(searchFormValuesregiCheck.requestRegistrationProcessingSearch.registrationStatusList.length==0){
      this.errorregistrationStatusListFlag=true;
      this.MessageofRegiError='Registration Status field is required.'
     }else{
      this.errorregistrationStatusListFlag=false;
      this.MessageofRegiError=''
     }
  }

  checkPaymentStatus(formVal:any, fieldName:any){
    let flag=false;
   formVal.requestRegistrationProcessingSearch[fieldName].filter((item:any)=>{
     if(item!=false){
       flag =true;
     }
   });

   return (flag ? true : false);
 }

 validateRequire(formVal:any){
    if(formVal.requestRegistrationProcessingSearch.choiceLabel!='' || formVal.requestRegistrationProcessingSearch.choiceCode!='' || formVal.requestRegistrationProcessingSearch.signupCode!=''
    || formVal.requestRegistrationProcessingSearch.className!='' || formVal.requestRegistrationProcessingSearch.currentSchoolGrade!=''  || formVal.requestRegistrationProcessingSearch.risingSchoolGrade!='' 
    || formVal.requestRegistrationProcessingSearch.familyID!='' || formVal.requestRegistrationProcessingSearch.firstName!='' || formVal.requestRegistrationProcessingSearch.lastName!=''
    || formVal.requestRegistrationProcessingSearch.homePhone!='' || formVal.requestRegistrationProcessingSearch.email!='' || this.checkPaymentStatus(formVal,'paymentStatusList') 
    || this.checkPaymentStatus(formVal, 'registrationStatusList') || this.checkPaymentStatus(formVal, 'assignedSessionList')){
       return true;
    }
   return false
 }


  MessageofpayError:string='';
  MessageofRegiError:string='';
  onSubmitSearch(){
    this.errorpaymentStatusListFlag=false;
    this.errorregistrationStatusListFlag=false;
   let searchFormValues:any = JSON.parse(JSON.stringify(this.searchCriteriaForm.value))
   if(this.validateRequire(searchFormValues)){
   const selectedCodes = this.mapBooleanArrayToCodes(searchFormValues.requestRegistrationProcessingSearch.registrationStatusList,this.registrationStatus,"code");
   searchFormValues.requestRegistrationProcessingSearch.registrationStatusList = selectedCodes;

   const selectedPaymentStatus = this.mapBooleanArrayToCodes(searchFormValues.requestRegistrationProcessingSearch.paymentStatusList,this.paymentStatus,"code");
   searchFormValues.requestRegistrationProcessingSearch.paymentStatusList = selectedPaymentStatus;

   const assignedSession = this.mapBooleanArrayToCodes(searchFormValues.requestRegistrationProcessingSearch.assignedSessionList,this.sessionChoice,"choicecode");
   searchFormValues.requestRegistrationProcessingSearch.assignedSessionList = assignedSession;
   
   //if(searchFormValues.requestRegistrationProcessingSearch.paymentStatusList.length>0 && searchFormValues.requestRegistrationProcessingSearch.registrationStatusList.length>0){
    this.emailproService.setEmailSearchCriteria(searchFormValues);
   this.router.navigateByUrl("/email-processing/email-search-results");
   }else{
    Swal.fire({
      // position: 'top-end',
       icon: 'error',
       title:'Required any one of the search criteria.',
       showConfirmButton: true,
       //timer: 1500
     });
  }
   //}
  //  else{
  //    if(searchFormValues.requestRegistrationProcessingSearch.paymentStatusList.length==0){
  //     this.errorpaymentStatusListFlag=true;
  //     this.MessageofpayError='Payment Status field is required.'
  //    }
  //    if(searchFormValues.requestRegistrationProcessingSearch.registrationStatusList.length==0){
  //     this.errorregistrationStatusListFlag=true;
  //     this.MessageofRegiError='Registration Status field is required.'
  //    }

  //  }
   

  }



  mapBooleanArrayToCodes(booleanArray: boolean[],codesArray: any[],key:string): string[] {
    
    return booleanArray
      .map((value, index) => (value ? codesArray[index][key] : null))
      .filter(Boolean);
  }
  
 

   
  }


  