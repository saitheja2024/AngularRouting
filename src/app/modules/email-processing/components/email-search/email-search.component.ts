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
@Component({
  selector: 'app-email-search',
  templateUrl: './email-search.component.html',
  styleUrls: ['./email-search.component.scss']
})
export class EmailSearchComponent{

  searchCriteriaForm:FormGroup;
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
  emailSearchResult:any;
  get EP(): { [key: string]: AbstractControl } {
    return this.searchCriteriaForm.controls;
  }



  constructor(
    private masterService:MasterService,
    private fb:FormBuilder,
    private router:Router,
    private regiStrationService:RegistrationService,
    private store:StoreService,
    private EmailProServices:EmailProcessingServices
    ){
      this.searchCriteriaForm = this.fb.group({
        requestPageModel: this.fb.group({
          page: [0],
          size: [0],
          sortFieldName: [''],
          sortOrder: ['']                                                   
        }),
        requestRegistrationProcessingSearch: this.fb.group({
          chapterID: new FormControl('CSVA'),
          programCode: new FormControl('CS_BALAVIHAR_2024-25'),
          registrationStatusList:this.fb.array(['PENDING']),
          paymentStatusList:this.fb.array(['BALANCE_DUE', 'PAID']),
          choiceLabel: new FormControl(''),
          choiceCode: new FormControl(''),
          assignedSessionList:this.fb.array(['']),
          signupCode: new FormControl(''),
          className: new FormControl(''),
          currentSchoolGrade:new FormControl(''),
          risingSchoolGrade: new FormControl(''),
          familyID: new FormControl(''),
          firstName:new FormControl(''),
          lastName: new FormControl(''),
          homePhone: new FormControl('')
        })
      });
  }

  async ngOnInit(){

   

    this.store.onProgramUpdate().subscribe(async (program:any)=>{
      this.selectedProgram=program;
    })

    this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.selectedProgram = this.store.getValue(KEYS.program);
    this.loggedInUser = this.regiStrationService.getLoggedInUser();

  
   this.fetchRegistrationStatusList();
   this.fetchsessionChoice();
   this.fecthClassList();
   this.fetchSchoolGradeList();
   this.fetchSignupcodes();
   this.fetchPaymentStatusList();
  }

  
  async fetchPaymentStatusList(){
    this.paymentStatus=await this.EmailProServices.PaymentStatusList()
  }

  async fetchRegistrationStatusList() {
    this.registrationStatus= await this.EmailProServices.RegistrationStatusList();
  }

  async fetchsessionChoice(){
   
    let params:any = {
      programCode:"CS_BALAVIHAR_2024-25" //this.selectedProgram.code
    }
    this.sessionChoice= await this.EmailProServices.SessionChoicesList(params);
  }

  async fecthClassList(){
    let classParam = {
      programCode: "CS_BALAVIHAR_2024-25",
      chapterCode: "CSVA",
      signupCodeCategory: 0,
      signupCode: "",
      classCode: "",
      subClassCode: ""
    }
    this.classList = await this.EmailProServices.ClassDropdown(classParam);
  }

  async fetchSchoolGradeList(){
    this.schoolGrade = await this.EmailProServices.SchoolGradeList() 
  }

  async fetchSignupcodes(){
    let codeParam = {
        organizationCode: "",
        programCode: "CS_BALAVIHAR_2024-25",
        userName: "ip1"
    }
    this.signupCodes = await this.EmailProServices.Signupcodes(codeParam) 
  }

  onSubmitSearch(){
    let searchFormValues:any = JSON.parse(JSON.stringify(this.searchCriteriaForm.value))
   this.emailSearchResult = this.EmailProServices.RegistrationDetailsBasedOnSearch(searchFormValues);
   this.EmailProServices.setEmailSearchCriteria(searchFormValues);
    this.router.navigateByUrl("/email-processing/email-search-results")

  }

   
  }


  