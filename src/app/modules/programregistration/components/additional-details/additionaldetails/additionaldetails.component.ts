import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
import { MasterService } from 'src/app/modules/chinmaya-shared/services/master/master.service';
import { ProgramService } from 'src/app/modules/chinmaya-shared/services/program/program.service';
import { formatPhoneNumber } from 'src/app/utils/util';
import * as moment from 'moment';
import { StoreService, KEYS } from 'src/app/modules/chinmaya-shared/services/store/store.service';
import { Router } from '@angular/router';
import { RouteChangeCall } from 'src/app/modules/chinmaya-shared/services/program-registration/routechange.service';
declare function scrollTop():any;

@Component({
  selector: 'app-additionaldetails',
  templateUrl: './additionaldetails.component.html',
  styleUrls: ['./additionaldetails.component.scss']
})
export class AdditionaldetailsComponent implements OnInit {
  @Input() tabIndividualProfile: boolean=false;
  profiles: any;
  profileFormGroup:any;
  // tabClassRegistration: boolean;
  // tabHealthInfo: boolean;
  // tabIndividualProfile: boolean;
  // tabReview: boolean;
  // tabPayment: boolean;
  familyId: any;
  programCode: any;
  chapterCode: any;
  vaccinationList: any;
  gccSessionData: any;
  tshirtList: any;
  currentUserData: any;
  personID: any;
  @Output() back=new EventEmitter<string>();
  @Output() saveAndNext=new EventEmitter<string>();
  profileImages:any=[]
  saveAndNextButtonClicked: boolean=false;
  tshirtText: any;
  tshirtTextYouth: any;
  sanitizedTest: any;

  tooltipVisible: boolean = false;
  tooltipStyles: any = {};
  schoolGradesList: any=[];

  selectedAcademicYear: any;
  selectedChapterCode: any;
  selectedProgram: any;
  loggedInUser: any;
  selectedFamily:any;

  showTooltip(group?:any) {
    group.controls.showTooltip=true;
  }

  hideTooltip(group?:any) {
    group.controls.showTooltip=false;
  }

 validationFieldLabelErrorText:any={
  dateOfBirth: 'Date of Birth',
  tshirtSize:'T-Shirt Size',
  schoolGradeCode:'school Grade',
  image:'upload the picture',
  workPhone:'Work Phone'
 };
 
 

  constructor(private programService:ProgramService,private masterService:MasterService,
    private cdr:ChangeDetectorRef, private sanitizer: DomSanitizer, private authService: AuthService, 
    private store:StoreService, private router:Router, private routePass:RouteChangeCall, private fb:FormBuilder){
     
    }


  async ngOnInit(){
    this.schoolGradesList=[];
    this.currentUserData = this.authService.getLoggedInUser();
    this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.selectedProgram = this.store.getValue(KEYS.program);
    this.selectedFamily = this.currentUserData.familyID;

    //scrollTop();
    let tempVaccinationList = await this.masterService.fetchVaccinationList();
    this.vaccinationList = tempVaccinationList.selectDropdownList;
    let tshirtList = await this.masterService.fetchTShirtSizeList(); 
    this.tshirtList = tshirtList.selectDropdownList;  
    let tempgccSessionList = await this.masterService.fetchgccSessionData();
    this.gccSessionData = tempgccSessionList.selectDropdownList;
    
   this.ngOnInitChanges();
  }
  
  async fetchSchoolGradeList(){

    
    let data = await this.masterService.fetchSchoolGradeList()
     this.schoolGradesList = data;
   }

  ngOnInitChanges(){
      
      this.programCode = this.selectedProgram.code;

      this.chapterCode = this.selectedChapterCode;
      //
     // let globalChaterCod = this.currentUserData.chapter;
   //  localStorage.setItem("GlobalchapterCode", JSON.stringify(globalChaterCod));

      //this.chapterCode = this.currentUserData.chapter;
      this.familyId= this.currentUserData.familyID;
      this.personID = this.currentUserData.personID;
      this.prepareIndividualConfigFieldTab();
  }

  async prepareIndividualConfigFieldTab(){
    await this.fetchSchoolGradeList();
    await this.fetchProgramConfigurationFields()
    await this.fetchProfilePictures();
    this.tshirtText=this.profiles["tshirtText"];
    this.tshirtTextYouth=this.profiles["tshirtTextYouth"];
    
    this.profileFormGroup = new FormGroup({
      adults: new FormArray([]),
      children: new FormArray([]),
      youth: new FormArray([])
    });

    this.createProfileControls();
  }

 

  async decodeImage(image:any){
    return new Promise((resolve,reject)=>{
      
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      
     };
     reader.readAsDataURL(image);
    })
  }

  async fetchProfilePictures(){
    if(!this.profiles.programConfigurationFieldsList){
      return;
    }
    for(let i=0;i<this.profiles.programConfigurationFieldsList.length;i++){
      let personID = this.profiles.programConfigurationFieldsList[i].personID;
      let documentID = this.profiles.programConfigurationFieldsList[i].documentID;
      let image:any = await this.getImage(documentID,personID);
      
     if(image!=""){
      this.profiles.programConfigurationFieldsList[i].image=await this.decodeImage(image);
     }
     else{
      this.profiles.programConfigurationFieldsList[i].image="";
     }
     
    }
  }

  async onImageFileSelection(ev:any,group:any){
    let image = ev.target.files[0];
    var filesize = image.size/1024/1024;
    
    if(filesize>10){
      alert('File size is more than 10MB.');
      return;
    }

    let profileImage = {
      personID:group.get("personID").value,
      image:image,
      documentID:group.get("documentID").value,
    }
    let decodeImageValue = await this.decodeImage(image);
    group.get("image").setValue(decodeImageValue);
    this.profileImages.push(profileImage);

  }

  goBackToPreviousTab(){
    //this.back.emit("tabIndividualProfileTab");
    this.routePass.sendData({'currenttab':'Additional Details','Event':'back'}); 
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




  createProfileControls(){
    const adultsArray = this.profileFormGroup.get('adults') as FormArray;
    const childrenArray = this.profileFormGroup.get('children') as FormArray;
    const youthArray = this.profileFormGroup.get('youth') as FormArray;
    

    this.profiles.programConfigurationFieldsList.forEach((personData:any) => {
      const group = new FormGroup({
        registrationID: new FormControl(personData.registrationID),
        programCode: new FormControl(personData.programCode),
        chapterID: new FormControl(personData.chapterID),
        personID: new FormControl(personData.personID),
        familyId: new FormControl(personData.familyId),
        workPhone: new FormControl(formatPhoneNumber(personData.workPhone),[this.isFieldRequired('workPhone',personData)]),
        emailId: new FormControl(personData.emailAddress),
        emailAddress: new FormControl(personData.emailAddress,{validators:this.isFieldRequired('emailAddress',personData)}),
        dateOfBirth: new FormControl(personData.dateOfBirth,{validators:this.isFieldRequired('dateOfBirth',personData)}),
        tshirtSize: new FormControl(personData.tshirtSize?personData.tshirtSize:"",{validators:this.isFieldRequired('tshirtSize',personData)}),
        tshirt: new FormControl(personData.tshirtSize?personData.tshirtSize:""),
        vaccination: new FormControl(personData.vaccination?personData.vaccination:"",{validators:this.isFieldRequired('vaccination',personData)}),
        vaccinated: new FormControl(personData.vaccination),
        personTypeCode: new FormControl(personData.personTypeCode),
        primayContact: new FormControl(personData.primayContact),
        documentID: new FormControl(personData.documentID),
        emergencyContact1Id: new FormControl(personData.emergencyContact1Id),
        emergencyContact1: new FormControl(personData.emergencyContact1,{validators:this.isFieldRequired('emergencyContact',personData)}),
        phone1: new FormControl(formatPhoneNumber(personData.phone1),[this.isFieldRequired('emergencyContact',personData),Validators.minLength(14),Validators.maxLength(14)]),
        contactOrder1: new FormControl(personData.contactOrder1),
        emergencyContact2Id: new FormControl(personData.emergencyContact2Id),
        emergencyContact2: new FormControl(personData.emergencyContact2,{validators:this.isFieldRequired('emergencyContact',personData)}),
        phone2: new FormControl(formatPhoneNumber(personData.phone2),[this.isFieldRequired('emergencyContact',personData),Validators.minLength(14),Validators.maxLength(14)]),
        contactOrder2: new FormControl(personData.contactOrder2),
        firstName:new FormControl(personData.firstName),
        lastName:new FormControl(personData.lasttName),
        image:new FormControl(personData.image,[this.isFieldRequired('image',personData)]),
        showToolTip:new FormControl(false),
        schoolGradeCode:new FormControl(personData.schoolGradeCode,[this.isFieldRequired("schoolGrade",personData)]),
        risingSchoolGradeCode:new FormControl(personData.risingSchoolGradeCode?personData.risingSchoolGradeCode:""),
        risingSchoolGradeDescription:new FormControl(personData.risingSchoolGradeCode?this.getCurrentSchoolGrade(personData.risingSchoolGradeCode).description:""),
        gccSession:new FormControl(personData.gccSession?personData.gccSession:"",{validators:this.isFieldRequired('gccSession',personData)}),
      });

      let controls:any = Object.keys(group.controls);
      let atleastOneFiledToShow=false;
      if (personData.personTypeCode === 'ADULT') {
        
       
        for(let i=0;i<controls.length;i++){
          if(this.canShowField(controls[i]+"AdultFlag")){
            atleastOneFiledToShow=true;
            break;
          }
        }
        if(atleastOneFiledToShow){
          adultsArray.push(group);
        }
      } else if (personData.personTypeCode === 'CHILD') {
        // If we rcv child then we always need to push the data 
        // for school grade.
        atleastOneFiledToShow=true;
       
        if(atleastOneFiledToShow){
        childrenArray.push(group);
        console.log(childrenArray);
        }
      }
      else if(personData.personTypeCode=== 'YOUTH'){
        for(let i=0;i<controls.length;i++){
          if(this.canShowField(controls[i]+"YouthFlag")){
            atleastOneFiledToShow=true;
            break;
          }
        }
        if(atleastOneFiledToShow){ 
        youthArray.push(group);
        }
      }
      //group.patchValue(personData);
      let childData =  this.profileFormGroup?.controls?.children?.controls.length;
      for(var k=0; k< childData; k++){
        this.profileFormGroup?.controls?.children?.controls[k]?.controls['schoolGradeCode'].disable();
      }
      
    });
  
  }
  isFieldRequired(field:any, personData: any):any{
    let returnValue = Validators.nullValidator;
    if (personData.personTypeCode === 'ADULT') {
      if(field=="workPhone" && this.profiles["workPhoneAdultMandatoryFlag"]==1){
            returnValue=Validators.required
      }
      else if(field=="dateOfBirth" && this.profiles["dateOfBirthAdultMandatoryFlag"]==1){
        returnValue=Validators.required
      }
      else if(field=="vaccination" && this.profiles["vaccinatedAdultMandatoryFlag"]==1){
        returnValue=Validators.required
      }
      else if(field=="emergencyContact" && this.profiles["emergencyContactPrimaryFlag"]==1 && personData["primayContact"]==1){
        returnValue=Validators.required
      }
      else if(field=="image" && this.profiles["imgRequiredFlag"]==1 && this.profiles["imgMandatoryFlag"]==1 && this.profiles["adultFlag"]==1){
        returnValue=Validators.required
      }else if(field=="gccSession" && this.profiles["gccSessionAdultMandatoryFlag"]==1){
        returnValue=Validators.required
      }
    }
    else if (personData.personTypeCode === 'YOUTH') {
      if(field=="workPhone" && this.profiles["workPhoneYouthMandatoryFlag"]==1){
            returnValue=Validators.required
      }
      else if(field=="dateOfBirth" && this.profiles["dateOfBirthYouthMandatoryFlag"]==1){
        returnValue=Validators.required
      }
      else if(field=="vaccination" && this.profiles["vaccinatedYouthMandatoryFlag"]==1){
        returnValue=Validators.required
      }
      else if(field=="tshirtSize" && this.profiles["tshirtMandatoryFlag"]==1){
        returnValue=Validators.required
      }
      else if(field=="image" && this.profiles["imgRequiredFlag"]==1 && this.profiles["imgMandatoryFlag"]==1 && this.profiles["youthFlag"]==1){
        returnValue=Validators.required
      }else if(field=="gccSession" && this.profiles["gccSessionYouthMandatoryFlag"]==1){
        returnValue=Validators.required
      }
    }
    else if (personData.personTypeCode === 'CHILD') {
      if(field=="schoolGrade"){
        returnValue=Validators.required;
      }
      else if(field=="workPhone" && this.profiles["workPhoneChildMandatoryFlag"]==1){
            returnValue=Validators.required
      }
      else if(field=="dateOfBirth" && this.profiles["dateOfBirthChildMandatoryFlag"]==1){
        returnValue=Validators.required
      }
      else if(field=="vaccination" && this.profiles["vaccinatedChildMandatoryFlag"]==1){
        returnValue=Validators.required
      }
      else if(field=="tshirtSize" && this.profiles["tshirtMandatoryFlag"]==1){
        returnValue=Validators.required
      }
      else if(field=="emailAddress" && this.profiles["emailIdChildMandatoryFlag"]==1){
        returnValue=Validators.required
      }
      else if(field=="image" && this.profiles["imgRequiredFlag"]==1 && this.profiles["imgMandatoryFlag"]==1 && this.profiles["childFlag"]==1){
        returnValue=Validators.required
      }else if(field=="gccSession" && this.profiles["gccSessionChildMandatoryFlag"]==1){
        returnValue=Validators.required
      }
      
      
    }

    return returnValue;

  }

  showError(group:any,field:any){
    const control = group.controls[field];

    if (control && (control.touched || this.saveAndNextButtonClicked) && control.errors) {
      const errors:any = control.errors;
      
      if (errors.required) {
        if(field=='image'){
          return 'Please '+this.validationFieldLabelErrorText[field] +'.';
        }else{
          return 'Please select '+this.validationFieldLabelErrorText[field] +'.';
        }
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

  canShowField(field:any){
    let retValue = false;
      if(field.indexOf("Adult")>-1 && field.indexOf("emergency") > -1 && 
        this.profiles["emergencyContactPrimaryFlag"]==1) {
          retValue=true;
        }
      
    else if(this.profiles[field]==1){
      retValue=true;
    }

    // let control = group.controls[field];
    // if (control && control.validator && control.validator({} as AbstractControl) && 
    // control.validator({} as AbstractControl).required) {
    //   retValue = true;
    // }

    return retValue;
  }

  canShowMandatorySign(field:any,group?:any){
    
    if(group && field=='emergencyContact' &&  this.profiles["emergencyContactPrimaryFlag"]==1 && group.value.primayContact==1 && this.profiles["emergencyContactPrimaryMandatoryFlag"]==1){
      return true;
    }
    return this.canShowField(field);
  }

  /**
   * 
   *  Saves the individual profile fields. 
   */
  async saveProgramFields(){


    const profileForm = this.profileFormGroup;
    this.saveAndNextButtonClicked=true;

    console.log(JSON.stringify(profileForm.value,null,4));

    Object.keys(profileForm.controls).forEach(controlName => {
      const formArray = profileForm.get(controlName) as FormArray;
    
      formArray.controls.forEach((controlGroup:any) => {
        Object.keys(controlGroup['controls']).forEach(controlGroupName => {
          const control = controlGroup.get(controlGroupName);
          if (control.invalid) {
            this.showError(controlGroup,controlGroupName);
           // alert(`You have not entered ${controlGroupName} or if it is not displayed then it is not configured properly. `);
            console.log(`Error in ${controlGroupName} control of ${controlName} FormArray`);
          }
        });
      });
    });
    
   
    if(!this.profileFormGroup.valid){
      console.log("Fields marked with * are mandatory");
      return;
    }

   





    if(this.profileFormGroup.dirty && this.profileFormGroup.touched){
      let programConfigurationFieldsList:any=[]
      programConfigurationFieldsList=programConfigurationFieldsList.concat(this.profileFormGroup.value.adults);
      programConfigurationFieldsList=programConfigurationFieldsList.concat(this.profileFormGroup.value.children);
      programConfigurationFieldsList=programConfigurationFieldsList.concat(this.profileFormGroup.value.youth);
      this.profiles.programConfigurationFieldsList=programConfigurationFieldsList
      this.programService.saveProgramConfigurationFields(this.profiles);
    }

    if(this.profileImages.length>0){
      await this.uploadProfileImages()
    }
    this.saveAndNextButtonClicked=false;

    await this.reviewandupdateWaitList();
    this.routePass.sendData({'currenttab':'Additional Details','Event':'SaveNext'}); 

    //this.saveAndNext.emit("tabIndividualProfileTab")  
  }


  async reviewandupdateWaitList(){
    
    let body:any={
      familyId: this.familyId,
      programCode: this.selectedProgram.code,
      chapterCode:  this.selectedChapterCode,
      personId: this.currentUserData.personID
    };
   
    let data = await this.programService.reviewAndUpdateWaitListedStatus(body);
  }

  async uploadProfileImages(){

    for(let i=0;i<this.profileImages.length;i++){
      let profileImageDetails = this.profileImages[i];
      const fileData={
        documentID: 0,
        personID: profileImageDetails.personID,
        documentTypeCode: "person",
        tabName: "personTabName"
      }
      await this.programService.uploadImages(profileImageDetails.image,fileData);
    }
    
  }

 

  /**
   * 
   *  Fetches the fields which are configured at the backend and displayed under individual profile fields.
   */
  async fetchProgramConfigurationFields(){
    const body = {
      "familyId": this.familyId,
      "programCode": this.selectedProgram.code,
      "chapterCode": this.selectedChapterCode,
      "paymentFlag": false,
    }

    this.profiles = await this.programService.fetchProgramConfigurationFields(body);

    let flagFound=false;
    console.log(this.profiles);
    for (let prop in this.profiles) {
      if (this.profiles.hasOwnProperty(prop)) {
        console.log(prop + ': ' + this.profiles[prop]);
        if(prop.indexOf("Flag")>-1 && this.profiles[prop]==1 && prop!="volunteerSignupFlag"){
          flagFound=true;
          break;
        }
      }
    }

    if(!flagFound){
      this.saveAndNext.emit("tabIndividualProfileTab")  
    }
    
  }

  async getImage(documentID:any,personID:any){
    // return "";
    // this.cdr.detectChanges();
    if(!documentID || documentID==0){
      return "";
    //   console.log("returning");
    }
    let queryParam = '?documentID=' + documentID + '&personID=' + personID;
    let image = await this.programService.downloadImage(queryParam);
    
    return image;

  }
}
