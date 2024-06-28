import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FamilyService } from '../../chinmaya-shared/services/family/family.service';
import { KEYS, StoreService } from '../../chinmaya-shared/services/store/store.service';
import { MasterService } from '../../chinmaya-shared/services/master/master.service';
import { createEmailValidator, phoneNumberValidator } from 'src/app/Validators/custom-validators';
import Swal from 'sweetalert2';

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
  validateFlag:boolean=false;
  mobileCheckFlag:boolean=false;
  zipCodeFlag:boolean=false;

  constructor(private router:Router,
     private fb:FormBuilder,
     private familyService:FamilyService,
    private store: StoreService,
  private masterService:MasterService){}
  
  get zipCode() {
    return this.contactsForm.get('zipCode')!;
  }

  get CF(): { [key: string]: AbstractControl } {
    return this.contactsForm.controls;
  }
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
      emailAddress: new FormControl('',[Validators.required, createEmailValidator()]),
      chapter: new FormControl(this.selectedChapterCode),
      firstName: new FormControl('',[Validators.required]),
      middleName: new FormControl(''),
      lastName: new FormControl('',[Validators.required]),
      gender: new FormControl('',[Validators.required]),
      phoneNumber: new FormControl('',[Validators.required, phoneNumberValidator()]),
      homePhone: new FormControl('',[Validators.required, phoneNumberValidator()]),
      address: new FormControl('',[Validators.required]),
      address2: new FormControl(''),
      address3: new FormControl(''),
      city: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]),
      zipCode: new FormControl('',[Validators.required, Validators.pattern(/^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/)]),
      status: new FormControl('Active'),
      memberSince: new FormControl(this.getCurrentDate()),
      maritalStatus: new FormControl('Married',[Validators.required]),
      sphomePhoneFlag: new FormControl('1'),
      mobileFlag: new FormControl('1'),
      personType: new FormControl('ADULT')
      });

  }


  async onRegisterButtonClick(){
    let formValues = this.contactsForm.value;
    formValues.username=formValues.emailAddress;
    let user = {
      user:formValues
    }

    this.contactsForm.markAsTouched();
    this.mobileCheckFlag=false;
    this.validateFlag=false;
    this.zipCodeFlag=false;
    let ziplength:any = (this.contactsForm.controls['zipCode'].value).toString().length;
    if(!this.contactsForm.invalid && ziplength==5){
     await this.familyService.saveFamilyAndPerson(user);
      Swal.fire({
        icon: 'success',
        title: 'New Family Created Successfully.',
        showCancelButton: false,
        confirmButtonText: 'OK',
      });
      this.contactsForm.reset();
    }else{
    this.validateFlag=true;
    if(this.contactsForm.controls['sphomePhoneFlag'].value =='' && this.contactsForm.controls['mobileFlag'].value ==''){
      this.mobileCheckFlag = true;
    }
    if(this.contactsForm.controls['zipCode'].value!='' && ziplength<5){
      this.zipCodeFlag=true;
    }
  }
  }


  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}