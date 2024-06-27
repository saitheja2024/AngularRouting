import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FamilyService } from '../../chinmaya-shared/services/family/family.service';
import { KEYS, StoreService } from '../../chinmaya-shared/services/store/store.service';
import { MasterService } from '../../chinmaya-shared/services/master/master.service';

@Component({
  selector: 'app-search-family',
  templateUrl: './search-family.component.html',
  styleUrls: ['./search-family.component.scss']
})
export class SearchFamilyComponent {
  
  
  contactsForm:FormGroup;
  selectedAcademicYear: any;
  selectedChapterCode: any;
  stateList: any;


  constructor(private router:Router,
     private fb:FormBuilder,
     private familyService:FamilyService,
    private store: StoreService,
  private masterService:MasterService){}
  
  async ngOnInit(){
    this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    await this.initForm();
    await  this.fetchstateList();
    
  }

  async fetchstateList(){
    this.stateList = await this.masterService.fetchstateList();
  }

 async initForm(){
    let password = window.btoa('123456');
    this.contactsForm = this.fb.group({
      familyID: new FormControl(0),
      personID: new FormControl(0),
      username: new FormControl(''),
      password: new FormControl(password),
      emailAddress: new FormControl(''),
      chapter: new FormControl(this.selectedChapterCode),
      firstName: new FormControl(''),
      middleName: new FormControl(''),
      lastName: new FormControl(''),
      gender: new FormControl(''),
      phoneNumber: new FormControl(''),
      homePhone: new FormControl(''),
      address: new FormControl(''),
      address2: new FormControl(''),
      address3: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zipCode: new FormControl(''),
      status: new FormControl('Active'),
      memberSince: new FormControl(this.getCurrentDate()),
      maritalStatus: new FormControl(''),
      sphomePhoneFlag: new FormControl(''),
      mobileFlag: new FormControl(''),
      personType: new FormControl('ADULT')
      });

  }


  async onRegisterButtonClick(){
    let formValues = this.contactsForm.value;
    formValues.username=formValues.emailAddress;
    let user = {
      user:formValues
    }
    await this.familyService.saveFamilyAndPerson(user);
  }


  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}