import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';
import { HttpClient, HttpUrlEncodingCodec, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ProgramService } from 'src/app/modules/chinmaya-shared/services/program/program.service';
import { AuthService } from 'src/app/modules/auth';
import Swal from 'sweetalert2'
import { MasterService } from 'src/app/modules/chinmaya-shared/services/master/master.service';
import { FamilyService } from 'src/app/modules/chinmaya-shared/services/family/family.service';
import { StoreService, KEYS } from 'src/app/modules/chinmaya-shared/services/store/store.service';
declare function scrollTop():any;

@Component({
  selector: 'app-family-member-details',
  templateUrl: './family-member-details.component.html',
  styleUrls: ['./family-member-details.component.scss']
})
export class FamilyMemberDetailsComponent {
  CreateAccountForm:FormGroup;
  yesNoObj={
    Yes:'Yes',
    No:'No'
  }
  relatedPersonId:any="";
  relationCode:any="";
  relatedPersonId1:any="";
  relationCode1:any="";
  CustodyIssue:any='0';
  
  dataReceived:any;
  personUpdateData:any;
  credentialCheck:any='No';
  dependentUsername:any;
  loadingImage: boolean=false;
  showRelationshipError: any=false;
  action: string='Add';
  mobileCheckFlag:boolean=false;
  schoolGradesList: any;
  familyId: any;
  programCode: any;
  chapterCode: any;
  personID:any;
  currentUserData:any;
  selectedFamilyMember:any;
  selectedChapterCode:any;
  selectedFamily:any;
  get zipCode() {
    return this.CreateAccountForm.get('zipCode')!;
  }

  // get relationList(){
  //   return this.CreateAccountForm.get('relationList') as FormArray;
  // }

  get CAF(): { [key: string]: AbstractControl } {
    return this.CreateAccountForm.controls;
  }

  constructor(private router:Router, private route: ActivatedRoute, private http:HttpClient, 
    private authService:AuthService, private fb:FormBuilder, private renderer:Renderer2,
    private programService:ProgramService, private MasterService:MasterService,  
    private familyService: FamilyService, private store:StoreService) {
    this.CreateAccountForm = this.fb.group({
      personID: new FormControl(0),
      firstName: new FormControl('',[Validators.required]),
      middleName: new FormControl(''),
      lastName: new FormControl('',[Validators.required]),
      gender: new FormControl('',[Validators.required]),
      phoneNumber: new FormControl('',[Validators.required]),
      emailAddress:new FormControl('',[Validators.required, Validators.pattern(/.+@.+\..+/)]),
      homePhone: new FormControl('',[Validators.required]),
      memberSince:new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required]),
      address2: new FormControl(''),
      address3: new FormControl(''),
      city: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]),
      zipCode: new FormControl('',[Validators.required, Validators.pattern(/^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/)]),
      status:new FormControl('Active',[Validators.required]), 
      personType: new FormControl('ADULT',[Validators.required]),
      maritalStatus:new FormControl('Married',[Validators.required]),
      sphomePhoneFlag: new FormControl(null),
      mobileFlag: new FormControl(null),
      relationShipPrimaryContact:new FormControl('',[Validators.required]),
      livingAtHomeAddress:new FormControl('1'),
      dependentUsername:new FormControl({value:'',disabled:false}),
      credentialCheck:new FormControl('No'),
      schoolGrade:new FormControl("",[Validators.required]),
      relationCode: new FormControl(''),
      relatedPersonId: new FormControl(''),
      relationCode1: new FormControl(''),
      relatedPersonId1: new FormControl(''),
      CustodyIssue:new FormControl('No'),
      dateOfBirth:new FormControl("",[Validators.required]),
      risingSchoolGrade:new FormControl("",[Validators.required])
      // relationList:this.fb.array([
      //   this.fb.group({
      //     id:0,
      //   relationCode: new FormControl(''),
      //   relatedPersonId: new FormControl('')
      //   }),
      //   this.fb.group({
      //     id:0,
      //     relationCode: new FormControl(''),
      //     relatedPersonId: new FormControl('')
      //     })
      // ])
      });
      
      //this.CreateAccountForm.controls['personType'].disable();
      //this.personUpdateData = this.router.parseUrl(this.router.url).queryParams[personId] || '';

   }
   arrayTime1:any;
   readOnlyFlag:boolean=false;
   editFamilyFlag:number=0;
  async ngOnInit(): Promise<void> {
    this.selectedFamily = this.familyService.getSelectedFamily();
    this.selectedFamilyMember =  this.familyService.getSelectedFamilyMember()
    console.log(this.selectedFamily);
    if(this.selectedFamilyMember!==undefined && this.selectedFamilyMember!=null){
      this.editFamilyFlag = Object.keys(this.selectedFamilyMember).length;
    }
    this.action='Add';
    if(this.editFamilyFlag>0){
      this.personUpdateData  =  this.selectedFamilyMember.personID;
      this.action='Edit';
    }else{
      this.personUpdateData=this.selectedFamily?.personID;
    }
      let logedInUserData = this.selectedFamily;
      this.currentUserData= logedInUserData;
      this.selectedChapterCode = this.store.getValue(KEYS.chapter);

      this.familyId= this.currentUserData?.familyId;
      this.personID = this.currentUserData?.personID;
      this.chapterCode = this.selectedChapterCode;
    //scrollTop();
    
    console.log(this.currentUserData);
    this.dataReceived=this.currentUserData;
   
    // this.arrayTime1 = this.CreateAccountForm.get('relationList');
    await  this.fetchpersonTypeList();
    await  this.fetchSchoolGradeList();
    await  this.fetchstateList();
    await  this.fetchstatus();
    await  this.fetchmaritalStatus();
    await  this.fetchgender();
    await  this.fetchRelationshipPrimaryContactList();
    await  this.fetchParentDataList();
    await  this.fetchAdultPersonData();
    await  this.fetchCustodyListData();
    await  this.fetchYesorNoList();
    
    this.CreateAccountForm.controls['state'].disable();
    if(this.action=='Edit'){ this.fetchUpdatePerson(); }else { this.fetchUpdatePerson(); }

    if(this.editFamilyFlag>0){
      
      this.credentialCheck = 'Yes';
    }else{
      this.CreateAccountForm.controls['personType'].setValue('');
    }

      this.CreateAccountForm.controls['lastName'].setValue(this.dataReceived.lastName);
      await this.fetchSchooldGradeLabel();
  }

  personTypeList:any;

  tabOne:boolean=true;
  tabTwo:boolean=false;
  tabThree:boolean=false;

  proceedtonext(tab:any){
    this.tabOne = false;
  this.tabTwo = false;
  this.tabThree = false;
  let formValidate = this.CreateAccountForm.getRawValue();
  let dateOfBirth = (formValidate.schoolGrade!='18') ? true : (formValidate.dateOfBirth!='' ) ? true :false; 
  scrollTop();
  if ((tab === 'tabTwo' && this.personTypeVal === 'CHILD')) {
    let rasiginGradeFlag = (formValidate.schoolGrade==19 && formValidate.risingSchoolGrade=='')?false:true;

    if(formValidate.firstName!='' && formValidate.lastName!='' && formValidate.status!='' && formValidate.personType!='' && formValidate.gender!='' && formValidate.schoolGrade !='' && dateOfBirth && rasiginGradeFlag){
      this.validateFlag=false;
      this.tabTwo = true;
    }else{
      this.tabOne = true;
      this.CreateAccountForm.markAsTouched();
      this.validateFlag=true;
    }
  } else if (tab === 'tabTwo' && this.personTypeVal !== 'CHILD') {
    if(formValidate.firstName!='' && formValidate.lastName!='' && formValidate.status!='' && formValidate.personType!='' && formValidate.gender!='' && formValidate.maritalStatus!=''){
      this.validateFlag=false;
      this.tabThree = true;
    }else{
      this.tabOne = true;
      this.CreateAccountForm.markAsTouched();
      this.validateFlag=true;
    }
   
  } else if (tab === 'tabThree') {
    if(this.relationCode!='' && this.relatedPersonId!=''){
      this.relationCodeError=false;
      this.relatedPersonIdError=false;
       
      if(!this.isParentRelationshipRequired()){
        this.relatedPersonId1Error=false;
        this.relationCode1Error=false;
        this.tabThree = true;
      }else if(this.relationCode1!='' && this.relatedPersonId1!=''  && !this.showRelationshipError){
        this.relatedPersonId1Error=false;
        this.relationCode1Error=false;
        this.tabThree = true;
      }else {
        this.tabTwo = true;
      this.CreateAccountForm.markAsTouched();
        if(this.relationCode1!=''){
          this.relationCode1Error=false;
        }else{
          this.relationCode1Error=true;
        }
        if(this.relatedPersonId1!=''){
          this.relatedPersonId1Error=false;
        }else{
          this.relatedPersonId1Error=true;
        }
      }
      
    }else{
      this.tabTwo = true;
      this.CreateAccountForm.markAsTouched();
      if(this.relationCode!=''){
        this.relationCodeError=false;
      }else{
        this.relationCodeError=true;
      }

      if(this.relatedPersonId!=''){
        this.relatedPersonIdError=false;
      }else{
        this.relatedPersonIdError=true;
      }
     
    if(this.relationCode1!=''){
      this.relationCode1Error=false;
    }else{
      this.relationCode1Error=true;
    }
    if(this.relatedPersonId1!=''){
      this.relatedPersonId1Error=false;
    }else{
      this.relatedPersonId1Error=true;
    }
      
    }
  }
}

  backToPrev(tab:any){
    this.tabOne = false;
    this.tabTwo = false;
    this.tabThree = false;
    if(tab=='tabOne'){
      this.tabOne = true;
    }
    if(tab=='tabTwo'){
      this.tabTwo = true;
    }
  }

  canShowUserNameField(){
    let retValue=false;
    if(this.CreateAccountForm.value.credentialCheck=='Yes' || (this.action=='Edit' && this.fetchPersonUpdateResponse?.dependentUsername)){
      retValue=true;
    }

    if(this.CreateAccountForm.value.credentialCheck=='Yes'){
      this.CreateAccountForm.get('dependentUsername')?.enable();
    }

    return retValue
  }

  onCredentialCheckChange(ev:any){
    let value=ev.target.value;
    let control = this.CreateAccountForm.controls['dependentUsername']
    if(value=="Yes"){
      this.CreateAccountForm.setValidators(Validators.required);
      this.CreateAccountForm.updateValueAndValidity();
    }
    else{
      this.CreateAccountForm.setValidators(Validators.nullValidator);
      this.CreateAccountForm.updateValueAndValidity();
    }
  }
  
  async fetchpersonTypeList(){
    this.personTypeList = await this.MasterService.getPersonType();
  }

  stateList:any;
 async fetchstateList(){
    this.stateList = await this.MasterService.fetchstateList();
  }

  statusList:any;
  async fetchstatus(){
    this.statusList = await this.MasterService.getStatus()
  }

  maritalStatusList:any;
  async fetchmaritalStatus(){
    this.maritalStatusList = await this.MasterService.getMaritialStatusList();
  }
  fetchGenderList:any;
 async fetchgender(){
    this.fetchGenderList = await this.MasterService.fetchGenderList();
  }

  fetchPrimaryContactList:any;
  async fetchRelationshipPrimaryContactList(){
    this.fetchPrimaryContactList = await this.MasterService.fetchRelationshipPrimaryContactList();
  }

  fetchCustodyData:any;
 async fetchCustodyListData(){
    this.fetchCustodyData = await this.MasterService.fetchCustodyList();
  }

  fetchYesorNO:any;
  async fetchYesorNoList(){
   this.fetchYesorNO = await this.MasterService.fetchfetchYesorNo();
  }

  fetchParentList:any;
  async fetchParentDataList(){
    this.fetchParentList =  await this.MasterService.fetchRelationshipListForChild();
  }

  fetchAdultPersons:any;
  async fetchAdultPersonData(){
    let param = {
        familyId: this.familyId,
        programCode: 0,
        chapterCode: 0,
        paymentFlag: false,
        personId: this.dataReceived.personID
    }
    this.fetchAdultPersons = await this.MasterService.fetchAdultPersonList(param);
  }

  phoneNum(){
    if(this.CreateAccountForm.controls['phoneNumber'].value.length==14){
      this.CreateAccountForm.controls['mobileFlag'].enable();
    } else{
      this.CreateAccountForm.controls['mobileFlag'].disable();
      this.CreateAccountForm.controls['mobileFlag'].setValue('');
    }
  }

   personTypeVal:any;
   useChildEmrgencyFlag:boolean=false;
  async fieldInterChange(event:any){
    this.personTypeVal = event.target.value;
    this.useChildEmrgencyFlag = false;
    if(this.editFamilyFlag==0){
      this.readOnlyFlag = true;
      this.CreateAccountForm.controls['state'].disable();
     }else if(this.editFamilyFlag>0){
      this.readOnlyFlag = (this.personTypeVal=='ADULT' && this.fetchPersonUpdateResponse.personID==this.dataReceived.personID && this.fetchPersonUpdateResponse.primaryContact=='1')?false:true;
     }

     if(this.personTypeVal=='CHILD'){
      this.CustodyIssue = (this.fetchPersonUpdateResponse.CustodyIssue==null?'0':this.fetchPersonUpdateResponse.CustodyIssue);
     this.CreateAccountForm.controls['schoolGrade'].setValue("");
     this.CreateAccountForm.controls['phoneNumber'].setValue("");
     this.CreateAccountForm.controls['mobileFlag'].disable();
     this.CreateAccountForm.controls['mobileFlag'].setValue('');
     this.useChildEmrgencyFlag = true;
     await this.fetchAdultPersonData();
    }else{
      this.CreateAccountForm.controls['mobileFlag'].enable();
    }

    if(this.personTypeVal=='YOUTH'){
      this.CreateAccountForm.controls['maritalStatus'].setValue('Single');
    }
  
  }

  

  fetchPersonUpdateResponse:any;
  primaryContact:any;
  isParentRelationshipRequired(){
    if(!this.fetchAdultPersons){
      return false;
    }

    if(this.fetchAdultPersons.selectDropdownList.length>1){
      return true;
    }

    return false;
  }

  isParentRelationshipRequiredFlag(){
    if(!this.fetchAdultPersons){
      return false;
    }

    if(this.fetchAdultPersons.selectDropdownList.length>1 || this.fetchAdultPersons.selectDropdownList.length==1){
      return true;
    }

    return false;
  }

  retainSavedData(stateVal:any){
    if(stateVal==null || stateVal==undefined){
      return '';
    }

    let Stateflag= false;
    this.stateList.filter((item:any) => {
      if(item.code==stateVal){
        Stateflag=true;
      }
    });

    return Stateflag;

  }

  async fetchUpdatePerson(){
    let param={
      personID: (this.editFamilyFlag>0) ? this.personUpdateData: this.dataReceived.personID
    }
    
    
    let response:any = await this.MasterService.FetchUpdatePersonData(param);
      this.fetchPersonUpdateResponse = response;
      this.primaryContact=(this.editFamilyFlag>0)?response.primaryContact:0;
      this.personTypeVal=response.personType;
      let statePop = this.retainSavedData(response.state);
      sessionStorage.setItem('profileData', JSON.stringify(response));
      if(this.action == 'Edit'){
        this.CreateAccountForm.controls['personID'].setValue(param.personID)
        this.downloadFile({personId:response.personID,documentID:response.documentID});
      }
       if(this.editFamilyFlag>0){
        this.readOnlyFlag = (this.personTypeVal=='ADULT' && this.fetchPersonUpdateResponse.personID==this.dataReceived.personID && this.fetchPersonUpdateResponse.primaryContact=='1')?false:true;
        if(!this.readOnlyFlag){
          this.CreateAccountForm.controls['state'].enable();
        }
 
      }


      if(this.editFamilyFlag>0){
        if(this.primaryContact!='1'){
          this.CreateAccountForm.controls['personType'].enable();
        }else{
         // this.CreateAccountForm.controls['personType'].disable();
        }
        this.CreateAccountForm.controls['firstName'].setValue(response.firstName);
     this.CreateAccountForm.controls['middleName'].setValue(response.middleName);
     this.CreateAccountForm.controls['lastName'].setValue(response.lastName);
     this.CreateAccountForm.controls['gender'].setValue(response.gender);
     this.CreateAccountForm.controls['emailAddress'].setValue(response.emailAddress),
     this.CreateAccountForm.controls['phoneNumber'].setValue((response.phoneNumber==null)?'':response.phoneNumber.replace(/\D/g, '').replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3'));
     this.CreateAccountForm.controls['homePhone'].setValue((response.homePhone==null)?'':response.homePhone.replace(/\D/g, '').replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3'));
     this.CreateAccountForm.controls['address'].setValue(response.address);
     this.CreateAccountForm.controls['address2'].setValue(response.address2);
     this.CreateAccountForm.controls['address3'].setValue(response.address3);
     this.CreateAccountForm.controls['city'].setValue(response.city);
     this.CreateAccountForm.controls['state'].setValue((statePop)?response.state:'');
     this.CreateAccountForm.controls['zipCode'].setValue(response.zipCode);
     this.CreateAccountForm.controls['status'].setValue(response.status);
     this.CreateAccountForm.controls['personType'].setValue(response.personType);
     this.CreateAccountForm.controls['maritalStatus'].setValue(response.maritalStatus);
     this.CreateAccountForm.controls['sphomePhoneFlag'].setValue(response.sphomePhoneFlag);
     this.CreateAccountForm.controls['memberSince'].setValue(response.memberSince);
     this.CreateAccountForm.controls['mobileFlag'].setValue(response.mobileFlag);
     this.CreateAccountForm.controls['relationShipPrimaryContact'].setValue(response.relationShipPrimaryContact?response.relationShipPrimaryContact:(response.relationShipPrimaryContact==null)?"":"");
     this.CreateAccountForm.controls['dependentUsername'].setValue(response.dependentUsername);
     this.CreateAccountForm.controls['schoolGrade'].setValue(response.schoolGradeCode);
     this.CreateAccountForm.controls['dateOfBirth'].setValue(response.dateOfBirth);
     this.CreateAccountForm.controls['risingSchoolGrade'].setValue((response.risingSchoolGradeCode!=undefined && response.risingSchoolGradeCode!=null)?response.risingSchoolGradeCode:'');

    // this.CreateAccountForm.controls['CustodyIssue'].setValue(response.dependentUsername);
    this.credentialCheck =(response.dependentUsername==null)?'No':'Yes';
     this.dependentUsername = response.dependentUsername;
     if(this.personTypeVal=='CHILD'){
      this.CustodyIssue = (response.CustodyIssue==null?'0':response.CustodyIssue);
      if(response.relationList[0]!=undefined){
        this.relationCode=response.relationList[0].relationCode;
        this.relatedPersonId=response.relationList[0].relatedPersonId;
      }
      if(response.relationList[1]!=undefined){
        this.relationCode1=response.relationList[1].relationCode;
        this.relatedPersonId1=response.relationList[1].relatedPersonId;
      }
      this.useChildEmrgencyFlag = true;
      this.CreateAccountForm.controls['mobileFlag'].disable();
     this.CreateAccountForm.controls['mobileFlag'].setValue('');
     }
     if( this.CreateAccountForm.value.schoolGrade !=''){
      this.changeOfSchoolGrade();
      }
      }else{
        this.AddFamliyMemberDatapopulate()
      }

      // If personId is present then we are in edit mode otherwise in add mode.
      if(this.editFamilyFlag>0){
        this.CreateAccountForm.controls['sphomePhoneFlag'].setValue("1");
      }

      if(response.dependentUsername){
        this.CreateAccountForm.get('dependentUsername')?.disable();
       }
       else{
        this.CreateAccountForm.get('dependentUsername')?.enable();
       }
    
   
    }

    isNullUndefined(val:any){
    return (val!=undefined && val!=null && val!='')?val:'';
    }

    AddFamliyMemberDatapopulate(){
      if(this.editFamilyFlag==0){
        this.readOnlyFlag = true;
        this.CreateAccountForm.controls['state'].disable();
       }

      let  response = this.fetchPersonUpdateResponse;
      this.fetchPersonUpdateResponse = response;
      this.primaryContact='';
      this.personTypeVal=response.personType;
      this.CreateAccountForm.controls['lastName'].setValue(this.isNullUndefined(response.lastName));
      this.CreateAccountForm.controls['gender'].setValue(this.isNullUndefined(response.gender));
      this.CreateAccountForm.controls['emailAddress'].setValue(''),
     this.CreateAccountForm.controls['homePhone'].setValue((response.homePhone==null)?'':response.homePhone.replace(/\D/g, '').replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3'));
     this.CreateAccountForm.controls['address'].setValue(this.isNullUndefined(response.address));
     this.CreateAccountForm.controls['address2'].setValue(this.isNullUndefined(response.address2));
     this.CreateAccountForm.controls['address3'].setValue(this.isNullUndefined(response.address3));
     this.CreateAccountForm.controls['city'].setValue(this.isNullUndefined(response.city));
     this.CreateAccountForm.controls['state'].setValue(this.isNullUndefined(response.state));
     this.CreateAccountForm.controls['zipCode'].setValue(this.isNullUndefined(response.zipCode));
     this.CreateAccountForm.controls['relationShipPrimaryContact'].setValue(response.relationShipPrimaryContact?response.relationShipPrimaryContact:(response.relationShipPrimaryContact==null)?"":"");
     this.CreateAccountForm.controls['personType'].setValue('');
     this.CreateAccountForm.controls['schoolGrade'].setValue(this.isNullUndefined(response.schoolGradeCode));
     this.CreateAccountForm.controls['risingSchoolGrade'].setValue((response.risingSchoolGradeCode!=undefined && response.risingSchoolGradeCode!=null)?response.risingSchoolGradeCode:'');

     if(response.dependentUsername){
      this.CreateAccountForm.get('dependentUsername')?.disable();
     }
     else{
      this.CreateAccountForm.get('dependentUsername')?.enable();
     }

     if( this.CreateAccountForm.value.schoolGrade !=''){
      this.changeOfSchoolGrade();
      }
     setTimeout( ()=>{
      this.downloadPhoto='';
     this.loadingImage=false;
     },500);
    }

    isFormValid(){
      let retValue=false;

      if(this.CreateAccountForm.touched && this.CreateAccountForm.valid){
        //retValue=false;
      }

      return retValue;
    }
    relationCodeError=false;
    relatedPersonIdError=false;
    relationCode1Error=false;
    relatedPersonId1Error=false;
    dropdownModelCheck:any={};
    onRelationChange(event:any,dropDownName:any){
      let selectedDelation=event.target.value;
      
     // Object.assign(this.dropdownModelCheck, {[dropDownName]:event.target.value})

      (this as any)[dropDownName] = false;
      console.log(selectedDelation)
      this.showRelationshipError=false;
      if(this.relatedPersonId==this.relatedPersonId1 && this.relatedPersonId && this.relatedPersonId1){
        this.showRelationshipError=true;
      }
      else if(this.relationCode==this.relationCode1 && (this.relationCode.length!=0 && this.relationCode1.length!=0)){
        this.showRelationshipError=true;
      }

      if(selectedDelation.length==0 && this.isParentRelationshipRequired()){
        (this as any)[dropDownName] = true;
        //this[dropDownName]=true;
      }


    }



 
    // onRelation2Change(event:any){
    //   let selectedDelation=event.target.value;
    //   console.log(selectedDelation)
    //   this.showRelationshipError=false;
    //   if(this.relatedPersonId==this.relatedPersonId1){
    //     this.showRelationshipError=true;
    //   }
    //   else if(this.relationCode==this.relationCode1){
    //     this.showRelationshipError=true;
    //   }

    // }
  

  useremCheck_0(event:any){
    if(event.target.checked==true) {
     this.CreateAccountForm.controls['sphomePhoneFlag'].setValue('1');
     this.mobileCheckFlag = false;
    }else{
      this.CreateAccountForm.controls['sphomePhoneFlag'].setValue(null);

    }
  }

  useremCheck_1(event:any){
    if(event.target.checked==true) {
      this.CreateAccountForm.controls['mobileFlag'].setValue('1');
      this.mobileCheckFlag = false;
     }else{
       this.CreateAccountForm.controls['mobileFlag'].setValue(null);
     }
  }
  


  phoneValidate(ctrName:any){
    const phoneControl:AbstractControl = this.CreateAccountForm.controls[ctrName];
    
    phoneControl.valueChanges.subscribe(data => {
      
      /**the most of code from @Günter Zöchbauer's answer.*/

      /**we remove from input but: 
         @preInputValue still keep the previous value because of not setting.
      */
      let preInputValue:string = this.CreateAccountForm.value[ctrName];
      var lastChar:string = preInputValue.substr(preInputValue.length - 1);
      // remove all mask characters (keep only numeric)
      
        var newVal = data.replace(/\D/g, '');
     
      let start = this.renderer.selectRootElement('#'+ctrName).selectionStart;
      let end = this.renderer.selectRootElement('#'+ctrName).selectionEnd;
      //let start=this.phoneRef.nativeElement.selectionStart;
      //let end = this.phoneRef.nativeElement.selectionEnd;
      //when removed value from input
      if (data.length < preInputValue.length) {
      //  this.message = 'Removing...'; //Just console
      /**while removing if we encounter ) character,
        then remove the last digit too.*/
      if(preInputValue.length < start){
        if(lastChar == ')'){
          newVal = newVal.substr(0,newVal.length-1); 
        }
      }
      //if no number then flush
      if (newVal.length == 0) {
        newVal = '';
      } 
      else if (newVal.length <= 3) {
        /**when removing, we change pattern match.
        "otherwise deleting of non-numeric characters is not recognized"*/
        newVal = newVal.replace(/^(\d{0,3})/, '($1');
      } else if (newVal.length <= 6) {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
      } else {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
      }
     
      this.CreateAccountForm.controls[ctrName].setValue(newVal,{emitEvent: false});
       //keep cursor the normal position after setting the input above.
      this.renderer.selectRootElement('#'+ctrName).setSelectionRange(start,end);
    //when typed value in input
    } else{
     // this.message = 'Typing...'; //Just console
      var removedD = data.charAt(start);
    // don't show braces for empty value
    if (newVal.length == 0) {
      newVal = '';
    } 
    // don't show braces for empty groups at the end
    else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '($1)');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
    } else {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
    }
    //check typing whether in middle or not
    //in the following case, you are typing in the middle
    if(preInputValue.length >= start){
      //change cursor according to special chars.
     // console.log(start+removedD);
      if(removedD == '('){
        start = start +1;
        end = end +1;
      }
      if(removedD == ')'){
        start = start +2; // +2 so there is also space char after ')'.
        end = end +2;
      }
      if(removedD == '-'){
        start = start +1;
        end = end +1;
      }
      if(removedD == " "){
          start = start +1;
          end = end +1;
        }
      this.CreateAccountForm.controls[ctrName].setValue(newVal,{emitEvent: false});
      this.renderer.selectRootElement('#'+ctrName).setSelectionRange(start,end);
    } else{
        this.CreateAccountForm.controls[ctrName].setValue(newVal,{emitEvent: false});
        this.renderer.selectRootElement('#'+ctrName).setSelectionRange(start+2,end+2); // +2 because of wanting standard typing
    }
  }
  });
 }

 file!: File;
 downloadPhoto:any="assets/images/jellyfish.png";
 decodeImage(image:any){
  return new Promise((resolve,reject)=>{
      
    const reader = new FileReader();
    reader.onloadend = () => {
      this.downloadPhoto = reader.result;
      this.loadingImage=true;
      resolve(reader.result);
   };
   reader.readAsDataURL(image);
  })
 }

 async selectFile(event:any){
  this.file = event.target.files[0];
  let personID=this.CreateAccountForm.value.personID;

  var filesize = this.file.size/1024/1024;
  if(filesize>10){
    alert('File size is more than 10MB.');
    return;
  }  
  await this.decodeImage(this.file);
  if(!personID){
    return;
  }
  await this.uploadFile(this.file,personID)
}


 uploadFile(file:any,personId:any){
  return new Promise((resolve,reject)=>{
    let queryParam = '?documentID=0&personID='+personId+'&documentTypeCode=Person&tabName=Person';
    this.MasterService.upload('file/uploadFile',file, queryParam).subscribe(async (event: any) => {
    // if (typeof event === 'object') {
       // Short link via api response
       //var shortLink = event.link;
      // console.log(shortLink);
      // this.loading = false; // Flag variable
      await this.downloadFile(event);
      resolve("");
     //}
   });
  })
 
}

 
 async downloadFile(eve:any){
  this.loadingImage=true;
  if(!eve.documentID || eve.documentID==0){
    this.loadingImage=false;
    return;
  }
  let queryParam = '?documentID='+eve.documentID+'&personID='+eve.personId;
  this.MasterService.downloadUploadFile(queryParam).subscribe(response => {
    //this.downloadPhoto=URL.createObjectURL(response);;
    const reader = new FileReader();
    reader.onloadend = async() => {
      this.loadingImage=true;
      this.downloadPhoto = reader.result;
    };
    reader.readAsDataURL(response);
  
  },(err : HttpErrorResponse)=>{
    var msg = err.error;
    //alert(msg.message);
    
  });
 }

 

 validateRquired(){

    let formVal = this.CreateAccountForm.getRawValue();
    let dateOfBirth = (formVal.schoolGrade!='18') ? true : (formVal.dateOfBirth!='' ) ? true :false; 
    let  checkprimaryContacct = ((formVal.relationShipPrimaryContact=='' && this.editFamilyFlag>0 && this.primaryContact=='1')? true : (formVal.relationShipPrimaryContact=='' && this.editFamilyFlag==0) ? false : true);
  if(this.personTypeVal=='ADULT' && (formVal.firstName!='' && formVal.lastName!='' && formVal.status!='' && formVal.personType!='' && formVal.gender!='' && formVal.maritalStatus!='' && formVal.address!='' &&  checkprimaryContacct  && formVal.emailAddress!='' && formVal.city!='' && formVal.state!='' && formVal.zipCode!='') && (formVal.phoneNumber!='' && formVal.homePhone!='' && formVal.phoneNumber.length==14 && formVal.homePhone.length==14) && this.CAF['emailAddress'].status=='VALID'){
    return true;
  }else if(this.personTypeVal=='YOUTH' && (formVal.firstName!='' && formVal.lastName!='' && formVal.status!='' && formVal.personType!='' && formVal.gender!='' && formVal.maritalStatus!='' && formVal.address!='' && formVal.emailAddress!='' && formVal.city!='' && formVal.state!='' && formVal.zipCode!='') && (formVal.phoneNumber!='' && formVal.homePhone!='' && formVal.phoneNumber.length==14 && formVal.homePhone.length==14 && this.CAF['emailAddress'].status=='VALID')){
  return true;
  }else if(this.personTypeVal=='CHILD' && (formVal.firstName!='' && formVal.lastName!='' && formVal.status!='' && formVal.personType!='' && formVal.address!='' && formVal.city!='' && formVal.state!='' && formVal.zipCode!='') && (formVal.homePhone!=''  && formVal.homePhone.length==14) && formVal.schoolGrade!='' && formVal.risingSchoolGrade!='' && dateOfBirth ){
    this.useChildEmrgencyFlag=true;
    if(this.CreateAccountForm.controls['phoneNumber'].value.length!='' && this.CreateAccountForm.controls['phoneNumber'].value.length<14){
      this.useChildEmrgencyFlag=false;
      return false 
      }else return true

  }else{
    return false;
  }

 }

 requireFieldCheck:any;
 validateFlag:boolean=false;
 saveFamilyPerson(type:any){
  this.CreateAccountForm.markAsTouched();
  this.validateFlag=false;
  let userData = JSON.parse(sessionStorage.getItem('profileData') || '');;
    
  if(this.validateRquired()){
    if((this.CreateAccountForm.controls['sphomePhoneFlag'].value !='' && this.CreateAccountForm.controls['sphomePhoneFlag'].value !=null && this.CreateAccountForm.controls['sphomePhoneFlag'].value !=0) || (this.CreateAccountForm.controls['mobileFlag'].value !='' && this.CreateAccountForm.controls['mobileFlag'].value !=null && this.CreateAccountForm.controls['mobileFlag'].value !=0)){

    
    if(this.personTypeVal!='CHILD'&& this.CreateAccountForm.controls['credentialCheck'].value  =='Yes' && (this.CreateAccountForm.controls['dependentUsername'].value =='' || this.CreateAccountForm.controls['dependentUsername'].value==null)){
      //alert('Please Enter Username');
      this.validateFlag=true;
    }else{
      let primaryFlag:any =0;
       if(this.editFamilyFlag>0){
         primaryFlag = (this.dataReceived.primaryContact==this.fetchPersonUpdateResponse.primaryContact && this.personUpdateData==this.dataReceived.personID)?"1":"0"
        }
        let param:any = {
        user: {
          familyID: this.familyId,
          personID: (this.editFamilyFlag>0)?this.personUpdateData:0,
          primaryContact:primaryFlag,
          chapter:userData.chapter
        },
        relationList: [
       
        ]
      }  

      let APIName= (this.dataReceived.primaryContact==this.fetchPersonUpdateResponse.primaryContact && this.personUpdateData==this.dataReceived.personID && this.editFamilyFlag>0)?'/registration/saveFamilyAndPerson':'/registration/savePerson'

      
    Object.assign(param.user, this.CreateAccountForm.getRawValue());

       if(this.personTypeVal=="CHILD"){
        param.user.emailAddress ='';
        let relation1:any;
        if(this.isParentRelationshipRequired()){
         if(this.relationCode.length==0 ){
            this.relationCodeError=true;
        
          }
          if(this.relationCode1.length==0 ){
            this.relationCode1Error=true;
        
          }
        if(this.relatedPersonId.length==0){
          this.relatedPersonIdError=true;
        
        }
        if(this.relatedPersonId1.length==0 ){
          this.relatedPersonId1Error=true;
          
        }

        if( this.relationCodeError || this.relationCode1Error || this.relatedPersonIdError || this.relatedPersonId1Error){
          return;
        }
        
      }
        if((this.relatedPersonId==this.relatedPersonId1) || (this.relationCode==this.relationCode1)){
          this.showRelationshipError=true;
          return;
        }
        if(this.relatedPersonId!='' && this.relationCode!=''&& this.editFamilyFlag>0 && this.fetchPersonUpdateResponse.relationList[0]!=undefined){
          relation1={
            id: this.fetchPersonUpdateResponse.relationList[0].id,
            relationCode: this.relationCode,
            relatedPersonId:this.relatedPersonId,
            personId: this.personUpdateData
        }
        param.relationList.push(relation1);
        }else{
          relation1={
            id: 0,
            relationCode: this.relationCode,
            relatedPersonId:this.relatedPersonId,
            personId: this.personUpdateData
        }
        param.relationList.push(relation1);
        }

        let relation2:any;
      
        if(this.relatedPersonId1!='' && this.relationCode1!='' && this.editFamilyFlag>0 && this.fetchPersonUpdateResponse.relationList[1]!=undefined){
          relation2={
            id: this.fetchPersonUpdateResponse.relationList[1].id,
            relationCode: this.relationCode1,
            relatedPersonId:this.relatedPersonId1,
            personId: this.personUpdateData
          }
          param.relationList.push(relation2);
        }else{
          relation2={
            id: 0,
            relationCode: this.relationCode1,
            relatedPersonId:this.relatedPersonId1,
            personId: this.personUpdateData
        }
          param.relationList.push(relation2);
        }
        
        param.user.CustodyIssue=this.CustodyIssue;
       }else{
        
       delete  param.relationList;
       }

       if(param.user.sphomePhoneFlag==null){
        param.user.sphomePhoneFlag=0;
       }

       if(param.user.mobileFlag==null){
        param.user.mobileFlag=0;
       }

      let option={
        params:param,
        api:APIName,
        response:null
      }
      
      this.MasterService.savePersonFamily(param,  APIName).subscribe(async response => {
       option.response=response;
       if(this.file && this.action=='Add') {
        //this.CreateAccountForm.controls["personID"].setValue(response.personID);
        await this.uploadFile(this.file,response?.user?.personID);
       } 
       if((this.personTypeVal=='YOUTH' || this.personTypeVal=='ADULT')&& this.CreateAccountForm.controls['credentialCheck'].value  =='Yes' && (this.CreateAccountForm.controls['dependentUsername'].value !='' || this.CreateAccountForm.controls['dependentUsername'].value!=null) && this.editFamilyFlag==0){
        this.loadingImage=false;
        Swal.fire({
         // position: 'top-end',
          icon: 'success',
          title: 'Family member details have been saved successfully along with the new username and password.',
          showConfirmButton: true,
          //timer: 1500
        }).then((result) => {
          if (result.isConfirmed) {
            scrollTop();
          } 
        });
       }else {
        this.loadingImage=false;
        Swal.fire({
          // position: 'top-end',
           icon: 'success',
           title: 'Family member details have been saved successfully.',
           showConfirmButton: true,
           //timer: 1500
         }).then((result) => {
          if (result.isConfirmed) {
            scrollTop();
          } 
        });
       }
      
       this.getPrimaryContactUpdatedDetails()
      

       if(type!='saveandAdd'){ 
        this.router.navigate(['family/familyMemberList/false']);
         
      }else{
        this.router.navigate(['family/familyMemberList/false']);
        this.downloadPhoto='';
        this.loadingImage=false;
        this.tabOne = true;
        this.tabTwo = false;
        this.tabThree = false;
        this.resetForm('');
      }
      },(err : HttpErrorResponse)=>{
        var msg = err.error;
        Swal.fire({
          // position: 'top-end',
           icon: 'error',
           title: msg.message,
           showConfirmButton: true,
           //timer: 1500
         });
      });
    }
  }else{
    this.validateFlag=true;
    if((this.CreateAccountForm.controls['sphomePhoneFlag'].value =='' || this.CreateAccountForm.controls['sphomePhoneFlag'].value ==0  || this.CreateAccountForm.controls['sphomePhoneFlag'].value ==null) && (this.CreateAccountForm.controls['mobileFlag'].value =='' || this.CreateAccountForm.controls['mobileFlag'].value ==null || this.CreateAccountForm.controls['mobileFlag'].value ==0)){
      this.mobileCheckFlag = true;
    }
     //alert('Please Select Use in case of emergency');
    this.CreateAccountForm.controls['sphomePhoneFlag'].invalid;
    this.CreateAccountForm.controls['mobileFlag'].invalid;
    }
   }else {
    this.validateFlag=true;
    // alert('Please enter required field.');
   }
 }
  async getPrimaryContactUpdatedDetails() {
    if(this.primaryContact=="1"){
      const body = {
        familyId: this.fetchPersonUpdateResponse.familyId,
        programCode: "",
        chapterCode: this.fetchPersonUpdateResponse.chapterCode,
        paymentFlag: false
      }
      await this.programService.getPrimaryContact(body)
    }
  }

 resetForm(cancel:any){
  this.CreateAccountForm.reset();
  if(cancel=='cancel'){ this.router.navigate(['familyview']);}
  let  responseData = JSON.parse(localStorage.getItem('CurrentUser') || '');

  this.CreateAccountForm = this.fb.group({
    
    firstName: new FormControl('',[Validators.required]),
    middleName: new FormControl(''),
    lastName: new FormControl('',[Validators.required]),
    gender: new FormControl('',[Validators.required]),
    phoneNumber: new FormControl('',[Validators.required]),
    emailAddress:new FormControl('',[Validators.required, Validators.pattern(/.+@.+\..+/)]),
    homePhone: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    address2: new FormControl(''),
    address3: new FormControl(''),
    city: new FormControl('',[Validators.required]),
    state: new FormControl('',[Validators.required]),
    zipCode: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    status:new FormControl('Active',[Validators.required]), 
    personType: new FormControl('ADULT',[Validators.required]),
    maritalStatus:new FormControl('Married',[Validators.required]),
    sphomePhoneFlag: new FormControl(''),
    mobileFlag: new FormControl(''),
    relationShipPrimaryContact:new FormControl('',[Validators.required]),
    livingAtHomeAddress:new FormControl('1'),
    dependentUsername:new FormControl(''),
    credentialCheck:new FormControl('No'),
    schoolGrade:new FormControl("",[Validators.required]),
    relationCode: new FormControl(''),
      relatedPersonId: new FormControl(''),
      relationCode1: new FormControl(''),
      relatedPersonId1: new FormControl(''),
      CustodyIssue:new FormControl('No'),
      dateOfBirth:new FormControl("",[Validators.required]),
      risingSchoolGrade:new FormControl("",[Validators.required])
    });
    this.selectedFamily = this.familyService.getSelectedFamily();
    this.personUpdateData=this.selectedFamily.personId;
    this.loadingImage=false;
    this.dependentUsername ='';
    this.fetchUpdatePerson(); 

    this.relationCode='';
    this.relatedPersonId='';
    this.relationCode1='';
    this.relatedPersonId1='';

 }

 async fetchSchoolGradeList(){

  
  let data = await this.MasterService.fetchSchoolGradeList();

    this.CreateAccountForm.controls['schoolGrade'].setValue("");
      this.schoolGradesList = data;
      this.raisingSchooldGradeLabel();
}

schGradeLabel:any;
 async fetchSchooldGradeLabel(){
   let param = {
    code: this.chapterCode,
    programCategory: ''
  }

  let data:any = await this.MasterService.fetchSchoolGradeLabel(param);
  this.schGradeLabel = data['gradeLabel'];
}

raisingSchGradeLabel:any;
async raisingSchooldGradeLabel(){
  let param = {
    code: this.chapterCode,
    programCategory: ''
  }
   let data = await this.MasterService.fetchRisingGradeLabel(param);
    this.raisingSchGradeLabel= data;
}

raisingGradeData:any;
changeOfSchoolGrade(){
  let filterGradeData:any =[];
  if(this.CreateAccountForm.controls['schoolGrade'].value == '19'){
   this.schoolGradesList.filter( (item:any)=>{
      if(item.code == '19' || item.code == '20'){
        return filterGradeData.push(item);
      }
    });
    this.raisingGradeData = filterGradeData;
  }

}

}