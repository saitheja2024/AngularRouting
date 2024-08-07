import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-program-configuration-details',
  templateUrl: './create-program-configuration-details.component.html',
  styleUrls: ['./create-program-configuration-details.component.scss']
})

export class CreateProgramConfigurationDetailsComponent {
  selectedOption: string;
  field1Value: string;
  field2Value: string;
  selectedOption1: string;
  field3Value: string;
  field4Value: string;

  onSelectionChange(option: string) {
    this.selectedOption = option;
  }

  onSelectionChange1(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedOption1 = selectElement.value;
  }

  showContent: boolean = false;

  onCheckboxChange(event: Event) {
    this.showContent = (event.target as HTMLInputElement).checked;
  }

  constructor(
    private router:Router,
    ){
    
  }

  next(){
    this.router.navigateByUrl("/program-configuration/create-program/program-details")
   }
}