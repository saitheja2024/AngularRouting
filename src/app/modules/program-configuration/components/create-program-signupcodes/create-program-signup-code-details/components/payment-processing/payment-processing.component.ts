import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-processing',
  templateUrl: './payment-processing.component.html',
  styleUrls: ['./payment-processing.component.scss']
})

export class PaymentProcessingComponent {

  selectedOption: string;
  field1Value: string;
  field2Value: string;

  onSelectionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedOption = target.value;
  }

  showContentHasSpecialRequirement: boolean = false;
  showContentIsdocumentuploadrequired: boolean = false;

  onCheckboxChangeHasSpecialRequirement(event: Event) {
    this.showContentHasSpecialRequirement = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChangeIsdocumentuploadrequired(event: Event) {
    this.showContentIsdocumentuploadrequired = (event.target as HTMLInputElement).checked;
  }

  constructor(
    private router:Router,
    ){
    
  }

  back(){
    this.router.navigateByUrl("/program-configuration/create-program/signup-codes/signup-code-details/pre-requisites")
   }

   next(){
    this.router.navigateByUrl("/program-configuration/create-program/signup-codes/signup-code-details/choice-details")
   }
}
