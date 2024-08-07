import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-program-program-details',
  templateUrl: './create-program-program-details.component.html',
  styleUrls: ['./create-program-program-details.component.scss']
})

export class CreateProgramProgramDetailsComponent {

  constructor (private router:Router,) { }

  back(){
    this.router.navigateByUrl("/program-configuration/create-program/configuration")
   }

   next(){
    this.router.navigateByUrl("/program-configuration/create-program/registration-steps")
   }

  ngOnInit() {
    
  }
  
  url="./assets/images/jellyfish.jpg";
  
  onselectFile(e:any) {
    if(e.target.files) {
      var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=(event:any)=> {
    this.url=event.target.result;
    }
    }
  }

  showContentIsInstallmentPaymentAllowed: boolean = false;
  showContentAdditionalCustomFields: boolean = false;
  showContentCreateSevaQuestions: boolean = false;
  showContentCurrentYearBasedFlag: boolean = false;
  showContentDisplayCard: boolean = false;

  showContentTshirtText: boolean = false;
  showContentTshirtFlag: boolean = false;
  showContentVaccinationFlag: boolean = false;
  showContentDOBFlag: boolean = false;
  showContentEmergencyContactFlag: boolean = false;
  showContentGCCSesstionFlag: boolean = false;
  showContentEmailFlag: boolean = false;
  showContentImageFlag: boolean = false;
  showContentWorkPhone: boolean = false;

  showContentYouthTshirtText: boolean = false;
  showContentYouthTshirtFlag: boolean = false;
  showContentYouthVaccinationFlag: boolean = false;
  showContentYouthDOBFlag: boolean = false;
  showContentYouthGCCSesstionFlag: boolean = false;
  showContentYouthEmailFlag: boolean = false;
  showContentYouthImageFlag: boolean = false;
  showContentYouthWorkPhone: boolean = false;

  showContentChildTshirtText: boolean = false;
  showContentChildTshirtFlag: boolean = false;
  showContentChildVaccinationFlag: boolean = false;
  showContentChildDOBFlag: boolean = false;
  showContentChildNFMEmergencyContactFlag: boolean = false;
  showContentChildGCCSesstionFlag: boolean = false;
  showContentChildEmailFlag: boolean = false;
  showContentChildImageFlag: boolean = false;
  showContentChildWorkPhone: boolean = false;

  onCheckboxChangeIsInstallmentPaymentAllowed(event: Event) {
    this.showContentIsInstallmentPaymentAllowed = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeAdditionalCustomFields(event: Event) {
    this.showContentAdditionalCustomFields = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeCreateSevaQuestions(event: Event) {
    this.showContentCreateSevaQuestions = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeCurrentYearBasedFlag(event: Event) {
    this.showContentCurrentYearBasedFlag = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeDisplayCard(event: Event) {
    this.showContentDisplayCard = (event.target as HTMLInputElement).checked;
  }

  // Adult Configuration Fields

  onCheckboxChangeTshirtText(event: Event) {
    this.showContentTshirtText = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeTshirtFlag(event: Event) {
    this.showContentTshirtFlag = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeVaccinationFlag(event: Event) {
    this.showContentVaccinationFlag = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeDOBFlag(event: Event) {
    this.showContentDOBFlag = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeEmergencyContactFlag(event: Event) {
    this.showContentEmergencyContactFlag = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeGCCSesstionFlag(event: Event) {
    this.showContentGCCSesstionFlag = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeEmailFlag(event: Event) {
    this.showContentEmailFlag = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeImageFlag(event: Event) {
    this.showContentImageFlag = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeWorkPhone(event: Event) {
    this.showContentWorkPhone = (event.target as HTMLInputElement).checked;
  }

  // Youth Configuration Fields

  onCheckboxChangeYouthTshirtText(event: Event) {
    this.showContentYouthTshirtText = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeYouthTshirtFlag(event: Event) {
    this.showContentYouthTshirtFlag = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeYouthVaccinationFlag(event: Event) {
    this.showContentYouthVaccinationFlag = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeYouthDOBFlag(event: Event) {
    this.showContentYouthDOBFlag = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeYouthGCCSesstionFlag(event: Event) {
    this.showContentYouthGCCSesstionFlag = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeYouthEmailFlag(event: Event) {
    this.showContentYouthEmailFlag = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeYouthImageFlag(event: Event) {
    this.showContentYouthImageFlag = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeYouthWorkPhone(event: Event) {
    this.showContentYouthWorkPhone = (event.target as HTMLInputElement).checked;
  }

  // Child Configuration Fields

  onCheckboxChangeChildTshirtText(event: Event) {
    this.showContentChildTshirtText = (event.target as HTMLInputElement).checked;
  }
  
   onCheckboxChangeChildTshirtFlag(event: Event) {
     this.showContentChildTshirtFlag = (event.target as HTMLInputElement).checked;
  }
  
  onCheckboxChangeChildVaccinationFlag(event: Event) {
    this.showContentChildVaccinationFlag = (event.target as HTMLInputElement).checked;
  }
  
  onCheckboxChangeChildDOBFlag(event: Event) {
    this.showContentChildDOBFlag = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeChildNFMEmergencyContactFlag(event: Event) {
    this.showContentChildNFMEmergencyContactFlag = (event.target as HTMLInputElement).checked;
  }
  
  onCheckboxChangeChildGCCSesstionFlag(event: Event) {
    this.showContentChildGCCSesstionFlag = (event.target as HTMLInputElement).checked;
  }
  
  onCheckboxChangeChildEmailFlag(event: Event) {
    this.showContentChildEmailFlag = (event.target as HTMLInputElement).checked;
  }
  
  onCheckboxChangeChildImageFlag(event: Event) {
    this.showContentChildImageFlag = (event.target as HTMLInputElement).checked;
  }
  
  onCheckboxChangeChildWorkPhone(event: Event) {
    this.showContentChildWorkPhone = (event.target as HTMLInputElement).checked;
  }  

}