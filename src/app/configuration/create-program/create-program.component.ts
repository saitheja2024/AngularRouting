import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.scss']
})
export class CreateProgramComponent implements OnInit{
  // configuration section
  newConfigurations=["New Configuration"];

  // program details
  organizationCodes=["Chinmaya Mission"];
  registrationTypes=["Family","Individual","DELIVERED"];
  registrationPreferences=["Admin","Online"];
  registratTypes=["ADULT","CHILD", "BOTH","YOUTH","ALL"];
  schoolGradeCriterias=["A"];
  preRequisitePrograms=["program-01"];
  crossChapterRegistrations=["Yes","No"];
  installmentNumbers=[1,2,3,4,5,6,7,10];
  tshirtVisible!:boolean;
  paymentVisible!:boolean;
  imageVisible!:boolean;
  mandatoryImageVisible!:boolean;
  additonalVisible!:boolean;
  volunteerVisible!:boolean;

  // configure Volunteer table
  data:any=localStorage.getItem("volunteerTable");
  rowArray=JSON.parse(this.data)||[0];
  count=0;

  constructor(private fb:FormBuilder){}
  programYears=["2023"];
  ngOnInit(): void {
    this.tshirtVisible=false;
    this.paymentVisible=false;
    this.imageVisible=false;
    this.mandatoryImageVisible=false;
    this.additonalVisible=false;
    this.volunteerVisible=false;
  }
  form=this.fb.group({
    newConfiguration:['',[Validators.required]],
    checkBoxYes:['yes',[Validators.required]],
    checkBoxNo:['no',[Validators.required]],
  })
  programForm=this.fb.group({
    organzationCode:[''],
    programCode:[''],
    programYear:[''],
    description:[''],
    programStartDate:['',[Validators.required]],
    programEndDate:['',[Validators.required]],
    image:['',[Validators.required]],
    registrationStartDate:['',[Validators.required]],
    registrationEndDate:['',[Validators.required]],
    registrationType:['',[Validators.required]],
    registrationPreference:['',[Validators.required]],
    registratType:[''],
    schoolGradeCriteria:[''],
    programHeldAt:['',[Validators.required]],
    preRequisiteProgram:[''],
    accountingProjectCode:['',[Validators.required]],
    contributionTowards:[''],
    contributionProjectCode:[''],
    crossChapterRegistration:[''],
    basedOnProgram:['',[Validators.required]],
    tShirtCheckBox:[false],
    tshirtToolTipText:[''],
    walkCheckBox:[false],
    eligibleCheckBox:[false],
    paymentCheckBox:[false],
    installmentNumber:['',[Validators.required]],
    installmentDate:['',[Validators.required]],
    healthCheckBox:[false],
    imageCheckBox:[false],
    mantoryImageCheckBox:[false],
    adultCheckBox:[false,[Validators.required]],
    youthCheckBox:[false,[Validators.required]],
    childCheckBox:[false,[Validators.required]],
    additionalCheckBox:[false],
    volunteerCheckBox:[false]
  });

  get newConfiguration(){
    return this.form.controls['newConfiguration']
  }
  get programStartDate(){
    return this.programForm.controls['programStartDate']
  }
  // Configuration section
  newConfigurationsChange(){
    console.log(this.newConfiguration.value);
  }
  checkBoxYesChange(value:string){
    console.log(value);
  }
  checkBoxNoChange(value:string){
    console.log(value);
  }
  openForm(){};
  openForm1(){};

  // Program Details
  tShirtCheckBoxHandle(){
    this.tshirtVisible=!this.tshirtVisible;
  };
  paymentCheckBoxHandle(){
    this.paymentVisible=!this.paymentVisible
  };
  imageCheckBoxHandle(){
    this.imageVisible=!this.imageVisible;
  };
  mandatoryImageCheckBoxHandle(){
    this.mandatoryImageVisible=!this.mandatoryImageVisible;
  };
  additionalCheckBoxHandle(){
    this.additonalVisible=!this.additonalVisible;
  };
  volunteerCheckBoxHandle(){
    this.volunteerVisible=!this.volunteerVisible;
  };

  dateChange(){
    console.log(this.programStartDate)
  }
    // configure Volunteer table
  addTableRow(){
    this.addRowNumber();
  }
  addRowNumber(){
    this.count++;
    this.rowArray.push(this.count);  
    localStorage.setItem("volunteerTable", JSON.stringify(this.rowArray));
    console.log(this.rowArray);
  }
  
  deleteRow(index:number){
    if(this.rowArray.length===1){
      alert("can't remove only one row is there!");
      return false;
    }else{
        this.rowArray.splice(index, 1);  
        localStorage.setItem("volunteerTable", JSON.stringify(this.rowArray));
        return true;  
    }  
    }
}
