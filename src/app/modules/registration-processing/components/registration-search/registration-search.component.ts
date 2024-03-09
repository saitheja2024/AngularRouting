import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  
  
  registrationStatusList: any;
  searchCriteriaForm:any

  constructor(
    private masterService:MasterService,
    private fb:FormBuilder,
    private router:Router,
    private regiStrationService:RegistrationService){
    
  }

  ngOnInit(){


    
    this.fetchRegistrationStatusList();
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
        registrationStatus: [''],
        paymentStatus: [''],
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

  }


  async fetchRegistrationStatusList() {
    this.registrationStatusList=await this.masterService.fetchRegistrationStatusList()
  }

  onSearchButtonClick(){
   this.regiStrationService.setSearchCriteria(this.searchCriteriaForm.value);
   this.router.navigateByUrl("/registration-processing/registration-search-results")

  }

  }
