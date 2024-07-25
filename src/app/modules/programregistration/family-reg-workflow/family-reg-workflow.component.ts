import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { StoreService, KEYS } from '../../chinmaya-shared/services/store/store.service';
import { ClassRegistrationService } from '../../chinmaya-shared/services/program-registration/classregistration.service';
import { FamilyService } from '../../chinmaya-shared/services/family/family.service';
import { MasterService } from '../../chinmaya-shared/services/master/master.service';
import { PersonList } from '../../chinmaya-shared/services/program-registration/programregistration.interface';
@Component({
  selector: 'app-family-reg-workflow',
  templateUrl: './family-reg-workflow.component.html',
  styleUrls: ['./family-reg-workflow.component.scss']
})
export class FamilyRegWorkflowComponent {
  programForm:FormGroup;
  signupCodeList:any=[
    {color:"#984807"},
    {color:"#7030A0"},
    {color:"#92D050"},
    {color:"#0070C0"},
    {color:"#4BACC6"},
    {color:"#C0504D"},
    {color:"#002060"},
    {color:"#2bcee3"},
    {color:"#edde27"}

  ];
  signupCode:any={
    name:'Bala Vihar',
    code:''
  };
  selectedProgram:any;
  selectedChapterCode:any;
  categoryWiseList:any;
  primaryUserData:any;
  familyMemberpersonsList:any;
  validateFlag:boolean=false;
  get PF(): { [key: string]: AbstractControl } {
    return this.programForm.controls;
  }

 constructor(private fb:FormBuilder, private store:StoreService, 
  private classRgiSrvice:ClassRegistrationService, private familyService:FamilyService, private MasterService:MasterService){
    
    this.programForm = this.fb.group({
      //signupCode:new FormControl('',[Validators.required]),
      personType:new FormControl('',[Validators.required]),
      firstName:new FormControl('',[Validators.required]),
      schoolGrade:new FormControl('',[Validators.required]),
      risingSchoolGrade:new FormControl(''),
      gender:new FormControl('',[Validators.required]),
      relationShipPrimaryContact:new FormControl('',[Validators.required]),
      familyID: new FormControl(''),
      personID: new FormControl(0),
      emailAddress: new FormControl(''),
      chapter: new FormControl(''),
      middleName: new FormControl(''),
      lastName: new FormControl(),
      phoneNumber: new FormControl(),
      homePhone: new FormControl(''),
      address: new FormControl(''),
      address2: new FormControl(''),
      address3: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zipCode: new FormControl(''),
      status: new FormControl('Active'),
      memberSince: new FormControl(''),
      maritalStatus: new FormControl(''),
      sphomePhoneFlag: new FormControl(''),
      mobileFlag: new FormControl(''),
      dateOfBirth:new FormControl(""),
      livingAtHomeAddress:new FormControl('1'),
      dependentUsername:new FormControl({value:'',disabled:false}),
      credentialCheck:new FormControl('No'),
      relationCode: new FormControl(''),
      relatedPersonId: new FormControl(''),
      relationCode1: new FormControl(''),
      relatedPersonId1: new FormControl(''),
      CustodyIssue:new FormControl('No'),
    
    });
    
 }

 async ngOnInit(){
  this.primaryUserData = JSON.parse(sessionStorage.getItem('newUserData') || '');
  this.selectedProgram = this.store.getValue(KEYS.program);
  this.selectedChapterCode = this.store.getValue(KEYS.chapter);
  this.setDefaultValue();
  await  this.fetchRelationshipPrimaryContactList();
  await this.fetchSchoolGradeList();
  await this.fetchpersonTypeList();
  this.getCategoriesList();
  this.familyPersonList();
  await this.fetchSchooldGradeLabel();
 }

 setDefaultValue(){

  this.programForm.patchValue({
    personType:'',
    firstName:'',
    schoolGrade:'',
    risingSchoolGrade:'',
    gender:'',
    relationShipPrimaryContact:'',
    familyID:this.primaryUserData.user.familyID,
    personID: 0,
    emailAddress:'',
    chapter: this.selectedChapterCode,
    middleName:'',
    lastName: this.primaryUserData.user.lastName,
    phoneNumber:this.primaryUserData.user.phoneNumber,
    homePhone:this.primaryUserData.user.homePhone,
    address: this.primaryUserData.user.address,
    address2: this.primaryUserData.user.address2,
    address3: this.primaryUserData.user.address3,
    city: this.primaryUserData.user.city,
    state: this.primaryUserData.user.state,
    zipCode:'',
    status:'Active',
    memberSince:'',
    maritalStatus: '',
    sphomePhoneFlag:'',
    mobileFlag: '',
    dateOfBirth:'',
  });
 
 }

 fetchPrimaryContactList:any;
 async fetchRelationshipPrimaryContactList(){
   this.fetchPrimaryContactList = await this.MasterService.fetchRelationshipPrimaryContactList();
 }
 signupcodeEvent(item:any){
   this.signupCode.code=item.code;
   this.signupCode.name=item.description;
 }
 
 schoolGradesList:any;

 async fetchSchoolGradeList(){
 
  let data = await this.MasterService.fetchSchoolGradeList();
  this.schoolGradesList = data;
  this.raisingSchooldGradeLabel();
}

raisingGradeData:any;
changeOfSchoolGrade(eve:any){
  let filterGradeData:any =[];
  if(this.programForm.controls['schoolGrade'].value == '19'){
   this.schoolGradesList.filter( (item:any)=>{
      if(item.code == '19' || item.code == '20'){
        return filterGradeData.push(item);
      }
    });
    this.raisingGradeData = filterGradeData;
    if(eve!=''){
      this.programForm.controls['risingSchoolGrade'].setValue("");
    }
  }

}
personTypeVal:any='';
fieldInterChange(event:any){
  this.personTypeVal = event.target.value;
}

schGradeLabel:any;
 async fetchSchooldGradeLabel(){
   let param = {
    code: this.selectedChapterCode,
    programCategory: ''
  }

  let data:any = await this.MasterService.fetchSchoolGradeLabel(param);
  this.schGradeLabel = data['gradeLabel'];
}

raisingSchGradeLabel:any;
async raisingSchooldGradeLabel(){
  let param = {
    code: this.selectedChapterCode,
    programCategory: ''
  }
   let data = await this.MasterService.fetchRisingGradeLabel(param);
    this.raisingSchGradeLabel= data;
}

 async enrollProgram(){
  this.validateFlag=true;
   let user = this.programForm.value;
   let param = {
    relationList:[{"id":0,"relationCode":user.relationShipPrimaryContact,"relatedPersonId":this.primaryUserData.user.personID}],
    user:this.programForm.value
   }
   this.programForm.markAsTouched();

   if(this.validationFlag()){
    let data:any = await this.familyService.saveFamilyPerson(param);
     this.familyPersonList();
   }
 }

 validationFlag(){
  let user = this.programForm.value;
  let fieldFlag = (user.personTypeVal=='CHILD' && user.schoolGrade=='19')?'raisingFlag':(user.personTypeVal=='CHILD' && user.schoolGrade=='18')?'dateofbirth':'';

   if(fieldFlag=='' && (user.personType!='' && user.personType!=null) && (user.firstName!='' && user.firstName!=null) && 
   (user.relationShipPrimaryContact!='' && user.relationShipPrimaryContact!=null) && (user.gender!='' && user.gender!=null) 
  && (user.schoolGrade!='' && user.schoolGrade!=null) ){
    return true;
   }else if(fieldFlag=='raisingFlag' && (user.personType!='' && user.personType!=null) && (user.firstName!='' && user.firstName!=null) && 
   (user.relationShipPrimaryContact!='' && user.relationShipPrimaryContact!=null) && (user.gender!='' && user.gender!=null) 
  && (user.schoolGrade!='' && user.schoolGrade!=null) && (user.risingSchoolGrade!='' && user.risingSchoolGrade!=null)){
    return true;
   }else if(fieldFlag=='dateofbirth' && (user.personType!='' && user.personType!=null) && (user.firstName!='' && user.firstName!=null) && 
   (user.relationShipPrimaryContact!='' && user.relationShipPrimaryContact!=null) && (user.gender!='' && user.gender!=null) 
  && (user.schoolGrade!='' && user.schoolGrade!=null) && (user.dateOfBirth!='' && user.dateOfBirth!=null)){
   return true;
   }

  return false;
 }

 personTypeList:any;
 async fetchpersonTypeList(){
  this.personTypeList = await this.MasterService.getPersonType();
}

async familyPersonList(){   
    let param:PersonList = {
      familyId:this.primaryUserData.user.familyID,
      programCode: this.selectedProgram.code,
      chapterCode: this.selectedChapterCode,
      paymentFlag: false,
      personTypeCheckRequiredFlag: true
    }

     let personData:any = await this.classRgiSrvice.getPersonList(param);
     this.familyMemberpersonsList = personData.personProgramList;

}

 resetForm(){

 }
 
  toggleMenu:boolean=false;
  signupcodeList:any;
  checkboxModel:any;
  colorCodeBtn:any;
 toggleshow(eve:any, data:any, clrCode:any){ 
  this.toggleMenu=true;
  this.signupcodeList=data;
  this.colorCodeBtn= clrCode;
 }
 
 selectCategorySignupCode(evn:any){
  //this.checkboxModel[evn]=true;
 }

 selectedUserData:any;
 async getCategoriesList() {

  this.selectedUserData = JSON.parse(sessionStorage.getItem('newUserData') || '');
  let userData:any={
   familyId: this.selectedUserData.user.familyID,
   personId:this.selectedUserData.user.personID,
   code: this.selectedUserData.user.chapter,
   programCode: this.selectedProgram.code,
   persontype: this.selectedUserData.user.personType,
   code_type: '',
   grade: (this.selectedUserData.user.grade ==undefined || this.selectedUserData.user.grade ==null)?'':this.selectedUserData.user.grade
  }

  let data:any = await this.classRgiSrvice.fetchCategoriesList(userData);
  this.categoryWiseList = data;
}

}
