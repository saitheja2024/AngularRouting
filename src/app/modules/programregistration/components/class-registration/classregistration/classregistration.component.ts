import { Component, EventEmitter, Output } from '@angular/core';
import { PersonList } from 'src/app/modules/chinmaya-shared/services/program-registration/programregistration.interface';
import { StoreService, KEYS } from 'src/app/modules/chinmaya-shared/services/store/store.service';
import { ClassRegistrationService } from 'src/app/modules/chinmaya-shared/services/program-registration/classregistration.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { RouteChangeCall } from 'src/app/modules/chinmaya-shared/services/program-registration/routechange.service';
declare function scrollTop():any;


@Component({
  selector: 'app-classregistration',
  templateUrl: './classregistration.component.html',
  styleUrls: ['./classregistration.component.scss']
})
export class ClassregistrationComponent {
  currentUserData:any;
  selectedAcademicYear: any;
  selectedChapterCode: any;
  selectedProgram: any;
  loggedInUser: any;
  selectedFamily:any;
  personsList:any;
  selectedMember: any;
  categoryWiseList: Array<any> = [];
  SelectedMemData:any;
  pendingPaymentData: any=[];
  personProgramRegData: any;
  personUserData:any;
  adultsList:any;
  childrenList:any;
  formGroup!: FormGroup;
  formDataCheck:any;
  Object = Object;
  familyFlag:any={};
  programConfigurationFields: any;
  programRegistrationList:any[]=[]
 currentTab: string="";
 signupURL:any;
 familyId:any;
 personID:any;
 tabClassRegistration:boolean=true;

 constructor( public fb: FormBuilder, private store:StoreService,
   private classRgiSrvice:ClassRegistrationService, 
   private sanitizer: DomSanitizer, private route:Router, private routePass:RouteChangeCall){}

 async ngOnInit() {
  this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.selectedProgram = this.store.getValue(KEYS.program);
    this.selectedFamily = this.store.getValue(KEYS.selectedFamily);
    this.currentUserData = this.classRgiSrvice.getLoggedInUser();


    this.signupURL = 'https://cmwrc.chinmayadc.org/support/arpanam/';
  
     //
    this.familyId= this.selectedFamily.familyId;
    this.personID = this.selectedProgram.personID;
    localStorage.setItem("personID", JSON.stringify(this.personID));
   
    
    this.formGroup = this.fb.group({
      user: this.fb.group({
        familyID: [parseInt(this.familyId), Validators.required],
        personID: [null, Validators.required],
        chapter: [this.selectedChapterCode, Validators.required],
      }),
      userProgramList: this.fb.array([]),
      programCode: [this.selectedProgram.code, Validators.required],
      adult: [[]],
      //selectedMember: [this.selectedMember, Validators.required],
      categoryClasses: this.fb.array([]),
      
    });


    sessionStorage.removeItem('fetchupdateResponse');
    this.populateOnInitData();



}

async saveClassRegist(){
 
  let body ={
    familyId: this.selectedFamily.familyId,
    programCode:  this.selectedProgram.code,
    chapterCode: this.selectedChapterCode
  }
   let dataPledge = await this.classRgiSrvice.saveAnnualPledgeRegistration(body)
  this.getPersonProgramRegistration('');
}

  async populateOnInitData() {
    await this.fetchPersonList();
    await this.getCategoriesList();
    await this.getPersonProgramRegistration('');
    await this.fetchPersonList();
    await this.fetchFamilyFlag();
    
    await this.saveClassRegist();
    await this.prepareTabs();
  }

  async fetchPersonList(){
    
    let param:PersonList = {
      familyId: this.selectedFamily.familyId,
      programCode: this.selectedProgram.code,
      chapterCode: this.selectedChapterCode,
      paymentFlag: false,
      personTypeCheckRequiredFlag: true
    }

     let personData:any = await this.classRgiSrvice.getPersonList(param);
     this.personsList = personData.personProgramList;
     this.personUserData = personData.user;
     let data = personData;
     localStorage.setItem('selectMember', JSON.stringify(data.user));
     this.personsList = data['personProgramList'];
     this.adultsList = data.personProgramList.filter((personObj: any) => {
       return personObj.personType === 'ADULT';
     })
     this.childrenList = data.personProgramList.filter((personObj: any) => {
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
       
       let sortedPersonId = this.getSortedData(data.personProgramList, 'personID');
       // this.SelectedMemData = sortedPersonId[sortedPersonId.length - 1];
       if(data.personProgramList.length==1){
         this.selectedMember= (data.personProgramList[0].firstName+data.personProgramList[0].lastName);
         localStorage.setItem('selectMember', JSON.stringify(data.personProgramList[0]));

       }else{
         let memberRadio = JSON.parse(localStorage.getItem('selectMember') || '');
         this.selectedMember= (memberRadio.firstName+memberRadio.lastName);
       }
     }
    
     this.getCategoriesList();

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


  selectedUserData:any;
  onMemberChange(e: any, user:any) {
    //this.blurLayer=true;
    this.SelectedMemData = e;
    localStorage.setItem('selectMember', JSON.stringify(user));
    this.getCategoriesList();
    this.selectCheckBox();
   // console.log(this.formGroup.value);
  }

  async getCategoriesList(){
    this.selectedUserData = JSON.parse(localStorage.getItem('selectMember') || '');
    let userData:any={
      familyId: this.selectedUserData.familyId,
      personId:this.selectedUserData.personID,
      code: this.selectedUserData.chapterCode,
      programCode: this.selectedProgram.code,
      persontype: this.selectedUserData.personType,
      code_type: '',
      grade: this.selectedUserData.grade
     };

     let data:any = await this.classRgiSrvice.fetchCategoriesList(userData);
     this.categoryWiseList = data;
  }

  menuAccordionFlag:any={};
  accordionMenu(index:any){
    this.menuAccordionFlag={
      [index]: !this.menuAccordionFlag[index]
    }
  }

  selectedItem:any={};
  disableCheckBoxItem:any ={}
  selectCheckBox(){
      
    let memberRadio = JSON.parse(localStorage.getItem('selectMember') || '');
    this.checkboxModel={};
    this.selectedItem={};
    this.disableCheckBoxItem={};
      //if(this.programCode != "CSGC_2024"){
      for(var i=0; i<this.pendingPaymentData.length; i++){
        if(memberRadio.personID==this.pendingPaymentData[i].personID  && (this.pendingPaymentData[i].paymentStatus=="BALANCE_DUE" || this.pendingPaymentData[i].paymentStatus=="NO_DUES")
        && (this.pendingPaymentData[i].registrationStatus=="PENDING" || this.pendingPaymentData[i].registrationStatus=="ACCEPTED") && (this.pendingPaymentData[i].paymentSubmittedDate==null || this.pendingPaymentData[i].paymentSubmittedDate=='')) {
          this.checkboxModel[this.pendingPaymentData[i].signUpCode] =true;
          this.disableCheckBoxItem[this.pendingPaymentData[i].signUpCode] =false;
          
        } else if(memberRadio.personID==this.pendingPaymentData[i].personID  
        && (this.pendingPaymentData[i].paymentStatus=="PRE-AUTH_SUCCESS" || this.pendingPaymentData[i].paymentStatus=="PARTIAL_PAYMENT" || this.pendingPaymentData[i].paymentStatus=="NO_DUES" || this.pendingPaymentData[i].paymentStatus=="PAID")
        && this.pendingPaymentData[i].paymentSubmittedDate!=null && this.pendingPaymentData[i].paymentSubmittedDate!=''){
          this.checkboxModel[this.pendingPaymentData[i].signUpCode] =true;
          this.disableCheckBoxItem[this.pendingPaymentData[i].signUpCode] =true;
        }

     // }
    }
  }

  checkboxTick:any=false;
  choiceClass:any;
  checkboxModel:any={};
  accordOpenFlag:string='';
  onClassCheck(e: any, i: number, j:number, ngmodel:any, categoryName:any, allCls:any) {
    this.accordOpenFlag='';
    var ngmodelcheck:any = ngmodel;
    this.choiceClass=ngmodel;

    if (e.target.checked) {
     this.getClassAmount(e.target.value, ngmodelcheck, categoryName);
     
    }else{
      this.uncheckDelete(ngmodelcheck);
    }
    
  }

  uncheckDelete(uncheckData:any){
    let uncheckedList:any;
    let index:any=0;
   for(var i=0; i<this.pendingPaymentData.length; i++){
    if(this.pendingPaymentData[i].signUpCodeDescription == uncheckData.description &&  this.pendingPaymentData[i].signUpCode == uncheckData.signUpCode){
      uncheckedList = this.pendingPaymentData[i];
      index=i;;
    }
   }
   this.deletePersonProgramReg(uncheckedList, index)
  }

  objectKeys:any;
  rightPanelAccordionNotPaid:any;
  pendingAmtList:any=[];
  async getPersonProgramRegistration(ind_change:any) {

    const body = {
      programCode: this.selectedProgram.code, 
      chapterCode: this.selectedUserData.chapterCode,
      familyId: this.selectedUserData.familyId,
      paymentFlag: false,
      sessionFlag: true
    }
    let data:any = await this.classRgiSrvice.fetchPersonProgramRegistrationList(body);

        this.personProgramRegData = data;
        this.pendingAmtList = await this.filterPaymentByStatusAmount(data.personProgramRegistrationList, "PENDING");
        this.pendingPaymentData = await this.filterPaymentByStatus(data.personProgramRegistrationList, "PENDING");
        this.selectCheckBox();
        this.callFilterData();
        //this.fetchFamilySessionPreference();
       this.sessionCtrl(this.pendingPaymentData, ind_change);
        this.rightPanelAccordionNotPaid = this.callPaymentPanel(this.pendingPaymentData, 'personName','stagePaid');
        if(Object.keys(this.rightPanelAccordionNotPaid).length>0){ this.TotalValPendingData(); }
        this.objectKeys = Object.keys(this.rightPanelAccordionNotPaid);
     
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
    let total  =0;
    //let sortData = this.reviewTabData?.userProgramList.sort((a:any, b:any) => a.personID - b.personID);
    this.rightPanel[type].filter( (item:any, index:any, self:any) =>{
            
        if(self.indexOf(item) ===index){
        total = ((this.pendingReviewTotalAmt[type].length==0)?0: this.pendingReviewTotalAmt[type][0])+item.amount;
        if(this.pendingReviewTotalAmt[type].length==0){this.pendingReviewTotalAmt[type].push(total);}else{ this.pendingReviewTotalAmt[type][0] = total; }
       }       
    });
    console.log(this.pendingReviewTotalAmt);

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
  for (let i = 0; i < this.personsList.length; i++) {
    if (this.personsList[i].personID === personID) {
      return this.personsList[i];
    }
  }
  return null;
}

questionURL(url:any){
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
          this.formGroup.addControl(fetChoiceData[i].fullName+'_'+fetChoiceData[i].signUpCode+'_'+index, ctrl);
          if(index!=0){
            this.formGroup.controls[fetChoiceData[i].fullName+'_'+fetChoiceData[i].signUpCode+'_'+index].disable();
          }
          this.formGroup.controls[fetChoiceData[i].fullName+'_'+fetChoiceData[i].signUpCode+'_'+index].setValue('');
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
          this.formGroup.addControl(fetChoiceData[i].fullName+'_'+fetChoiceData[i].signUpCode+'_'+index, ctrl);
          if(index!=0 && this.formGroup.controls[fetChoiceData[i].fullName+'_'+fetChoiceData[i].signUpCode+'_'+(index-1)].value==''){
            this.formGroup.controls[fetChoiceData[i].fullName+'_'+fetChoiceData[i].signUpCode+'_'+index].disable();
          }else if(index!=0 && this.formGroup.controls[fetChoiceData[i].fullName+'_'+fetChoiceData[i].signUpCode+'_'+(index-1)].value!='' ){
            this.formGroup.controls[fetChoiceData[i].fullName+'_'+fetChoiceData[i].signUpCode+'_'+index].enable();
          }
        });
          this.familySessionData[fetChoiceData[i].personName+'_'+fetChoiceData[i].signUpCode]= [];
       this.familySessionData[fetChoiceData[i].personName+'_'+fetChoiceData[i].signUpCode] = mergedArray;
            }
      
    }
    this.selectedChoice();

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

  async deleteSessionChoice(personData:any, i:any, event:any, item:any){
    if(i==0 && personData.familySessionPreference.length>0){
      let paramSession={
        signupCode:personData.signUpCode,
        programCode:this.selectedProgram.code,
        familyId: this.selectedUserData.familyId,
        personId: personData.personID
      };

       
      let resData:any = await this.classRgiSrvice.deleteFamilySessionPreference(paramSession);
      if(resData?.flag){
        for(let k=0; k<this.familySessionData[personData.personName+'_'+personData.signUpCode].length; k++){
          if(k!=i){
            this.formGroup.controls[personData.fullName+'_'+personData.signUpCode+'_'+k].setValue('');
          }
        }
        this.sessionChoice(personData, i, event);
      }
    }else{
      this.sessionChoice(personData, i, event);
    }
    
    
  }
    
  
   async sessionChoice(personData:any, i:any, event:any){
      let body:any={
        familyId: this.selectedUserData.familyId,
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
    
     let data = await this.classRgiSrvice.saveSessionPreferrence(body)       
    this.getPersonProgramRegistration('index_change');
       
    }

    deletePersonProgramReg(pendData:any,i:any){
    
      const body = {
        registrationId: pendData.registrationId,
        personId: pendData.personID,
        signUpCode: pendData.signUpCode,
        programCode: pendData.programCode
      }
     let deleteResData = this.classRgiSrvice.deleteProgramRegistration(body)
          this.checkboxModel[pendData.signUpCode]=false;
  
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
     
        let body ={
          familyId: this.selectedFamily.familyId,
          programCode: this.selectedProgram.code,
          chapterCode: this.selectedChapterCode,
          paymentFlag:false
        };
       let res = await this.classRgiSrvice.fetchSaveProgramConfigurationFields(body) 
       this.familyFlag=res;
       this.programConfigurationFields = res;
       await this.prepareTabs();
      
     }

     async prepareTabs(){
      this.programRegistrationList=[];
      //this.currentTabIndexVal=0;
      this.currentTab = "Registration";
      this.programRegistrationList.push("Registration");
      if(this.programConfigurationFields.showProfileFieldsFlag && this.programConfigurationFields.showProfileFieldsFlag==1){
        this.programRegistrationList.push("Additional Details");
      }
  
      if(this.programConfigurationFields.healthInfoFlag && this.programConfigurationFields.healthInfoFlag==1){
       this.programRegistrationList.push("Health Information");
      }
      
      if(this.programConfigurationFields.volunteerSignupFlag && this.programConfigurationFields.volunteerSignupFlag==1){
        this.programRegistrationList.push("Time Slots signup");
      }
      this.programRegistrationList.push("Review");
      this.programRegistrationList.push("Consent");
      this.programRegistrationList.push("Payment");
     this.groupmenuArray();
    }

    programGroupMenu:any=[]
    groupmenuArray(){
      this.programGroupMenu=[];
      const arr :any = this.programRegistrationList;
      var group:any = [];
      let n =3;
    for (var i:any = 0, end = arr.length / n; i < end; ++i){
      group.push(arr.slice(i * n, (i + 1) * n));
    //return group;
    }
    this.programGroupMenu = group;
  
     }

     prerequsiteData:any='';
  prerequsiteDatalength:any='';
  async FetchreviewPrerequisites(){
   
    let param={
      familyId: this.selectedUserData.familyId,
      programCode: this.selectedProgram.code,
      chapterCode: this.selectedUserData.chapterCode   
    };
    let data:any = await this.classRgiSrvice.FetchreviewPrerequisites(param);
    this.prerequsiteData = data;
    this.prerequsiteDatalength = Object.keys(data).length;

    if(this.prerequsiteData?.prerequisitesFlag && this.prerequsiteData?.validationErrors.length==0){
      this.onSaveAndNext("");
    }else{
      scrollTop();
    }
  }

  currentTabIndexVal:any=0;

  onSaveAndNext(ev:any){
    sessionStorage.removeItem('fetchupdateResponse');
     if(this.currentTab=="Registration"){
      // this.reviewandupdateWaitList();
     }
     let index=this.programRegistrationList.indexOf(this.currentTab)+1;
     this.currentTabIndexVal = index;
     if(index>this.programRegistrationList.length){
       index=this.programRegistrationList.length;
     }
     
     this.currentTab=this.programRegistrationList[index];
     //this.tabMethodCall(this.currentTab);
    
   }

   pledgeMsg:boolean=false;
   pledgeMsg_1:boolean=false;
   pledgeAmt:any=0;
   prerqusitevalidMsg:string='';
  async getClassAmount(signupCode: string, ngmodelName:any, categoryName:any) {
    this.pledgeMsg=false;
    this.pledgeMsg_1=false;
    this.selectedUserData = JSON.parse(localStorage.getItem('selectMember') || '');
    const body = {
      signupCode: signupCode,
      code: this.selectedUserData.chapterCode,
      duesStructureCode: "",
      programCode: this.selectedProgram.code,
      familyId: this.selectedUserData.familyId,
      personId: this.selectedUserData.personID
    }
    
    let data:any = await this.classRgiSrvice.getClassAmount(body);
        this.pledgeAmt = data;
        this.prerqusitevalidMsg='';
        if(data.prerequsite==true && data.validation==true){
          this.onSubmit(ngmodelName, categoryName, data);
          return;
        }else if(data.prerequsite==false && data.validation==true){
         this.prerqusitevalidMsg = data.prerequsiteMessage;
         this.checkboxModel[ngmodelName.signUpCode] =false;
        }else if(data.validation==false && data.prerequsite==true){
          this.prerqusitevalidMsg=data.validationMessage;
          this.checkboxModel[ngmodelName.signUpCode] =false;
        }else if(data.validation==false && data.prerequsite==false){
          this.prerqusitevalidMsg=data.validationMessage;
          this.checkboxModel[ngmodelName.signUpCode] =false;
        }
        else{
          this.checkboxModel[ngmodelName.signUpCode] =false;
          this.pledgeMsg=true;
        }
     
  }

  async onSubmit(clsName:any, categoryName:any, amtData:any) {
    
    this.selectedUserData = JSON.parse(localStorage.getItem('selectMember') || '');
    var body:any ={
      user: {
        password: this.personUserData.password,
        familyID: this.personUserData.familyID,
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
       if(submitData){
        this.getPersonProgramRegistration('');
        this.fetchFamilyFlag();
       this.scrollToViewSession('');   
       }
              
  }

  scrollToViewSession (name:any){
    let selectedUserDataSess = JSON.parse(localStorage.getItem('selectMember') || '');
    this.accordOpenFlag = (name!='')?name :(selectedUserDataSess.firstName+selectedUserDataSess.lastName);
    let elem:any =  document.getElementById('head_'+this.accordOpenFlag);
    elem.scrollIntoView();
  }

  async moveNextTab(){
   
    this.validateSession();   
} 

validateSession(){
let Adult_Flag= true;
 let takeName='';
  for(let item in this.formGroup.controls){
     if(item.includes('_')){
      if(this.formGroup.controls[item].value==''){
        takeName=item;
        Adult_Flag=false;
      }
     }
  }

if(Adult_Flag){
  //this.FetchreviewPrerequisites();
  this.routePass.sendData('Registration');

}else{
  Swal.fire({
    // position: 'top-end',
     icon: 'error',
     title: 'Please Select Sessions.',
     showConfirmButton: true,
     //timer: 1500
   }).then((result) => {
    if (result.isConfirmed) {
      this.scrollToViewSession(takeName.split('_')[0]);
    } 
  });
}
}

ngOnDestroy(){
  // clear message
  this.routePass.clearData();
}

}
