import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/modules/chinmaya-shared/services/alert/alert.service';
import { RegistrationService } from 'src/app/modules/chinmaya-shared/services/registration-processing/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-family-registration-details',
  templateUrl: './family-registration-details.component.html',
  styleUrls: ['./family-registration-details.component.scss']
})
export class FamilyRegistrationDetailsComponent {
  selectedFamily: any;
  registrationDetails: any;
  selectedChapterID: any;
  selectedProgram: any;
  registrationDetailsGroup:any
  registrationForm :any
  registrtionStatusList: any;
  paymentStatusList: any;
  sessionChoice: any;
  assignedSubClassList:any={};
  assignedSession: any;
  address: any;
  assignedSessionList: any={};

 constructor(
  private alertService:AlertService,
  private registrationService:RegistrationService,
  private fb:FormBuilder,
  private router:Router){}



 async  ngOnInit(){
  await this.populateData();
 
  this.initRegistrationDetailsForm();
 }


 initRegistrationDetailsForm(){
  this.registrationForm = this.fb.group({
    registrationDetailsList: this.fb.array([])
  });

  const registrationDetailsList = this.registrationForm.get('registrationDetailsList') as FormArray;

  this.registrationDetails.registrationDetailsList.forEach((details:any) => {
    // Create a form group for each registration details
    const detailsFormGroup = this.createDetailsFormGroup(details);
    registrationDetailsList.push(detailsFormGroup);
  });

 }

 createDetailsFormGroup(detailsData:any): FormGroup {
  // Create a form group for each registration details

  const programDataList = detailsData.responsePersonProgramList;
  let personName="";
  let gender="";
  let schoolGradeCodeDescription="";
  let classAssignment="";
  let yearBasedFlag="";
  if(programDataList && programDataList.length>0){
    personName = programDataList[0].firstName+" "+programDataList[0].lastName;
    gender = programDataList[0].genderDescription;
    schoolGradeCodeDescription=programDataList[0].schoolGradeCodeDescription;
    classAssignment=programDataList[0].classAssignment;
    yearBasedFlag=programDataList[0].yearBasedFlag;


  }
  const detailsGroup = this.fb.group({
    personId: detailsData.personId,
    personName:personName,
    gender:gender,
    schoolGradeCodeDescription:schoolGradeCodeDescription,
    classAssignment:classAssignment,
    yearBasedFlag:yearBasedFlag,
    responsePersonProgramList: this.fb.array([]) // Create form array for responsePersonProgramList
  });

  // Iterate over responsePersonProgramList and push form groups into the array
  const responsePersonProgramList = detailsGroup.get('responsePersonProgramList') as FormArray;
  
  programDataList.forEach((programData:any) => {
    const programFormGroup = this.createProgramFormGroup(programData);
    responsePersonProgramList.push(programFormGroup);



   
  });

  return detailsGroup;
}

createProgramFormGroup(programData:any): FormGroup {

  const programFormGroup = this.fb.group({});
  
  // Loop through each property in the program object
  Object.keys(programData).forEach(async key => {
    // Add a new FormControl for each property in the program object
    programFormGroup.addControl(key, this.fb.control(programData[key]?programData[key]:""));
   
  });

  return programFormGroup;

  
}

 async populateData(){
  this.selectedFamily = this.registrationService.getSelectedFamily();
  this.selectedProgram = this.registrationService.getSelectedProgram();
  this.selectedChapterID = this.registrationService.getSelectedChapter();
  this.registrtionStatusList = await this.registrationService.fetchRegistrationStatus();
  this.paymentStatusList = await this.registrationService.fetchPaymentStatus();
  let param={
    familyID: this.selectedFamily.familyId,
        chapterID: this.selectedChapterID,
        programCode: this.selectedProgram.code
  }
   this.registrationDetails = await this.registrationService.getSelectedFamilyRegistrationDetails(param);
   

   for(let i=0;i<this.registrationDetails.registrationDetailsList.length;i++){
    let registrationDetails:any = this.registrationDetails.registrationDetailsList[i];
    for(let j=0;j<registrationDetails.responsePersonProgramList.length;j++){
      let program = registrationDetails.responsePersonProgramList[j];
      this.address=program.address;
      let tempString=program.registrationId+"";
      let params:any = {
        programCode:this.selectedProgram.code,
        signupCode:program.signupCode
      }

      let assignedSessionDropDownValues = await this.fetchSessionChoiceForFamily(params);
      this.assignedSessionList[tempString]=assignedSessionDropDownValues;
      if(program.personType=='CHILD'){
       let params= {
         programCode:this.selectedProgram.code,
          signupCode:program.signupCode,
          classCode:program.classAssignment,
          schoolGradeCode:program.schoolGradeCode
      }
      let assignedSubClassDropDownValues = await this.fetchAssignedSubClass(params);
      
      this.assignedSubClassList[tempString]=assignedSubClassDropDownValues;

     

    }
      
    }
   }
  
 }
 

 getAssignedSubClassListFun(registrtationId:any){
  
   return this.assignedSubClassList[registrtationId];
 }


 getAssignedSessionListFun(registrtationId:any){
  return this.assignedSessionList[registrtationId];
}



 async fetchSessionChoiceForFamily(params:any){
  let  assignedSession = await this.registrationService.fetchSessionChoiceForFamily(params);
  return assignedSession;
}

async fetchAssignedSubClass(params:any){
  let  assignedSubClass = await this.registrationService.fetchAssignedSubClass(params);
  return assignedSubClass;
}



getPersonSummary(detailsGroup: any) {
  let summary = detailsGroup.get('personName').value;

  // Check if gender is not empty or null
  if (detailsGroup.get('gender').value) {
    summary += ' - ' + detailsGroup.get('gender').value;
  }

  // Check if schoolGradeCodeDescription is not empty or null
  if (detailsGroup.get('schoolGradeCodeDescription').value) {
    summary += ' - ' + detailsGroup.get('schoolGradeCodeDescription').value;
  }

  // Check if schoolGradeCodeDescription is not empty or null
  if (detailsGroup.get('yearBasedFlag').value) {
    summary += '  ' + detailsGroup.get('yearBasedFlag').value;
  }

  // Check if classAssignment is not empty or null
  if (detailsGroup.get('classAssignment').value) {
    summary += ' - ' + detailsGroup.get('classAssignment').value;
  }

  return summary;
}



 

  
  async onAcceptFamilyButtonClick(){

    let param = {
    "familyID": this.selectedFamily.familyId,
    "chapterID": this.selectedChapterID,
    "programCode": this.selectedProgram.code
    }

    await this.registrationService.acceptFamily(param);


    await this.populateData();
    this.initRegistrationDetailsForm();

  } 

  async onAssignChoiceButtonClick(){
    let param = {
      "familyID": this.selectedFamily.familyId,
      "chapterID": this.selectedChapterID,
      "programCode": this.selectedProgram.code
      }
  
      await this.registrationService.assignChoice(param);
  
  
      await this.populateData();
      this.initRegistrationDetailsForm();
  }

  async onSaveButtonClick(){
    console.log(JSON.stringify(this.registrationForm.value,null,4));

    let personProgramList:any=[]
    let registrationList = this.registrationForm.value.registrationDetailsList;

    for(let i=0;i<registrationList.length;i++){
       let registrationDetails = registrationList[i];
       let responsePersonProgramList = registrationDetails.responsePersonProgramList;
       for(let j=0;j<responsePersonProgramList.length;j++){
        let program:any = responsePersonProgramList[j];
        personProgramList.push(program);
       }
    }


    let list = {
      personProgramList:personProgramList
    }
    await this.registrationService.saveFamilyRegistrationDetails(list);
    let param={
      familyID: this.selectedFamily.familyId,
          chapterID: this.selectedChapterID,
          programCode: this.selectedProgram.code
    }
     this.registrationDetails = await this.registrationService.getSelectedFamilyRegistrationDetails(param);

  }


  onCancelButtonClick(){
    this.router.navigateByUrl("/registration-processing/registration-search-results");
  }

}
