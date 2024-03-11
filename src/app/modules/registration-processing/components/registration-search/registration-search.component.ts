import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/modules/chinmaya-shared/services/master/master.service';
import { RegistrationService } from '../../../chinmaya-shared/services/registration-processing/registration.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-registration-search',
  templateUrl: './registration-search.component.html',
  styleUrls: ['./registration-search.component.scss']
})
export class RegistrationSearchComponent implements OnInit {
  
  
  searchCriteriaForm:any
  registrationStatus: any;

  constructor(
    private masterService:MasterService,
    private fb:FormBuilder,
    private router:Router,
    private regiStrationService:RegistrationService){
    
  }

  async ngOnInit(){


    
    await this.fetchRegistrationStatusList();
    //this.fetchSessionChoicesList();
    this.prepareSearchCriteriaForm();

  }


  

  
  

  prepareSearchCriteriaForm(){
    this.searchCriteriaForm = this.fb.group({
      requestPageModel: this.fb.group({
        page: [0],
        size: [0],
        sortFieldName: [''],
        sortOrder: ['']
      }),
      requestRegistrationProcessingSearch: this.fb.group({
        chapterID: ['CSVA'],
        programCode: ['CS_BALAVIHAR_2023-24'],
        registrationStatusList: new FormArray([]),
        paymentStatusList: [],
        choiceLabel: [''],
        choiceCode: [''],
        assignedSession: [''],
        signupCode: [''],
        className: [''],
        currentSchoolGrade: [''],
        risingSchoolGrade: [''],
        familyID: [""],
        firstName: [''],
        lastName: [''],
        homePhone: ['']
      })
    });

    for(let i=0;i<this.registrationStatus.length;i++){
      this.registrationStatusArray.push(new FormControl(false));
    }

  }


  get registrationStatusArray(): FormArray {
    let retValue = this.searchCriteriaForm.controls.requestRegistrationProcessingSearch.controls.registrationStatusList as FormArray;
    return retValue;
  }
 


  async fetchRegistrationStatusList() {
    this.registrationStatus=await this.masterService.fetchRegistrationStatusList()
  }

  onSearchButtonClick(){
   let searchFormValues:any = JSON.parse(JSON.stringify(this.searchCriteriaForm.value))
   const selectedCodes = this.mapBooleanArrayToCodes(searchFormValues.requestRegistrationProcessingSearch.registrationStatusList);
   searchFormValues.requestRegistrationProcessingSearch.registrationStatusList = selectedCodes;
   this.regiStrationService.setSearchCriteria(searchFormValues);
   this.router.navigateByUrl("/registration-processing/registration-search-results")

  }



  mapBooleanArrayToCodes(booleanArray: boolean[]): string[] {
    
    return booleanArray
      .map((value, index) => (value ? this.registrationStatus[index].code : null))
      .filter(Boolean);
  }
  
 

}
