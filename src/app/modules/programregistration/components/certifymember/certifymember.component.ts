import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { phoneNumberValidator } from 'src/app/Validators/custom-validators';
import { formatPhoneNumber } from 'src/app/utils/util';
import * as moment from 'moment';
import { ProgramRegistrationService } from 'src/app/modules/chinmaya-shared/services/program-registration/program-registration.service';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';

@Component({
  selector: 'app-certifymember',
  templateUrl: './certifymember.component.html',
  styleUrls: ['./certifymember.component.scss']
})
export class CertifymemberComponent {
  currentUser:any= JSON.parse(sessionStorage.getItem('profileData') || '');
  firstName: string | null ='';
  lastName: string | null ='';
  middleName: string | null = '';
  familyId: any = '';
  primaryContactData: any;
  statesList: Array<any> = [];
  selectedState: string | null = null;
  selectedAdult: any;
  adultsList: Array<any> = [];
  childrenList: Array<any> = [];
  createlogin: boolean=false;
  boolVal: boolean = true;
  tshirtsList: Array<any> = [];
  personTypeList: Array<any> = [];
  schoolGradesList: Array<any> = [];
  primaryPersonId: any = '';
  programCode: string | null ='';
  code: string | null = '';
  arrayTime:any;
  yesorNo:any={
    true:true,
    false:false
  }
  primaryContactGroup: any;
  profiles:any; 
  zipFlagCheck:boolean=false;
  get CM(): { [key: string]: AbstractControl } {
    return this.primaryContactGroup?.controls;
  }
  memberFlag:boolean=false;

  constructor(private programRegistrationService: ProgramRegistrationService, 
    public fb: FormBuilder, private router: Router,
  private store:StoreService, private route: ActivatedRoute) { }

  async ngOnInit() {
    await this.fetchSchoolGradeList();

    
    let selectedProgram  = this.store.getValue(KEYS.program);
    this.programCode = selectedProgram.code;
    this.code = this.currentUser.chapter;
    
    this.route.params.subscribe(async params => {
      this.memberFlag = params['memberFlag']=="true"?true:false;
    });
    await this.getStatesList();
    await this.fetchRaisingSchooldGradeLabel();
    this.currentUser = this.programRegistrationService.getSelectedFamily();
    this.firstName = this.currentUser.firstName;
    this.lastName = this.currentUser.lastName;
    this.middleName = this.currentUser.middleName;
    this.familyId = this.currentUser.familyId;

    this.primaryPersonId = this.currentUser.personID;
    
    // var element:any = document.getElementById("add_active_cls");
    // element.classList.add("active");
   // this.getPersonsList();
    this.primaryContactGroup= this.fb.group({
        firstName: [this.firstName],
        lastName: [this.lastName],
        middleName: [this.middleName],
        familyID: [parseInt(this.familyId), Validators.required],
       homePhone: [null, [Validators.required,phoneNumberValidator()]],
       phoneNumber: [null, [Validators.required,phoneNumberValidator()]],
       emailAddress: [null, [Validators.required, Validators.pattern(/.+@.+\..+/)]],
       //emailAddress: [null, [Validators.required]],
       address: [null, Validators.required],
        address2: [null],
        address3: [null],
        city: [null, Validators.required],
        state: [null, Validators.required],
       zipCode: [null, [Validators.required, Validators.pattern(/^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/)]],
        personID: [parseInt(this.primaryPersonId), Validators.required],
        //certifyDetails: [false, Validators.required],
        programCode:[],
        chapter:[],
        children: new FormArray([])
      })

     
      await this.getPrimaryContact();
  }

  tabOne:boolean=true;
  tabTwo:boolean=false;


  raisingSchGradeLabel:any;

async fetchRaisingSchooldGradeLabel(){
  let param = {
    code: this.code,
    programCategory: ''
  }

  this.raisingSchGradeLabel = await this.programRegistrationService.fetchRisingGradeLabel(param)
   
}

  proceedToNext(tab:any){
    let formVal = this.primaryContactGroup.value;
    if(tab=='tabTwo'){
      if(formVal.address !='' && formVal.state !='' && formVal.zipCode !='' && formVal.zipCode.length ==5 && formVal.city !='' && formVal.state !='' && formVal.homePhone !='' && formVal.phoneNumber !='' && formVal.emailAddress !=''){
        this.validateErrorFlag=false;
        this.tabTwo=true;
        this.tabOne=false;
      }else{
        this.tabOne=true;
        this.tabTwo=false;
        this.zipFlagCheck=true;
        this.primaryContactGroup.markAsTouched();
        this.validateErrorFlag=true;
      }
    }

  }

  backToPrevious(tab:any){
    this.tabOne=true;
        this.tabTwo=false;
  }

  // profileFormGroup: any

  async fetchSchoolGradeList(){
    this.schoolGradesList = await this.programRegistrationService.fetchSchoolGradeList();
  }

  isFormValid(){
    if(!this.primaryContactGroup){
      return false;
    }
    // if(this.primaryContactGroup.value.certifyDetails==true && this.primaryContactGroup.valid){
    //   return false;
    // }

    return true;
  }


 

  

  

  async getPrimaryContact() {
    const body = {
      familyId: this.familyId,
      programCode: this.programCode,
      chapterCode: this.code,
      paymentFlag: false
    }
    this.primaryContactData = await this.programRegistrationService.fetchPrimaryContactByFamilyId(body);
   // this.primaryContactData.certifyDetails=false;
    this.primaryContactData.programCode=this.programCode;
    this.primaryContactData.chapter=this.code;
    this.primaryContactData.homePhone = formatPhoneNumber(this.primaryContactData.homePhone);
    this.primaryContactData.phoneNumber = formatPhoneNumber(this.primaryContactData.phoneNumber);
    this.primaryContactGroup.patchValue(this.primaryContactData);

    this.profiles = this.primaryContactData;
    
    this.createProfileControls();


  }

  btnSubEnable:boolean=false;


  isNumberKey (event: any) {
    this.zipFlagCheck=true;
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  
  
  
  

 

  
  async getStatesList() {
      this.statesList = await this.programRegistrationService.getStatesList();
  }

  validateErrorFlag:boolean=false;
  saveAndNextButtonClicked:boolean=false;
  errorMsgList:any={};
  
  
  
  async submitCertify() {
    this.primaryContactGroup.markAsTouched();
    this.validateErrorFlag=false;
    this.saveAndNextButtonClicked=true;
    let flag=false;

    if(this.ProfGroupVal==undefined){
      flag=false;

    }else{
    for(var k=0; k<this.ProfGroupVal.value.length; k++){
      if(this.ProfGroupVal.value[k].schoolGradeCode=='' || this.ProfGroupVal.value[k].schoolGradeCode==null ){
        this.errorMsgList={
          [k]:true
        }
        flag=true;
        break;
      }
    }
  }
   if(!flag){
    this.errorMsgList={};
    let request:any = {
      user:this.primaryContactGroup.value,
      programCode:this.programCode,
     }
     request.personList=[];
     if(this.ProfGroupVal!=undefined){
    this.ProfGroupVal.value.filter( (item:any, index:any)=>{
     request.personList.push({
        personID: this.primaryContactData?.personsList[index].personID,
        schoolGradeCode: item.schoolGradeCode,
        risingSchoolGradeCode: item.risingSchoolGradeCode
      });
    })
  }

  if(!this.primaryContactGroup.invalid){
    await this.programRegistrationService.saveFamilyCertification(request);
    this.router.navigateByUrl("programregistration/family-reg-workflow/"+this.memberFlag);
    }else{
    this.validateErrorFlag=true;
  }
   }

  }
  
  ProfGroupVal:any;
 
  createProfileControls(){
    const childrenArray = this.primaryContactGroup.get('children') as FormArray;
    

    this.profiles.personsList.forEach((personData:any) => {
      const group = new FormGroup({
        dateOfBirth: new FormControl(personData.dateOfBirth,{validators:this.isFieldRequired('dateOfBirth',personData)}),
        firstName:new FormControl(personData.firstName),
        lastName:new FormControl(personData.lastName),
        schoolGradeCode:new FormControl(personData.schoolGradeCode,[this.isFieldRequired("schoolGrade",personData)]),
        risingSchoolGradeCode:new FormControl(personData.risingSchoolGradeCode?personData.risingSchoolGradeCode:""),
        risingSchoolGradeDescription:new FormControl(personData.risingSchoolGradeCode?this.getCurrentSchoolGrade(personData.risingSchoolGradeCode).description:""),
      });

      let controls:any = Object.keys(group.controls);
      let atleastOneFiledToShow=false;
       //if (personData.personTypeCode === 'CHILD') {
        // If we rcv child then we always need to push the data 
        // for school grade.
        atleastOneFiledToShow=true;
       
        if(atleastOneFiledToShow){
        childrenArray.push(group);
        }
      //}
     
      this.ProfGroupVal = this.primaryContactGroup.get('children');
      //group.patchValue(personData);
     // this.profileFormGroup.controls.children?.controls[0].controls['schoolGradeCode'].disable();
    });
  
  }

  isFieldRequired(field:any, personData: any):any{
    let returnValue = Validators.nullValidator;
   if (personData.personTypeCode === 'CHILD') {
      if(field=="schoolGrade"){
        returnValue=Validators.required;
      }    
    }

    return returnValue;

  }

  showError(group:any,field:any){
    const control = group.controls[field];

    if (control && (control.touched || this.saveAndNextButtonClicked) && control.errors) {
      const errors = control.errors;
      
      if (errors.required) {
        return `Please enter ${field}.`;
      }
      
      if (errors.minlength) {
        return `Invalid input`;
      }
      
      // Add more conditions for other types of validations
      
      // Return null if no matching validation error found
      return null;
    }
    
  
    return null;
  
  }

  onSchoolGradeChange(childGroup:any,ev:any){
    let code = ev.target.value;
    console.log(code);
    console.log(childGroup.get("risingSchoolGradeCode").value);

    childGroup.get("risingSchoolGradeCode").setValue("");
      childGroup.get("risingSchoolGradeDescription").setValue(null);
    if(code){
      let grade = this.getNextSchoolGrade(code);
      if (code == 17) {
        grade = this.getCurrentSchoolGrade(code);
      } else if (code == 18) {
        let dateOfBirth = childGroup.get("dateOfBirth").value;
        if (dateOfBirth != null) {
          console.log(dateOfBirth);

          const years = moment().diff(new Date(dateOfBirth), 'months');
          console.log(years);

          if (years < 36) {
            grade = this.getCurrentSchoolGrade(code);
          }
        } else {
          grade = this.getCurrentSchoolGrade(code);
        }
      }
      childGroup.get("risingSchoolGradeCode").setValue(grade.code?grade.code:null);
      childGroup.get("risingSchoolGradeDescription").setValue(grade.description?grade.description:null);
    }
  }

  getNextSchoolGrade(code:any){
    if(!code){
      return code;
    }
    const grade = this.schoolGradesList.find((item:any) => parseInt(item.code) > parseInt(code));
    return grade;
  }

  getCurrentSchoolGrade(code:any){
    if(!code){
      return code;
    }
    const grade = this.schoolGradesList.find((item:any) => parseInt(item.code)==parseInt(code));
    return grade;
  }
  redirectFamilyView(){
    this.router.navigate(['familyview']);
  }

}
