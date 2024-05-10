import { ChangeDetectorRef, Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import moment from 'moment';
import { ProgramService } from 'src/app/modules/chinmaya-shared/services/program/program.service';
import { MasterService } from 'src/app/modules/chinmaya-shared/services/master/master.service';
import { formatPhoneNumber } from 'src/app/utils/util';
import Swal from 'sweetalert2';
import { HealthInfoService } from 'src/app/modules/chinmaya-shared/services/program-registration/healthinfo.service';
import { RouteChangeCall } from 'src/app/modules/chinmaya-shared/services/program-registration/routechange.service';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';
import { AuthService } from 'src/app/modules/chinmaya-shared/services/auth/auth.service';
@Component({
  selector: 'app-healthinformation',
  templateUrl: './healthinformation.component.html',
  styleUrls: ['./healthinformation.component.scss']
})
export class HealthinformationComponent {
  @Input() tabHealthInfoTab: boolean=false;
  @Output() back=new EventEmitter<string>();
  @Output() saveAndNext=new EventEmitter<string>();

  healthInfoForm:any
  arrayTime:any;
  currentUserData:any;
  programCode:any;
  selectedChildFromDropdown:any="";
  chapterCode:any;
  familyId:any;
  personID:any;
  cardNameDisplay:any;
  personStatus:any;
  selectedChild: any;
  healthInformation: any;
  displayChildList: boolean=false;
  saveAndNextButtonClicked: any;
  sameInformationChecked:any=false;
  errorMessage: any;
  childHealthInfoPending=false;
  childIsSelectedFromDropDown: boolean=false;
  allergicFlag:any='';
  phoneFlagCheck:boolean=false;
  // get healthInformationList(){
  //   return this.healthInfoForm.get('healthInformationList') as FormArray;
  // }
  selectedAcademicYear: any;
  selectedChapterCode: any;
  selectedProgram: any;
  loggedInUser: any;
  selectedFamily:any;

  get HIF(): { [key: string]: AbstractControl } {
    return this.healthInfoForm.controls.doctorInformation.controls;
  }

  constructor(private masterService: MasterService,private programService: ProgramService, 
    public fb: FormBuilder, private renderer:Renderer2,private cdr:ChangeDetectorRef, 
    private healthInfoService:HealthInfoService, private routePass:RouteChangeCall,  
    private store:StoreService,  private authService: AuthService) { 
    
  }
  currentDate:any='';
  timeDisplay:any='';
  tabOne:boolean=true;
  tabTwo:boolean=false;
  tabThree:boolean=false;
  async ngOnInit() {
   
    //this.arrayTime = this.healthInfoForm.get('healthInformationList');
    

    this.healthInfoForm = this.fb.group({
      personId: [0],
      programCode: [''],
      chapterId: [''],
      doctorInformation:this.fb.group({
      id:new FormControl(0),
      oid:new FormControl(0),
      officeName: new FormControl('',[Validators.required]),
      firstName: new FormControl('',[Validators.required]),
      middleName: new FormControl(''),
      lastName: new FormControl('',[Validators.required]),
      address1: new FormControl('',[Validators.required]),
      address2: new FormControl(''),
      city: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]),
      zipcode: new FormControl('',[Validators.required, this.customLengthValidator(5, 5)]),
      officePhone: new FormControl('',[Validators.required]),
      insuranceCompanyName: new FormControl('',[Validators.required,Validators.maxLength(100)]),
      policy: new FormControl('',[Validators.required,Validators.maxLength(30)]),
      group: new FormControl('',[Validators.required,Validators.maxLength(30)]),
      allergyConsent: new FormControl('',[Validators.required])
    }),
      healthInformationList:new FormArray([]),
      otherHealthProblem:this.fb.group({
        id: [null],
        description: ['',[Validators.required,,Validators.maxLength(1000)]],
        additionalDesc: ['',[Validators.required,Validators.maxLength(45)]],
        confidential: ['0'],
      // documentSignature: ['',[Validators.required]],
        immunization: ['Y']
      })
    });

    this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.selectedProgram = this.store.getValue(KEYS.program);
    this.selectedFamily = this.store.getValue(KEYS.selectedFamily);
    this.currentUserData = this.authService.getLoggedInUser();

    this.programCode = 'CSSC2024';
    this.chapterCode =  'CSVA';
    this.familyId= '3753';
    this.personID =  '11734';
    this.cardNameDisplay = '';//JSON.parse(localStorage.getItem('cardName') || '');


    await this.fetchHealthInformation();
    if(this.selectedChild){
      let data = await this.fetchHealthpersonData();
      this.populateHealthInfoForm(data);
    }

    this.childHealthInfoPending = !this.isChildHealthInfoPending();

    var d = new Date(); // for now
    d.getHours(); // => 9
    d.getMinutes(); // =>  30
    d.getSeconds(); // => 51

   this.currentDate =  moment(new Date()).format('MM/DD/YYYY');
   this.timeDisplay =  moment(d).format('HH:mm');
    

  }

  selectedRadioOpt(eve:any){
    this.allergicFlag = eve;    
    if(this.allergicFlag=='0'){
      this.healthInfoForm.value.healthInformationList.filter((item:any, index:any) => {
        this.healthInfoForm.controls.healthInformationList.controls[index].controls['allergyName'].setValue('NA');
        return item.allergyName='NA';
      });
      
      // this.healthInfoForm.controls.otherHealthProblem.controls['additionalDesc'].setValue('NA');
      // this.healthInfoForm.controls.otherHealthProblem.controls['description'].setValue('NA');
  
      // this.healthInfoForm.value.otherHealthProblem.additionalDesc='NA';
      // this.healthInfoForm.value.otherHealthProblem.description='NA';
    }else{
      console.log(this.healthInfoForm.value.healthInformationList);
      this.healthInfoForm.value.healthInformationList.filter((item:any, index:any) => {
        this.healthInfoForm.controls.healthInformationList.controls[index].controls['allergyName'].setValue((this.personHealthInfoData?.healthInformationList==null || this.personHealthInfoData?.healthInformationList[index].allergyName=='NA')?'': this.personHealthInfoData?.healthInformationList[index].allergyName);

        return item.allergyName= (this.personHealthInfoData?.healthInformationListe==null)?'': this.personHealthInfoData?.healthInformationList[index].allergyName;
      });
      // this.healthInfoForm.controls.otherHealthProblem.controls['additionalDesc'].setValue((this.personHealthInfoData?.otherHealthProblem==null)?'': this.personHealthInfoData?.otherHealthProblem?.additionalDesc);
      // this.healthInfoForm.controls.otherHealthProblem.controls['description'].setValue((this.personHealthInfoData?.otherHealthProblem?.description==null)?'':this.personHealthInfoData?.otherHealthProblem?.description);

      // this.healthInfoForm.value.otherHealthProblem.additionalDesc=(this.personHealthInfoData?.otherHealthProblem==null)?'': this.personHealthInfoData?.otherHealthProblem?.additionalDesc;
      // this.healthInfoForm.value.otherHealthProblem.description=(this.personHealthInfoData?.otherHealthProblem==null)?'':this.personHealthInfoData?.otherHealthProblem?.description;
    }
  }
  // Custom validator for length constraint
  customLengthValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value+"";

      if (value === null || value === undefined || value === '') {
        // If the input is empty, consider it valid
        return null;
      }

      

      if (value.length < min || value.length > max) {
        return { customLength: true }; // Validation failed, return an error object
      }

      return null; // Validation passed, return null
    };
  }


  goBackToPreviousTab(){
    //this.back.emit("Health Information");
    this.routePass.sendData({'currenttab':'Health Information','Event':'back'}); 
  }

  addAllergyInfo(){
    const healthInfoArray = this.healthInfoForm.get('healthInformationList') as FormArray;

    healthInfoArray.push(this.fb.group({
      id: [0],
      allergyName: new FormControl('',[Validators.required,Validators.maxLength(100)]),
      medicationName: new FormControl('',[Validators.maxLength(100)]),
      medicationRequired: new FormControl(''),
      additionalDetails: new FormControl('',[Validators.maxLength(1000)])
    }) 
    )
  }

  async removeAllergyInfo(i:number,alergyControl:any){
    const healthInfoArray = this.healthInfoForm.get('healthInformationList') as FormArray;
    //if(healthInfoArray.length>1){
      let id = alergyControl.value.id;
      healthInfoArray.removeAt(i);
      if(id && id!=0){
        await this.healthInfoService.deleteAllergyInfo({id:id});
        await this.fetchHealthInformation(this.selectedChild);
        let data =await this.fetchHealthpersonData();
        this.populateHealthInfoForm(data);
      }
     
     
    //}
  }


  canShowChildList(){
    let retValue=false;

    if(this.selectedChild && this.selectedChild.status=='Pending' && this.healthInformation && this.healthInformation.childPersonList && this.healthInformation.childPersonList.length>1){
      for(let i=0;i<this.healthInformation.childPersonList.length;i++){
        let childInfo = this.healthInformation.childPersonList[i]
        if(childInfo.status=='Completed'){
          retValue=true;
          break;
        }
      }
    }

    return retValue;
  }

  validationFieldLabelErrorText:any={
    officeName: 'Please enter Office Name.',
    firstName:'Please enter First Name.',
    lastName:'Please enter Last Name.',
    address1:'Please enter Address 1.',
    city:'Please enter City.',
    state:'Please select State.',
    zipcode:'Please enter Zipcode.',
    officePhone:'Please enter Office Phone.',
    insuranceCompanyName:'Please enter Insurance Company Name.',
    policy:'Please enter Policy.',
    group:'Please enter Group.',
    allergyConsent:'Please select one of the option.'
   };
   
  showError(field:any,group?:any,subGroup?:any){ 
    let control = null;
    if(group){
      control = this.healthInfoForm.controls[group].controls[field];
    }
    else{
      control=subGroup.controls[field];
    }
    
    if(field && field=="zipcode"){
      // control.setErrors({});
      // let value = control.value+"";
      // if(value.length<5){
      //   control.setErrors({"minLength":"Customer error"});
      // }
    }

    if (control && (control.touched || this.saveAndNextButtonClicked) && control.errors) {
      const errors = control.errors;
      
      if (errors.required) {
        return this.validationFieldLabelErrorText[field];
       // return 'Field is required';
      }
      
      if(errors.maxLength) {
        return 'Maximum Length should be 5 characters'
      }

      if(errors.maxlength) {
        return 'Maximum Length is '+errors.maxlength.requiredLength;
      }
      
      if (errors.minLength || errors.customLength) {
        return 'Minimum Length should be 5 characters'
      }
      
      // Add more conditions for other types of validations
      
      // Return null if no matching validation error found
      return null;
    }
    
  
    return null;
  
  }


  async onDoctorInformationSelection(ev:any,forcedvalue?:any){ 
      let value = ev ? ev.target.checked:forcedvalue;
       this.sameInformationChecked=value;

       //this.cdr.detectChanges();
       if(value && !this.moreThanOneChildWithStatusCompleted()){
        let childList = this.healthInformation?.childPersonList.filter((item:any) => item.status=='Completed');
        this.showDetailOfChild(childList[0]);
       }
       else{
        this.onChildChange(this.selectedChild);
       }
  }

  moreThanOneChildWithStatusCompleted(): any {
    let length = this.healthInformation?.childPersonList.filter((item: any) => item.status == 'Completed').length;
    return length>1;

  }

  isHealthInfoFormValid(){
    return this.healthInfoForm.valid;
  }
  saveHealthInfo(){
    this.phoneFlagCheck=false;
    if(this.healthInfoForm.controls.doctorInformation.controls['officePhone'].value.length>=14){

    this.saveAndNextButtonClicked=true;
    // if(this.healthInfoForm.touched){
    // this.saveAndNextButtonClicked=true;
    // this.performSave()
    // return;
    // }

    this.onModalOk();
  }
   if(this.healthInfoForm.controls.doctorInformation.controls['officePhone'].value.length<14){
    this.phoneFlagCheck=true;
  }


  }

  async performSave(nxt:any){
    let memberId = JSON.parse(localStorage.getItem('selectMember') || '');
    console.log("=============================== Save Healrth Info ===========================");
    //let officePhone = (this.healthInfoForm.value.officePhone).replace(/^(\+)|\D/g, "$1");
    var body = this.healthInfoForm.value;
    body.chapterId = this.chapterCode;
    
    
    const healthInfoForm = this.healthInfoForm;
     
    if(this.allergicFlag=='0'){
      body.healthInformationList.filter((item:any, index:any) => {
        return item.allergyName='NA';
      });
      // body.otherHealthProblem.additionalDesc='NA';
      // body.otherHealthProblem.description='NA'
    }
    
    console.log(JSON.stringify(healthInfoForm.value,null,4));
    

    for (const controlName in this.healthInfoForm.controls) {
      const control = this.healthInfoForm.get(controlName);
      if (control instanceof FormArray) {
        for (let i = 0; i < control.length; i++) {
          const formGroup = control.at(i) as FormGroup;
          for (const innerControlName in formGroup.controls) {
            const innerControl:any = formGroup.get(innerControlName);
            if (innerControl.invalid) {
              //this.showError(innerControlName,null,formGroup);
              console.log(`${innerControlName} has errors:`, innerControl.errors);
            }
          }
        }
      }
      else if( control  instanceof FormGroup){

        //alert(true);
          for (const innerControlName in control.controls) {
            const innerControl:any = control.get(innerControlName);
            if (innerControl.invalid) {
              //this.showError(innerControlName,null,formGroup);
              console.log(`${innerControlName} has errors:`, innerControl.errors);
            }
          }

      }
      else if(control.invalid) {
       // this.showError(controlName,control);
        console.log(`${controlName} has errors:`, control.errors);
      }
    }
  
  const response:any = await this.healthInfoService.saveHealthInfo(body);
  if(nxt=='next'){
    setTimeout(() =>{ this.saveHealthInfo(); },1000);
  }else{
    // this.tabOne=true;
    // this.tabTwo=false;
    // this.tabThree=false;
    Swal.fire({
      icon: 'success',
      title: response.message,
      showCancelButton: false,
      confirmButtonText: 'OK',
    })

  }
  
  
 // this.showErrorAlert(response.message);
  await this.postSave();

  }

 async postSave(){
  await this.fetchHealthInformation(this.selectedChild);
  this.sameInformationChecked=false;
  this.childIsSelectedFromDropDown=false;
  this.selectedChildFromDropdown="";
  let data = await this.fetchHealthpersonData();
  this.populateHealthInfoForm(data);
  
 }


  isChildHealthInfoPending(){
    let retuValue = false;
    if(this.healthInformation.childPersonList && this.healthInformation.childPersonList.length>0){
      for(let i=0;i<this.healthInformation.childPersonList.length;i++){
        let childHealthInfo = this.healthInformation.childPersonList[i];
        if(childHealthInfo.status=="Pending"){
          retuValue=true;
          break;
        }
      }
    }

    this.childHealthInfoPending=!retuValue;

    return retuValue;
  }

  setDefaultValues() {
    // programCode:this.programCode ,
    // personId: this.selectedChild.personID ,
    // familyId: this.familyId
    this.healthInfoForm.patchValue({
      personId: this.selectedChild.personID ,
      programCode: this.programCode,
      chapterId: '',
      doctorInformation: {
        id: null,
        officeName: '',
        firstName: '',
        middleName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipcode: '',
        officePhone: '',
        insuranceCompanyName: '',
        policy: '',
        group: '',
        allergyConsent:''
      },
      healthInformationList: [{ id: null, allergyName: '', medicationName: '', medicationRequired: '', additionalDetails: '' }],
      otherHealthProblem: {
        id: null,
        description: '',
        additionalDesc: '',
        confidential: '0',
        // documentSignature: ' ',
        immunization: 'Y',
      },
    });
  }

  personHealthInfoData:any;
  async fetchHealthpersonData(personId?:any){
   
    
    let body = {
      programCode:this.programCode ,
      personId: personId ? personId:this.selectedChild.personID ,
      familyId: this.familyId
    };

    const data = await this.healthInfoService.fetchPersonHealthInformation(body)
    return data;
         
  }


  showErrorAlert(message:any) {
    // const closeButton = document.getElementById('alertModalId');
    // this.renderer.selectRootElement(closeButton).click();
    this.errorMessage = message;
    Swal.fire({
      icon: 'success',
      title: message,
      showCancelButton: false,
      confirmButtonText: 'OK',
    });
    let modalElement:any = document.getElementById("errorModalLink");
    modalElement.click();
    
  }

  onModalOk(){
    if(!this.isChildHealthInfoPending() && this.saveAndNextButtonClicked){
      this.saveAndNext.emit("tabHealthInfoTab");
    }
  }


  
  populateHealthInfoForm(data:any){
    this.setDefaultValues();
    this.personHealthInfoData=data;

    if(data.doctorInformation){
      this.personHealthInfoData.doctorInformation.officePhone=formatPhoneNumber(data.doctorInformation.officePhone);
    }
    
    if(this.personHealthInfoData.otherHealthProblem ){
      this.personHealthInfoData.otherHealthProblem.confidential=this.personHealthInfoData.otherHealthProblem.confidential+"";
    }

    if(this.personHealthInfoData.healthInformationList){
      for(let i=0;i<this.personHealthInfoData.healthInformationList.length;i++){
        if(!this.personHealthInfoData.healthInformationList[i].medicationRequired){
          this.personHealthInfoData.healthInformationList[i].medicationRequired="";
        }
      }
    }


    this.healthInfoForm.patchValue(this.personHealthInfoData);
    this.allergicFlag=this.personHealthInfoData?.doctorInformation?.allergyConsent;
    const healthInfoArray = this.healthInfoForm.get('healthInformationList') as FormArray;
    healthInfoArray.clear();
    if( this.personHealthInfoData.healthInformationList && this.personHealthInfoData.healthInformationList.length>0){
    this.personHealthInfoData.healthInformationList.forEach((item:any) => {
      healthInfoArray.push(this.fb.group({
        id: [item.id],
        allergyName: [item.allergyName,[Validators.required,Validators.maxLength(100)]],
        medicationName: [item.medicationName,[Validators.maxLength(100)]],
        medicationRequired: [item.medicationRequired],
        additionalDetails: [item.additionalDetails,[Validators.maxLength(1000)]]
      }));
    });

   
  }
  else{
    healthInfoArray.push(this.fb.group({
      id: [0],
      allergyName: ["",[Validators.required,Validators.maxLength(100)]],
      medicationName: ["",[Validators.maxLength(100)]],
      medicationRequired: [""],
      additionalDetails: ["",[Validators.maxLength(1000)]]
    }));

  }
  
  if(this.allergicFlag=='0'){

    this.healthInfoForm.value.healthInformationList.filter((item:any, index:any) => {
      this.healthInfoForm.controls.healthInformationList.controls[index].controls['allergyName'].setValue('NA');
      return item.allergyName='NA';
    });
    
    // this.healthInfoForm.controls.otherHealthProblem.controls['additionalDesc'].setValue('NA');
    // this.healthInfoForm.controls.otherHealthProblem.controls['description'].setValue('NA');

    // this.healthInfoForm.value.otherHealthProblem.additionalDesc='NA';
    // this.healthInfoForm.value.otherHealthProblem.description='NA';
  }
  //this.healthInfoForm.controls.otherHealthProblem.controls['documentSignature'].setValue('');
  this.onModalOk();
  }

  isChildSelected(child:any){
    let retValue =false;

    if(!this.selectedChild){
      return false;
    }
    if(child.personID==this.selectedChild.personID){
      retValue=true;
    }

    return retValue;

  }

  certify(nxt:any){
    this.saveAndNextButtonClicked=false;
      this.performSave(nxt);
    
  }

  async onChildChange(child:any){
    this.selectedChild=child;
    this.sameInformationChecked=false;
    this.selectedChildFromDropdown="";
    this.childIsSelectedFromDropDown=false;
    this.tabOne=true;
    this.tabTwo=false;
    this.tabThree=false;
    let data = await this.fetchHealthpersonData();
    this.populateHealthInfoForm(data);
  }

  fetchHealthData:any;
 async fetchHealthInformation(selectedChild?:any){
    let body:any={
      familyId: this.familyId,
      programCode: this.programCode
       //personIdList: []
    }
   
   let data:any = await  this.healthInfoService.fetchHealthInformation(body)
   this.healthInformation=data;

       //body.personIdList.push(JSON.parse(this.personID));
    // If we have already child selected then just update his data and return. 
   if(selectedChild){
    this.selectedChild=this.healthInformation.childPersonList.filter((item:any)=>item.personID==selectedChild.personID)[0]
    return;
   }
       this.selectedChild=data && data.childPersonList && data.childPersonList.length>0 ? data.childPersonList[0]:null 
   
  }

   
 async showDetailOfChild(selectedChild:any) {

    this.selectedChildFromDropdown = selectedChild.target?selectedChild.target.value:selectedChild;
    let personID= selectedChild.target?selectedChild.target.value:selectedChild.personID;
    this.setDefaultValues();
    this.childIsSelectedFromDropDown=true;
    // console.log(this.selectedChildFromDropdown);
     let childData:any = await this.fetchHealthpersonData(personID);
     childData.personId=this.selectedChild.personID
     childData.healthInformationList=[];
     childData.otherHealthProblem={
      confidential:0
     };
     childData.doctorInformation.id=null;
     this.healthInfoForm.controls.doctorInformation.patchValue(childData.doctorInformation);
     this.populateHealthInfoForm(childData);

  }


  proceedToNext(tab:any){
   this.tabOne=true;
   
   this.healthInfoForm.markAsTouched();
   
   let frstFormVal = this.healthInfoForm.value.doctorInformation;
   let zipLength = frstFormVal.zipcode.toString();
   if(tab=='tabTwo'){
   if(frstFormVal.officeName!='' && frstFormVal.officePhone!=''&& frstFormVal.officePhone.length==14 && frstFormVal.firstName!='' && frstFormVal.lastName!='' && frstFormVal.address1!='' && frstFormVal.city!='' && frstFormVal.state!='' && frstFormVal.zipcode!='' && zipLength.length==5){
    this.tabTwo=true;
    this.tabOne=false;
    this.phoneFlagCheck=false;
   }else{
    this.tabOne=true;
    this.tabTwo=false;
    this.tabThree=false;
    this.saveAndNextButtonClicked=false;
    if(this.healthInfoForm.controls.doctorInformation.controls['officePhone'].value.length<14){
      this.phoneFlagCheck=true;
    }
   }
  }
   
   if(tab=='tabThree'){
    if(frstFormVal.insuranceCompanyName!='' && frstFormVal.policy!='' && frstFormVal.group!=''  && this.fieldsAreValidOnThisTab()){
      this.tabThree=true;
      this.tabTwo=false;
      this.tabOne=false;
    }else{
    this.tabTwo=true;
    this.tabOne=false;
    this.tabThree=false;
    this.saveAndNextButtonClicked=false;
   }
   }

  }


  fieldsAreValidOnThisTab(){
    if(
      this.healthInfoForm.controls.doctorInformation.controls["insuranceCompanyName"].errors || 
      this.healthInfoForm.controls.doctorInformation.controls["policy"].errors || 
      this.healthInfoForm.controls.doctorInformation.controls["group"].errors 
    ){
      return false;
    }
    return true;
  }


  

  backtoPrevious(tab:any){
   if(tab=='tabOne'){
    this.tabOne=true;
    this.tabTwo=false;
    this.tabThree=false;
   }

   if(tab=='tabTwo'){
    this.tabOne=false;
    this.tabTwo=true;
    this.tabThree=false;
   }
  }

  hidePhoneNum(){
    this.phoneFlagCheck=true;
    let frstFormVal = this.healthInfoForm.value.doctorInformation;
    if(frstFormVal.officePhone.length==14){
        this.phoneFlagCheck=false;
    }
  }

}
