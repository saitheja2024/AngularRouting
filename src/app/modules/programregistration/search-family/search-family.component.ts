import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
  
  
  contactsForm: any;
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
    await  this.fetchstateList();
    this.initForm();
    
  }

  async fetchstateList(){
    this.stateList = await this.masterService.fetchstateList();
  }

  initForm(){
    this.contactsForm = this.fb.group({
      familyID: new FormControl(0),
      personID: new FormControl(0),
      username: new FormControl(''),
      password: new FormControl('1234567890'),
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
      status: new FormControl(''),
      memberSince: new FormControl(this.getCurrentDate()),
      maritalStatus: new FormControl(''),
      sphomePhoneFlag: new FormControl(''),
      mobileFlag: new FormControl(''),
      });

  }


  async onRegisterButtonClick(){
    let formValues = this.contactsForm.value;
    formValues.userName=formValues.emailAddress;
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