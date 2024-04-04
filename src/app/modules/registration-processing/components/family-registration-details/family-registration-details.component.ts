import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/modules/chinmaya-shared/services/alert/alert.service';
import { RegistrationService } from 'src/app/modules/chinmaya-shared/services/registration-processing/registration.service';

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

 constructor(
  private alertService:AlertService,
  private registrationService:RegistrationService,
  private fb:FormBuilder){}



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
  const detailsGroup = this.fb.group({
    personId: detailsData.personId,
    responsePersonProgramList: this.fb.array([]) // Create form array for responsePersonProgramList
  });

  // Iterate over responsePersonProgramList and push form groups into the array
  const responsePersonProgramList = detailsGroup.get('responsePersonProgramList') as FormArray;
  const programDataList = detailsData.responsePersonProgramList;
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
    programFormGroup.addControl(key, this.fb.control(programData[key]));
   
  });

  return programFormGroup;

  
}

 async populateData(){
  this.selectedFamily = this.registrationService.getSelectedFamily();
  this.selectedProgram = this.registrationService.getSelectedProgram();
  this.selectedChapterID = this.registrationService.getSelectedChapter();
  this.registrtionStatusList = await this.registrationService.fetchRegistrationStatus();
  this.paymentStatusList = await this.registrationService.fetchPaymentStatus();
  this.fetchSessionChoice();
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
      if(program.personType=='CHILD'){
       let params= {
         programCode:this.selectedProgram.code,
          signupCode:program.signupCode,
          classCode:program.classAssignment,
          schoolGradeCode:program.schoolGradeCode
      }
      let assignedSubClassDropDownValues = await this.fetchAssignedSubClass(params);
      let tempString=program.registrationId+"";
      this.assignedSubClassList[tempString]=assignedSubClassDropDownValues;
    }
      
    }
   }
  
 }

 getAssignedSubClassListFun(registrtationId:any){
  
   return this.assignedSubClassList[registrtationId];
 }



 async fetchSessionChoice(){
  let params = {
    "programCode":this.selectedProgram.code
  }
  this.assignedSession = await this.registrationService.fetchSessionChoice(params);
}

async fetchAssignedSubClass(params:any){
  let  assignedSubClass = await this.registrationService.fetchAssignedSubClass(params);
  return assignedSubClass;
}


 

  
  onAcceptFamily(){}

  onAssignChoice(){}

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

}
