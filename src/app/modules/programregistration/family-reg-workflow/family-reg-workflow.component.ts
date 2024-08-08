import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { StoreService, KEYS } from '../../chinmaya-shared/services/store/store.service';
import { ClassRegistrationService } from '../../chinmaya-shared/services/program-registration/classregistration.service';
import { FamilyService } from '../../chinmaya-shared/services/family/family.service';
import { MasterService } from '../../chinmaya-shared/services/master/master.service';
import { PersonList } from '../../chinmaya-shared/services/program-registration/programregistration.interface';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../chinmaya-shared/services/alert/alert.service';
import { ProgramService } from '../../chinmaya-shared/services/program/program.service';
import { environment } from 'src/environments/environment';

declare function callbackUTC_1():any;

@Component({
  selector: 'app-family-reg-workflow',
  templateUrl: './family-reg-workflow.component.html',
  styleUrls: ['./family-reg-workflow.component.scss']
})
export class FamilyRegWorkflowComponent {
  programForm:FormGroup;
  personSelect:any={};
  signupCodeCategoryList:any=[
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
  signupCodeClr:any=[
    {color:'#19cddd'},
    {color:'#1974dd'},
    {color:'#19dd7b'},
    {color:'#a2dd19'},
    {color:'#c9dd19'},
    {color:'#ddaf19'},
    {color:'#002060'},
    {color:'#edde27'},
    {color:'#6e4ac4'},
    {color:'#4e7be6'},
    {color:'#5738c8'},
    {color:'#d8c636'},
    {color:'#e93890'},
    {color:'#ae4fea'},
    {color:'#ea4452'},
    {color:'#9444ea'},
    {color:'#893aea'},
    {color:'#3aea80'},
    {color:'#61da51'},
    {color:'#e9863f'},
    {color:'#ea6d43'},
    {color:'#db5269'},
  ]
  signupCode:any={
    name:'Bala Vihar',
    code:''
  };

  familyFlag:any={};


  selectedProgram:any;
  selectedChapterCode:any;
  categoryWiseList:any;
  primaryUserData:any;
  familyMemberpersonsList:any=[];
  validateFlag:boolean=false;
  currentUserData:any;
  personProgramRegData: any;
  pendingPaymentData: any=[];
  formGroup!: FormGroup;
  formDataCheck:any;
  Object = Object;
  sessionformGroup:FormGroup;
  memberFlag:boolean=false;
  selectedChapter:any;
  selectedFamilyDetails:any;
  InitFlag:boolean=false;

  paymentListDetailsList:any;
  TotalAmtData:any;
  immediatePaymentAmount:any;
  immediatePaymentAmountWithConv:any;
  annualPledgeFlag:any;
  paymentCompleteTab:boolean=false;

  get PF(): { [key: string]: AbstractControl } {
    return this.programForm.controls;
  }

  payFullAmt:string="";
  signature:any;
  utc_time:any;

 constructor(private fb:FormBuilder, private store:StoreService, 
  private classRgiSrvice:ClassRegistrationService, private familyService:FamilyService, 
  private MasterService:MasterService, private route: ActivatedRoute, private alertService:AlertService, private programService:ProgramService){
    
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
  this.primaryUserData  = this.familyService.getSelectedFamily();
  this.selectedFamilyDetails =  this.primaryUserData ;
  localStorage.setItem('CurrentUser', JSON.stringify(this.primaryUserData));
  
   localStorage.setItem('payOpts',JSON.stringify("fullAmt"));
  this.InitFlag=true;
  this.route.params.subscribe(async params => {
    this.memberFlag = params['memberFlag']=="true"?true:false;
  });
  //this.primaryUserData = JSON.parse(sessionStorage.getItem('newUserData') || '');
  this.selectedProgram = this.store.getValue(KEYS.program);
  this.selectedChapterCode = this.store.getValue(KEYS.chapter);
  localStorage.setItem('programcode', JSON.stringify(this.selectedProgram.code));
  this.currentUserData = this.classRgiSrvice.getLoggedInUser();
  let chapter = this.store.getValue(KEYS.chapterDesc);
  this.selectedChapter=chapter[0].description;
  this.store.onProgramUpdate().subscribe(program=>{
    this.selectedProgram=program;
  });
  this.setDefaultValue();
  await  this.fetchRelationshipPrimaryContactList();
  await this.fetchSchoolGradeList();
  await this.fetchpersonTypeList();
  this.getCategoriesList( this.primaryUserData);
  await this.fetchSchooldGradeLabel();
  //this.memberselection(this.primaryUserData.user);
  this.formGroup = this.fb.group({});
 }

 setDefaultValue(){
  let familyId = (this.primaryUserData.familyId)?this.primaryUserData.familyId : this.primaryUserData.familyID;
  this.programForm.patchValue({
    personType:'',
    firstName:'',
    schoolGrade:'',
    risingSchoolGrade:'',
    gender:'',
    relationShipPrimaryContact:'',
    familyID: familyId,
    personID: 0,
    emailAddress:'',
    chapter: this.selectedChapterCode,
    middleName:'',
    lastName: this.primaryUserData.lastName,
    phoneNumber:this.primaryUserData.phoneNumber,
    homePhone:this.primaryUserData.homePhone,
    address: this.primaryUserData.address,
    address2: this.primaryUserData.address2,
    address3: this.primaryUserData.address3,
    city: this.primaryUserData.city,
    state: this.primaryUserData.state,
    zipCode:'',
    status:'Active',
    memberSince:'',
    maritalStatus: '',
    sphomePhoneFlag:'',
    mobileFlag: '',
    dateOfBirth:'',
  });
  this.validateFlag=false;

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

Regdata:any=[];
 async enrollProgram(){
  this.validateFlag=true;
   let user = this.programForm.value;
   let param = {
    relationList:[{"id":0,"relationCode":user.relationShipPrimaryContact,"relatedPersonId":this.primaryUserData.personID}],
    user:this.programForm.value
   }
   this.programForm.markAsTouched();
   console.log(this.selectedSignupCode);
   if(this.validationFlag() && this.Object.keys(this.selectedSignupCode).length>0){
    let data:any = await this.familyService.saveFamilyPerson(param);
    this.InitFlag=false;    
    this.Regdata = data;
    this.selectedFamilyDetails = data.user;
    this.getCategoriesList(data.user)
     //this.familyPersonList();
     this.setDefaultValue();
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
   }else if( fieldFlag=='' && (user.personType!='' && user.personType!=null) && (user.firstName!='' && user.firstName!=null) && 
   (user.relationShipPrimaryContact!='' && user.relationShipPrimaryContact!=null) && (user.gender!='' && user.gender!=null)){
     return true;
   }

  return false;
 }

 personTypeList:any;
 async fetchpersonTypeList(){
  this.personTypeList = await this.MasterService.getPersonType();
}

childrenList:any;
SelectedMemData:any;
selectedUserData:any;
selectedMember:any;
async familyPersonList(){   
  let familyId = (this.primaryUserData.familyId)?this.primaryUserData.familyId : this.primaryUserData.familyID;
    let param:PersonList = {
      familyId:familyId,
      programCode: this.selectedProgram.code,
      chapterCode: this.selectedChapterCode,
      paymentFlag: false,
      personTypeCheckRequiredFlag: true,
      persontype:this.selectedSignupCode.registrantType,
      signUpCode:this.selectedSignupCode.signUpCode
    }

     let personData:any = await this.classRgiSrvice.getPersonList(param);
     this.familyMemberpersonsList = personData.personProgramList;

     this.childrenList = personData.personProgramList.filter((personObj: any) => {
      return personObj.personType !== 'ADULT' && personObj.personType !== 'YOUTH';
    })

    if (this.childrenList.length) {
      // this.patch();
      let youngerChild = this.getSortedData(this.childrenList, 'dateOfBirth');
      
      this.SelectedMemData = youngerChild[youngerChild.length - 1];
      this.selectedUserData = youngerChild[youngerChild.length - 1];
      localStorage.setItem('selectMember', JSON.stringify(this.selectedUserData));
      this.selectedMember= (this.selectedUserData.firstName+this.selectedUserData.lastName);
    } else {
      
      let sortedPersonId = this.getSortedData(personData.personProgramList, 'personID');
      // this.SelectedMemData = sortedPersonId[sortedPersonId.length - 1];
      if(personData.personProgramList.length==1){
        this.selectedMember= (personData.personProgramList[0].firstName+personData.personProgramList[0].lastName);
        localStorage.setItem('selectMember', JSON.stringify(personData.personProgramList[0]));

      }else{
        let memberRadio = JSON.parse(localStorage.getItem('selectMember') || '');
        this.selectedMember= (memberRadio.firstName+memberRadio.lastName);
      }

}

}

getSortedData(data: any, compareKey: string) {
  if (data.length === 1) {
    return data;
  }
  return data.sort((a: any, b: any) => {
    if (a[compareKey] && b[compareKey] && compareKey === 'dateOfBirth') {
      const d1 = new Date(a[compareKey]);
      const d2 = new Date(b[compareKey]);
      return d1.getTime() - d2.getTime();
    }
    return a[compareKey] - b[compareKey];
  })
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
  if(eve!=''){this.selectedSignupCode = [];}
  
  this.personSelect={}
 }
 
 selectCategorySignupCode(evn:any){
  //this.checkboxModel[evn]=true;
 }

 async getCategoriesList(eve:any) {

  //this.selectedUserData = JSON.parse(sessionStorage.getItem('newUserData') || '');
  let familyId = (eve.familyId)?eve.familyId : eve.familyID;
  let userData:any={
   familyId: familyId,
   personId: eve.personID,
   code: eve.chapter,
   programCode: this.selectedProgram.code,
   persontype: eve.persontype,
   code_type: '',
   grade: (eve.grade ==undefined || eve.grade ==null)?'':eve.grade,
   memberFlag:this.memberFlag
  };

  let data:any = await this.classRgiSrvice.fetchCategoriesList(userData);
  this.categoryWiseList = data;
  let categoryData = (data[0].signupCodesList.length>0)?data[0]:data[1];
  if(this.selectedSignupCode.length==0 || Object.keys(this.selectedSignupCode).length==0){
    this.selectedSignupCode = categoryData.signupCodesList[0];
  }
  let color = (data[0].signupCodesList.length>0)?this.signupCodeCategoryList[0].color:this.signupCodeCategoryList[1].color;
  this.toggleshow('',categoryData,color);
  //this.selectedUserData = JSON.parse(localStorage.getItem('selectMember') || '');
  this.memberselection(eve,null,'');
  this.familyPersonList();
}

selectedSignupCode:any=[];
signupCodeSelect(eve:any){
  this.selectedSignupCode = eve;
  this.personSelect={}
  this.familyPersonList();
}

annualPledgeData:any;
async memberselection(eve:any, index:any,type:any){
  this.personSelect={
    [index]:true
  };
  this.selectedFamilyDetails = eve;
  if(this.selectedSignupCode.length>0 || Object.keys(this.selectedSignupCode).length>0){
    if(this.InitFlag){
  let param={
    "familyId":(eve.familyID)?eve.familyID:eve.familyId,
    "programCode": this.selectedProgram.code,
    "chapterCode": (eve.chapter)?eve.chapter:eve.chapterCode,
    "memberFlag": this.memberFlag 
  };

  let data:any = await this.classRgiSrvice.fetchSaveAnnualPledgeReg(param);
  this.annualPledgeData  = data;
}
  this.getClassAmount(this.selectedSignupCode.signUpCode,this.selectedSignupCode,this.signupcodeList?.description,eve,type);
}else{
  this.alertService.showErrorALert('Please select the SignupCode.');
}
}

pledgeMsg:boolean=false;
pledgeMsg_1:boolean=false;
pledgeAmt:any=0;
prerqusitevalidMsg:string='';
async getClassAmount(signupCode: string, ngmodelName:any, categoryName:any, selectData:any, type:any) {
 this.pledgeMsg=false;
 this.pledgeMsg_1=false;
 this.selectedUserData = (type=='event') ?selectData: JSON.parse(localStorage.getItem('selectMember') || '');
 const body = {
   signupCode: signupCode,
   code: this.selectedUserData.chapterCode,
   duesStructureCode: "",
   programCode: this.selectedProgram.code,
   familyId: (this.selectedFamilyDetails.familyID)?this.selectedFamilyDetails.familyID :this.selectedFamilyDetails.familyId,
   personId:this.selectedFamilyDetails.personID,
   memberFlag: this.memberFlag 
 }
 
 let data:any = await this.classRgiSrvice.getClassAmount(body);
     this.pledgeAmt = data;
     this.prerqusitevalidMsg='';
     if(data.validation==true){
      if(!this.InitFlag || type=='event'){  this.onSubmit(ngmodelName, categoryName, data, this.selectedUserData );}else{this.getPersonProgramRegistration('');}
       return;
     }else if(data.validation==false){
       this.prerqusitevalidMsg=data.validationMessage;
     }else{
      // this.checkboxModel[ngmodelName.signUpCode] =false;
       this.pledgeMsg=true;
     }
  
}

personUserData:any;
async onSubmit(clsName:any, categoryName:any, amtData:any, selectedData:any) {
    this.personUserData = this.primaryUserData;
    console.log(selectedData);
    let familyId = (this.personUserData.familyId)?this.personUserData.familyId : this.personUserData.familyID;
    this.selectedUserData = selectedData;
  var body:any ={
    user: {
      password: this.personUserData.password,
      familyID: familyId,
      personID: this.personUserData.personID,
      gender: this.personUserData.gender,
      phoneNumber: this.personUserData.phoneNumber,
      chapter: this.selectedUserData.chapterCode,//this.personUserData.chapter,
      personType: this.personUserData.personType,
      dateOfBirth: this.personUserData.dateOfBirth,
    },
    userProgramList: [{
    adjustedAmount: amtData.adjustedAmount,
    displayamount: amtData.displayAmount,
    classes: clsName.signUpCode,
    firstName: (this.selectedUserData.firstName==null)?'': this.selectedUserData.firstName,
    middleName: (this.selectedUserData.middleName==null)?'': this.selectedUserData.middleName,
    lastName: (this.selectedUserData.lastName==null)?'': this.selectedUserData.lastName,
    gender: (this.selectedUserData.gender==null)?'': this.selectedUserData.gender,
    studentCategory: (this.selectedUserData.studentCategory==null)?'': this.selectedUserData.studentCategory,
    grade: (this.selectedUserData.grade==null)?'': this.selectedUserData.grade,
    dateOfBirth: (this.selectedUserData.dateOfBirth==null)?'': this.selectedUserData.dateOfBirth,
    pledgeStructureCode: (amtData.duesStructureCode==null)?'': amtData.duesStructureCode,
    personID: this.selectedUserData.personID,
    familyId: this.currentUserData.familyID,
    primaryPersonId: this.currentUserData.personID,
    registrationId: 0,
    registrationStatus:'PENDING',
    }],
    programCode:this.selectedProgram.code
  }

 
  

    let submitData = await this.classRgiSrvice.saveProgramRegistration(body);
    console.log(submitData);
     if(submitData){
      this.getPersonProgramRegistration('');
      //this.fetchFamilyFlag();
     // this.scrollToViewSession('');   
     }
            
}

objectKeys:any;
rightPanelAccordionNotPaid:any;
pendingAmtList:any=[];
async getPersonProgramRegistration(ind_change:any) {

  const body = {
    programCode: this.selectedProgram.code, 
    chapterCode: this.selectedUserData.chapterCode,
    familyId:(this.selectedFamilyDetails.familyID)?this.selectedFamilyDetails.familyID :this.selectedFamilyDetails.familyId,
    paymentFlag: false,
    sessionFlag: true
  }
  let data:any = await this.classRgiSrvice.fetchPersonProgramRegistrationList(body);

      this.personProgramRegData = data;
      this.pendingAmtList = await this.filterPaymentByStatusAmount(data.personProgramRegistrationList, "PENDING");
      this.pendingPaymentData = await this.filterPaymentByStatus(data.personProgramRegistrationList, "PENDING");
     // this.selectCheckBox();
      this.callFilterData();
      //this.fetchFamilySessionPreference();
      this.rightPanelAccordionNotPaid = this.callPaymentPanel(this.pendingPaymentData, 'personName','stagePaid');
      if(Object.keys(this.rightPanelAccordionNotPaid).length>0){ this.TotalValPendingData(); }
      this.objectKeys = Object.keys(this.rightPanelAccordionNotPaid);
      this.sessionCtrl(this.pendingPaymentData, ind_change);
   
}

pendingTotalAmt:any=[];
  TotalValPendingData(){
    this.pendingTotalAmt =[];
    let total=0;
    //let sortData = this.reviewTabData?.userProgramList.sort((a:any, b:any) => a.personID - b.personID);
    this.pendingAmtList.filter( (item:any, index:any, self:any) =>{
      if(item.paymentSubmittedDate==null && ((item.registrationStatus=='PENDING' && (item.paymentStatus=='BALANCE_DUE' || item.paymentStatus=='NO_DUES'))
      ||(item.registrationStatus=='ACCEPTED' && item.paymentStatus=='BALANCE_DUE')
      || (item.registrationStatus=='PENDING' && item.paymentStatus=='NO_DUES'))){
        
        if(self.indexOf(item) ===index){
        total = ((this.pendingTotalAmt.length==0)?0: this.pendingTotalAmt[0])+item.displayamount;
        if(this.pendingTotalAmt.length==0){this.pendingTotalAmt.push(total);}else{ this.pendingTotalAmt[0] = total; }
       }

      }
       
    });

  }

async filterPaymentByStatusAmount(data: Array<any>, status: string) {
  data.forEach((item: any, index:any) => {
      let person = this.getPersonByID(item.personID);
      if(person!=null){
      item['fullName'] = person.firstName + person.lastName;
      item['personType'] = person.personType;
      }
    
  });
  return data;
}

async filterPaymentByStatus(data: Array<any>, status: string) {
  data.forEach((item: any, index:any) => {
      let person = this.getPersonByID(item.personID);
      if(person!=null){
      item['fullName'] = person.firstName + person.lastName;
      item['personType'] = person.personType;
      }
    
  });

  let uniqueArray = data.filter((obj, index, self) =>
index === self.findIndex((t) => (
  (t.personID === obj.personID && t.signUpCode ===  obj.signUpCode )
))
);
  
return uniqueArray;
 
}

getPersonByID(personID: number) {
  for (let i = 0; i < this.familyMemberpersonsList.length; i++) {
    if (this.familyMemberpersonsList[i].personID === personID) {
      return this.familyMemberpersonsList[i];
    }
  }
  return null;
}

rightPanel:any;
  rightPanelAccordionSubmit:any;
  rightPanelAccordionAccept:any;
  rightPanelAccordionWaitList:any;
  callFilterData(){
    this.rightPanel={
      SUBMIT:[],
      ACCEPTED:[],
      WAITLISTED:[]
    }

    for(var i=0; i<this.personProgramRegData.personProgramRegistrationList.length; i++){
      if(this.personProgramRegData.personProgramRegistrationList[i].registrationStatus=='ACCEPTED' && this.personProgramRegData.personProgramRegistrationList[i].paymentSubmittedDate!=null){
        this.rightPanel['ACCEPTED'].push(this.personProgramRegData.personProgramRegistrationList[i]);
        this.rightPanelAccordionAccept = this.callPaymentPanel(this.rightPanel['ACCEPTED'], 'personName','');
        this.TotalValPendingReviewData('ACCEPTED');
      }else if(this.personProgramRegData.personProgramRegistrationList[i].registrationStatus=='WAITLISTED'){
        this.rightPanel['WAITLISTED'].push(this.personProgramRegData.personProgramRegistrationList[i]);
        this.rightPanelAccordionWaitList = this.callPaymentPanel(this.rightPanel['WAITLISTED'], 'personName','');
        this.TotalValPendingReviewData('WAITLISTED');
      }else if( this.personProgramRegData.personProgramRegistrationList[i].paymentSubmittedDate!=null && this.personProgramRegData.personProgramRegistrationList[i].classification!='I'
        &&  (this.personProgramRegData.personProgramRegistrationList[i].registrationStatus=='PENDING' && 
      (this.personProgramRegData.personProgramRegistrationList[i].paymentStatus=='PARTIAL_PAYMENT' || this.personProgramRegData.personProgramRegistrationList[i].paymentStatus=='PRE-AUTH_SUCCESS' || this.personProgramRegData.personProgramRegistrationList[i].paymentStatus=='NO_DUES')) ){
        this.rightPanel['SUBMIT'].push(this.personProgramRegData.personProgramRegistrationList[i]);
        this.rightPanelAccordionSubmit = this.callPaymentPanel(this.rightPanel['SUBMIT'], 'personName','');
        this.TotalValPendingReviewData('SUBMIT');
      }
    }

    

  }

  pendingReviewTotalAmt:any;
  TotalValPendingReviewData(type:any){
    this.pendingReviewTotalAmt ={
      SUBMIT:[],
      ACCEPTED:[],
      WAITLISTED:[]
    };
    let total=0;
    //let sortData = this.reviewTabData?.userProgramList.sort((a:any, b:any) => a.personID - b.personID);
    this.rightPanel[type].filter( (item:any, index:any, self:any) =>{
            
        if(self.indexOf(item) ===index){
        total = ((this.pendingReviewTotalAmt[type].length==0)?0: this.pendingReviewTotalAmt[type][0])+item.amount;
        if(this.pendingReviewTotalAmt[type].length==0){this.pendingReviewTotalAmt[type].push(total);}else{ this.pendingReviewTotalAmt[type][0] = total; }
       }       
    });

  }

  callPaymentPanel(objectArray:any, property:any, type:any){

    if(type=='stagePaid'){
     return objectArray.reduce(function (acc:any, obj:any) {
       if(obj.paymentSubmittedDate==null && ((obj.registrationStatus=='PENDING' && (obj.paymentStatus=='BALANCE_DUE' || obj.paymentStatus=='NO_DUES'))
     ||(obj.registrationStatus=='ACCEPTED' && obj.paymentStatus=='BALANCE_DUE')
     || (obj.registrationStatus=='PENDING' && obj.paymentStatus=='NO_DUES'))){
       var key = obj[property];
       if (!acc[key]) {
         acc[key] = [];
       }
       acc[key].push(obj);
       return acc;
     }else{
       let arrya:any=[];
       return arrya;
     }
     }, {});
   }else{
     return objectArray.reduce(function (acc:any, obj:any) {
       var key = obj[property];
       if (!acc[key]) {
         acc[key] = [];
       }
       acc[key].push(obj);
       return acc;
     }, {});
   }
 }

 familySessionData:any={};
 //headerofSelectedChoice:any={};
   sessionCtrl(fetChoiceData:any, index_change:any){
     this.familySessionData={};
     const group = this.fb.group({});
     for(var i=0; i< fetChoiceData.length; i++){
       if(fetChoiceData[i].sessionPreferences.length>0 && fetChoiceData[i].familySessionPreference.length==0 && (fetChoiceData[i].paymentSubmittedDate==null || fetChoiceData[i].paymentSubmittedDate=='' )){
 
        
         fetChoiceData[i].sessionPreferences.forEach((item: any, index:any) =>{
           const ctrl = this.fb.control(' ');
           this.formGroup.addControl(fetChoiceData[i].personName+'_'+fetChoiceData[i].signUpCode+'_'+index, ctrl);
           if(index!=0){
             this.formGroup.controls[fetChoiceData[i].personName+'_'+fetChoiceData[i].signUpCode+'_'+index].disable();
           }
           this.formGroup.controls[fetChoiceData[i].personName+'_'+fetChoiceData[i].signUpCode+'_'+index].setValue('');
         });
       }else if(fetChoiceData[i].familySessionPreference.length>0 && (fetChoiceData[i].paymentSubmittedDate==null || fetChoiceData[i].paymentSubmittedDate=='' )){
         let famData =fetChoiceData[i].familySessionPreference;
         let sessionData = fetChoiceData[i].sessionPreferences;
       //  if( this.headerofSelectedChoice[fetChoiceData[i].personName]==undefined){
       //    Object.assign(this.headerofSelectedChoice , {[fetChoiceData[i].personName]:[]})
       //    this.headerofSelectedChoice[fetChoiceData[i].personName].push({signup:fetChoiceData[i].signUpCodeDescription, personName: fetChoiceData[i].personName });
       // }
         const mergedArray = famData.concat(sessionData.filter((obj2:any) =>
            famData.findIndex((obj1:any) => obj1.choices === obj2.choices) === -1
           ));
         mergedArray.forEach((item: any, index:any) =>{
           const ctrl = this.fb.control(
             (index_change=='index_Change' && index==0)? item.choiceCode : (index_change=='index_Change' && index !=0)?'':(item.choiceCode !=undefined)? item.choiceCode : ''
           );
           this.formGroup.addControl(fetChoiceData[i].personName+'_'+fetChoiceData[i].signUpCode+'_'+index, ctrl);
           if(index!=0 && this.formGroup.controls[fetChoiceData[i].personName+'_'+fetChoiceData[i].signUpCode+'_'+(index-1)].value==''){
             this.formGroup.controls[fetChoiceData[i].personName+'_'+fetChoiceData[i].signUpCode+'_'+index].disable();
           }else if(index!=0 && this.formGroup.controls[fetChoiceData[i].personName+'_'+fetChoiceData[i].signUpCode+'_'+(index-1)].value!='' ){
             this.formGroup.controls[fetChoiceData[i].personName+'_'+fetChoiceData[i].signUpCode+'_'+index].enable();
           }
         });
           this.familySessionData[fetChoiceData[i].personName+'_'+fetChoiceData[i].signUpCode]= [];
        this.familySessionData[fetChoiceData[i].personName+'_'+fetChoiceData[i].signUpCode] = mergedArray;
             }
       
     }
     this.selectedChoice();
     console.log(this.familySessionData);
     this.formDataCheck = this.formGroup.value;
   }

   selectedList:any=[];
  selectedChoice(){
    this.selectedList=[];
      for(var k=0; k<this.pendingPaymentData.length; k++){
        if(this.pendingPaymentData[k].familySessionPreference.length>0){
          this.selectedList.push({'personName': this.pendingPaymentData[k].personName,'signupCode': this.pendingPaymentData[k].signUpCodeDescription, 'Session': this.pendingPaymentData[k].familySessionPreference });
        }
       }  
  }

  getGradeDesc(eve:any){
    let gradeDesc:any='';
    this.schoolGradesList.filter((item:any)=>{
     if(item.code==eve){
      gradeDesc =item.description;
     }
    });
    return gradeDesc;
  }


  async sessionChoice(personData:any, i:any, event:any){
    let familyId = (this.primaryUserData.familyId)?this.primaryUserData.familyId : this.primaryUserData.familyID;
    let body:any={
      familyId: familyId,
      programCode: '',
      familySessionPreference: [
        
      ],
      signupCode: personData.signUpCode
    }
    let objSession:any ={};
    for(var p=0; p<personData.sessionPreferences.length; p++){
      // let choicepref:any=(personData.sessionPreferences[i].choiceLabel).split(' ');
      // choicepref = choicepref[choicepref.length-1].split(':')[0];
      if(event.target.value == personData.sessionPreferences[p].choices){
        objSession ={
          personId:personData.personID,
          choiceCode:personData.sessionPreferences[p].choices,
          choiceLabel:personData.sessionPreferences[i].choiceLabel,
          modifiedBy: this.currentUserData.personID,
          choicePreference: personData.sessionPreferences[i].choiceOrder,
          createdBy: this.currentUserData.personID
        };
        body.programCode= personData.sessionPreferences[p].programCode;
        break;
      }
    }

    body.familySessionPreference.push(objSession);
  
    let data = await this.classRgiSrvice.saveSessionPreferrence(body);
    this.getPersonProgramRegistration('index_change');

  }

  payNow(){
    this.paymentInfoListDetails();
  }

  async paymentInfoListDetails(){
    let familyId = (this.primaryUserData.familyId)?this.primaryUserData.familyId : this.primaryUserData.familyID;
    //scrollTop();
    let body ={
      familyId: familyId,
      programCode: this.selectedProgram.code,
      chapterCode: this.selectedChapterCode,
      paymentFlag:false
    }
    
    //var totalAmt=0;
    let data:any = await this.programService.fetchpaymentInfoFamilyandproCode(body);
         this.paymentListDetailsList=data;
        //  for(var i=0; i< this.paymentListDetailsList.userProgramList.length; i++){
        //   totalAmt += this.paymentListDetailsList.userProgramList[i].amount;
        //  }
        // this.TotalAmtData = totalAmt;
        
        this.annualPledgeFlag = (data.totalpledgeAmount!=0 && data.totalpledgeAmount!=null 
          && data.arpanamPledgeAdjustment!=null && data.arpanamPledgeAdjustment!=0 && data.pledgeTotal > data.arpanamPledgeAdjustment) || 
          (data.totalpledgeAmount==0 && data.arpanamPledgeAdjustment!=null && data.arpanamPledgeAdjustment!=0 
            && data.pledgeTotal == data.arpanamPledgeAdjustment);

        this.TotalAmtData = (((data.totalpledgeAmount!=0 && data.totalpledgeAmount!=null) &&
          (data.arpanamPledgeAdjustment!=null && data.arpanamPledgeAdjustment!=0)
          && data.pledgeTotal > data.arpanamPledgeAdjustment)?data.totalpledgeAmount:
        (data.totalpledgeAmount==0 && (data.arpanamPledgeAdjustment!=null && data.arpanamPledgeAdjustment!=0) &&
         data.pledgeTotal==data.arpanamPledgeAdjustment)?data.totalpledgeAmount:
         ((data.totalpledgeAmount!=0 && data.totalpledgeAmount!=null) && data.totalpledgeAmount==data.pledgeTotal
         &&data.arpanamPledgeAdjustment==0)?data.pledgeTotal:data.totalpledgeAmount);

         if (data.deferredPaymentInstallmentInfo != null && data.deferredPaymentInstallmentInfo != '') {
          this.immediatePaymentAmount = data.immediatePaymentAmount;
          this.immediatePaymentAmountWithConv = data.immediatePaymentAmountWithConv;
          localStorage.setItem('totalAMt', this.immediatePaymentAmount);
          localStorage.setItem('totalAMtwithconv', this.immediatePaymentAmountWithConv);
         }else{
          this.immediatePaymentAmount = (data.arpanamPledgeAdjustment==0)? data.totalAmount:data.totalpledgeAmount;
          this.immediatePaymentAmountWithConv = (data.arpanamPledgeAdjustment==0)? data.totalAmountWithConv:data.totalPledgeAmountWithConv;
          localStorage.setItem('totalAMt', this.immediatePaymentAmount);
          localStorage.setItem('totalAMtwithconv', this.immediatePaymentAmountWithConv);
         }

         this.paymentCompleteTab = (data.totalpledgeAmount==0 && data.arpanamPledgeAdjustment!=null && data.arpanamPledgeAdjustment!=0 
          && data.pledgeTotal==data.arpanamPledgeAdjustment)
         || (data.totalpledgeAmount==0 && data.arpanamPledgeAdjustment==0 && data.pledgeTotal==0)
         ? true : false;
      
  }

  
  paymentModeSelect(val:string){
    this.payFullAmt=val;
    localStorage.setItem('payOpts',JSON.stringify(val));
    this.ccCardPay='';
  }

  ccCardPay:any='';
  amountwithconvience:any=0;
  proceedPayBtnCC:boolean=false;
  proceedPayBtnEcheck:boolean=false;
  convienceFee:any;

  cardValue(eve:any){
    this.ccCardPay=eve;
    this.proceedPayBtnCC = false;
    this.proceedPayBtnEcheck = false;
    let body={
      programCode: this.selectedProgram.code,
      chapterCode: this.selectedChapterCode
    };
    this.programService.fetchConvienceFee(body).subscribe({
      next: (data: any) => {
         this.convienceFee=data;
         var buttonval = $('button[id]');
          buttonval.attr('api_access_id',environment.API_Access_ID);
          buttonval.attr('location_id', environment.LOCATION_ID);
         if(this.ccCardPay=='CC'){
          this.proceedPayBtnCC = true;
          var button = $('button[api_access_id]');
          button.attr('allowed_methods',"visa, mast, disc"); 
        // var amountConv = (this.TotalAmtData*data.convenienceFee)/100;
        // this.amountwithconvience = this.TotalAmtData+amountConv;
        // localStorage.setItem('totalAMt', this.TotalAmtData);
        // localStorage.setItem('totalAMtwithconv', this.amountwithconvience);
      }else{
        this.proceedPayBtnEcheck = true;
         var button = $('button[api_access_id]');
         button.attr('allowed_methods',"echeck");
        // this.amountwithconvience = this.TotalAmtData;
        // localStorage.setItem('totalAMt', this.TotalAmtData);
        // localStorage.setItem('totalAMtwithconv', this.TotalAmtData);
      }
     
     
        this.callPaymentInfo();
  

      },
      error: (e:any) => {
        console.error(e);
      }
    });

  }

  fetchresponsePayData:any='';
  async callPaymentInfo(){
    localStorage.setItem('payMode', JSON.stringify(this.ccCardPay));
    let familyId = (this.primaryUserData.familyId)?this.primaryUserData.familyId : this.primaryUserData.familyID;
    let body ={
      familyId: familyId,
      programCode: this.selectedProgram.code,
      chapterCode: this.selectedChapterCode,
      paymentFlag:true
    }
    
    var totalAmt=0;
    var fetchUpdateFlag = sessionStorage.getItem('fetchupdateResponse');
    
    if(fetchUpdateFlag==undefined || fetchUpdateFlag==null){
      this.fetchresponsePayData = await  this.programService.fetchpaymentInfoFamilyandproCodeFlagTrue(body);
      sessionStorage.setItem('fetchupdateResponse', JSON.stringify(this.fetchresponsePayData));
    }

        if(this.payFullAmt=='fullAmt'){
          if(this.ccCardPay=='E-Check'){ 
            var button = $("button[id*='pay_proceed_btn_echeck_full']"); 
          }else{ 
            var button = $("button[id*='pay_proceed_btn_cc_full']"); 
          }  
          //var button = $('button[api_access_id]');
        //  var api_access_id=button.attr('api_access_id');
     button.attr('billing_name',this.fetchresponsePayData.billingName);
     button.attr('billing_street_line1',this.fetchresponsePayData.billingStreetLine1);
     button.attr('billing_locality',this.fetchresponsePayData.billingLocality);
     button.attr('billing_region',this.fetchresponsePayData.billingRegion);
     button.attr('billing_postal_code',this.fetchresponsePayData.billingPostalCode);
     button.attr('billing_phone_number',this.fetchresponsePayData.billingPhoneNumber);
     button.attr('billing_email_address',this.fetchresponsePayData.billingEmailAddress);
     //button.attr('line_item_4',responsedata.);
      if(this.ccCardPay=='E-Check'){
        button.attr('total_amount', this.immediatePaymentAmount);
        button.attr('xdata_2',this.immediatePaymentAmount);
      }else{
        button.attr('total_amount', this.immediatePaymentAmountWithConv);
        button.attr('xdata_2',this.immediatePaymentAmountWithConv);
      }
     
  
     button.attr('order_number',this.fetchresponsePayData.xdata3);
     button.attr('consumer_id',this.fetchresponsePayData.familyId);
     button.attr('xdata_1',this.fetchresponsePayData.xdata1);
     button.attr('xdata_3',this.fetchresponsePayData.xdata3);
     button.attr('reference_id',this.fetchresponsePayData.xdata1);
   
     callbackUTC_1();
     this.signature = JSON.parse(localStorage.getItem('signature') || '');
     this.utc_time = JSON.parse(localStorage.getItem('utc_time') || '');
     setTimeout(() => {
      if(this.ccCardPay=='E-Check'){
        var id = document.getElementById('pay_proceed_btn_echeck_full'); 
      }else{
        var id = document.getElementById('pay_proceed_btn_cc_full'); 
      }  
       id?.setAttribute('api_access_id', environment.API_Access_ID);
       id?.setAttribute('location_id', environment.LOCATION_ID);
    
      }, 1500);
   
        }else if(this.payFullAmt=='partAmt'){
          if(this.ccCardPay=='E-Check'){
            var button = $("button[id*='pay_proceed_btn_echeck']"); 
          }else{ 
            var button = $("button[id*='pay_proceed_btn_cc']"); 
          }  
          //var button = $('button[api_access_id]');
          var api_access_id=button.attr('api_access_id');
          var installAmt = (this.ccCardPay=='E-Check')?this.fetchresponsePayData.installmentAmount : (this.fetchresponsePayData.convenienceFee==0)?this.fetchresponsePayData.installmentAmount:this.fetchresponsePayData.installmentAmountWithConv;
     button.attr('billing_name',this.fetchresponsePayData.billingName);
     button.attr('billing_street_line1',this.fetchresponsePayData.billingStreetLine1);
     button.attr('billing_locality',this.fetchresponsePayData.billingLocality);
     button.attr('billing_region',this.fetchresponsePayData.billingRegion);
     button.attr('billing_postal_code',this.fetchresponsePayData.billingPostalCode);
     button.attr('billing_phone_number',this.fetchresponsePayData.billingPhoneNumber);
     button.attr('billing_email_address',this.fetchresponsePayData.billingEmailAddress);
     //button.attr('line_item_4',responsedata.);
     button.attr('total_amount', installAmt);
     button.attr('order_number',this.fetchresponsePayData.xdata3);
     button.attr('consumer_id',this.fetchresponsePayData.familyId);
     button.attr('xdata_1',this.fetchresponsePayData.xdata1);
     button.attr('xdata_2',this.fetchresponsePayData.xdata2+".00");
     button.attr('xdata_3',this.fetchresponsePayData.xdata3);
    
     button.attr('reference_id',this.fetchresponsePayData.xdata1);

     var origtotalcount = this.fetchresponsePayData.userProgramList.length;
     

     callbackUTC_1();
     setTimeout(() => {
      if(this.ccCardPay=='E-Check'){
        var id = document.getElementById('pay_proceed_btn_echeck'); 
      }else{
        var id = document.getElementById('pay_proceed_btn_cc'); 
      }
         
       id?.setAttribute('api_access_id', environment.API_Access_ID);
       id?.setAttribute('location_id', environment.LOCATION_ID);
      
      }, 1500);
        }
       

  }


  deletePersonProgramReg(pendData:any,i:any){
    
    const body = {
      registrationId: pendData.registrationId,
      personId: pendData.personID,
      signUpCode: pendData.signUpCode,
      programCode: pendData.programCode
    }
   let deleteResData = this.classRgiSrvice.deleteProgramRegistration(body)
       // this.checkboxModel[pendData.signUpCode]=false;

        for(let item in this.formGroup.controls){
          if(item.includes(pendData.fullName)){
              this.formGroup.removeControl(item);
          }
        }
        this.getPersonProgramRegistration('');
        this.fetchFamilyFlag();
        //if(pendData.subCategory!=null){this.getCategoriesList();}
    
  }

  async fetchFamilyFlag(){
   
    let familyId = (this.primaryUserData.familyId)?this.primaryUserData.familyId : this.primaryUserData.familyID;
    let body ={
      familyId: familyId,
      programCode: this.selectedProgram.code,
      chapterCode: this.selectedChapterCode,
      paymentFlag:false
    }
      
     let res = await this.classRgiSrvice.fetchSaveProgramConfigurationFields(body) 
     this.familyFlag=res;
    // this.programConfigurationFields = res;
    
   }

   async deleteSessionChoice(personData:any, i:any, event:any, item:any){

    let familyId = (this.primaryUserData.familyId)?this.primaryUserData.familyId : this.primaryUserData.familyID;
    
    if(i==0 && personData.familySessionPreference.length>0){
      let paramSession={
        signupCode:personData.signUpCode,
        programCode: this.selectedProgram.code,
        familyId: familyId,
        personId: personData.personID
      };

       
      let resData:any = await this.classRgiSrvice.deleteFamilySessionPreference(paramSession);
      if(resData?.flag){
        for(let k=0; k<this.familySessionData[personData.personName+'_'+personData.signUpCode].length; k++){
          if(k!=i){
            this.formGroup.controls[personData.personName+'_'+personData.signUpCode+'_'+k].setValue('');
          }
        }
        this.sessionChoice(personData, i, event);
      }
    }else{
      this.sessionChoice(personData, i, event);
    }
    
    
  }
    
 

}
