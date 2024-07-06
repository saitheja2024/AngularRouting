import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProgramRequestInterface } from 'src/app/modules/chinmaya-shared/services/master/master-interface';
import { MasterService } from 'src/app/modules/chinmaya-shared/services/master/master.service';
import { RegistratioReviewService } from 'src/app/modules/chinmaya-shared/services/registration-review/registration-review.service';
import { StoreService, KEYS } from 'src/app/modules/chinmaya-shared/services/store/store.service';

@Component({
  selector: 'app-subclass-assign-search',
  templateUrl: './subclass-assign-search.component.html',
  styleUrls: ['./subclass-assign-search.component.scss']
})

export class SubclassAssignSearchComponent {

  selectedProgram: any;
  selectedAcademicYear: any;
  selectedChapterCode: any;
  loggedInUser: any;
  registrationStatus: any;
  paymentStatus: any;
  signupCodes: any[];
  classList: any[];
  schoolGrade: any;
  sessionChoice: any[];
  searchCriteriaForm: any;
  programs: any;

  constructor(
    private masterService:MasterService,
    private fb:FormBuilder,
    private router:Router,
    private regiStrationReviewService:RegistratioReviewService,
    private store:StoreService
    ){
     
  }


  async ngOnInit(){
    
    this.loggedInUser = this.regiStrationReviewService.getLoggedInUser();

    this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    await this.fetchProgramsByAcademicYearAndChapterCode();
   
    // if(this.programs && this.programs.length>0){
    //   this.selectedProgram=this.programs[0]
    // }
    // await this.populateData();
    this.prepareSearchCriteriaForm();

  }

  async populateData(){

   
    await this.fetchRegistrationStatusList();
    await this.fetchPaymentStatusList();
    await this.fetchSignupCodes();
    //await this.fetchSessionChoice();
    await this.fetchSchoolGradeList();
    this.prepareSearchCriteriaForm();
    

  }

  async onProgramSelection(ev:any){
    this.selectedProgram={
      code:ev.target.value}
    await this.populateData();
  }


  async fetchProgramsByAcademicYearAndChapterCode(){
    this.programs=[];
    if(!this.selectedAcademicYear || !this.selectedChapterCode){
      return ;
    }

    let params:ProgramRequestInterface={
      chapterCode:this.selectedChapterCode,
      academicYear:this.selectedAcademicYear,
      userName:this.loggedInUser.username
    }

    this.programs = await this.masterService.fetchProgramsByAcademicYearAndChapterCode(params)

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
    this.loggedInUser = this.regiStrationReviewService.getLoggedInUser();
    let param:any = {
    organizationCode:this.selectedChapterCode,
    programCode:this.selectedProgram.code,
    userName:this.loggedInUser.username
    }

    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.signupCodes = await this.regiStrationReviewService.fetchSignupCodes(param);
  }



  async fecthClassList(params:any){
    this.classList = await this.regiStrationReviewService.fetchClassList(params);
  }

  async fetchSchoolGradeList(){
    this.schoolGrade = await this.regiStrationReviewService.fetchSchoolGradeList() 
  }

  async fetchSessionChoice(params:any){
    this.sessionChoice = await this.regiStrationReviewService.fetchSessionChoicesDropdown(params);
    this.assignedSessionArray.clear();
    for(let i=0;i<this.sessionChoice?.length;i++){
      this.assignedSessionArray.push(new FormControl(false));
    }
  }

  async onSignupCodeChange(ev:any){
    let params={
      "programCode": this.selectedProgram.code,
      "chapterCode": this.selectedChapterCode,
      "signupCode": ev.target.value,
    }
    await this.fecthClassList(params);
    await this.fetchSessionChoice(params);
  }

  prepareSearchCriteriaForm(){
    this.searchCriteriaForm = this.fb.group({
      requestPageModel: this.fb.group({
        page: [0],
        size: [10],
        sortFieldName: [''],
        sortOrder: ['']
      }),
      requestRegistrationProcessingSearch: this.fb.group({
        chapterID: [this.selectedChapterCode],
        programCode: ['',[Validators.required]],
        registrationStatusList: this.fb.array([],[Validators.required]),
        paymentStatusList: this.fb.array([],[Validators.required]),
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
        paymentStartDate: [''],
        paymentEndDate: ['']
      })
    });

    for(let i=0;i<this.registrationStatus?.length;i++){
      this.registrationStatusArray.push(new FormControl(false));
    }


    for(let i=0;i<this.paymentStatus?.length;i++){
      this.paymentStatusArray.push(new FormControl(false));
    }

    for(let i=0;i<this.sessionChoice?.length;i++){
      this.assignedSessionArray.push(new FormControl(false));
    }

    if(this.selectedProgram?.code){
      this.searchCriteriaForm.get("requestRegistrationProcessingSearch").get("programCode").setValue(this.selectedProgram.code);
    }

  }

  registrationStatusSelected(){

    let retValue=true;
    for(let i=0;i<this.searchCriteriaForm.requestRegistrationProcessingSearch?.registrationStatusList?.length;i++){
      let val= this.searchCriteriaForm.requestRegistrationProcessingSearch.registrationStatusList[i]
      if(val){
        retValue=false;
      }
    }
    return retValue;
  }
  

  get registrationStatusArray(): any {
    let retValue = this.searchCriteriaForm?.controls?.requestRegistrationProcessingSearch?.controls?.registrationStatusList ;
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


  getInvalidControls(form: FormGroup | FormArray): string[] {
    let invalidControls: string[] = [];
    Object.keys(form.controls).forEach(key => {
      const control:any = form.get(key);
      if (control instanceof FormGroup || control instanceof FormArray) {
        invalidControls = invalidControls.concat(this.getInvalidControls(control));
      } else if (control.invalid) {
        invalidControls.push(key);
      }
    });
    return invalidControls;
  }

  async onSearchButtonClick(){

    const invalidControls = this.getInvalidControls(this.searchCriteriaForm);
    // console.log('Invalid controls:', invalidControls);
    //   return

    let searchFormValues = this.searchCriteriaForm.value;
    const selectedCodes = this.mapBooleanArrayToCodes(searchFormValues.requestRegistrationProcessingSearch.registrationStatusList,this.registrationStatus,"code");
    searchFormValues.requestRegistrationProcessingSearch.registrationStatusList = selectedCodes;
 
    const selectedPaymentStatus = this.mapBooleanArrayToCodes(searchFormValues.requestRegistrationProcessingSearch.paymentStatusList,this.paymentStatus,"code");
    searchFormValues.requestRegistrationProcessingSearch.paymentStatusList = selectedPaymentStatus;
 
    const assignedSession = this.mapBooleanArrayToCodes(searchFormValues.requestRegistrationProcessingSearch.assignedSessionList,this.sessionChoice,"choicecode");
    searchFormValues.requestRegistrationProcessingSearch.assignedSessionList = assignedSession;
     searchFormValues.programCode=this.selectedProgram.code; 
    this.regiStrationReviewService.setSearchCriteria(searchFormValues);
    
   
    this.router.navigateByUrl("/sub-class-assignment/subclass-assign-search-results")
   }

   mapBooleanArrayToCodes(booleanArray: boolean[],codesArray: any[],key:string): string[] {
    
    return booleanArray
      .map((value, index) => (value ? codesArray[index][key] : null))
      .filter(Boolean);
  }

}
