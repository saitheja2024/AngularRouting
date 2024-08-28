import { Component } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createEmailValidator, phoneNumberValidator } from 'src/app/Validators/custom-validators';
import { FamilyService } from 'src/app/modules/chinmaya-shared/services/family/family.service';
import { MasterService } from 'src/app/modules/chinmaya-shared/services/master/master.service';
import { StoreService, KEYS } from 'src/app/modules/chinmaya-shared/services/store/store.service';
import { ClassRegistrationService } from 'src/app/modules/chinmaya-shared/services/program-registration/classregistration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-registration',
  templateUrl: './new-registration.component.html',
  styleUrls: ['./new-registration.component.scss']
})
export class NewRegistrationComponent {

  contactsForm:FormGroup;
  selectedAcademicYear: any;
  selectedChapterCode: any;
  stateList: any;
  validateFlag:boolean=false;
  mobileCheckFlag:boolean=false;
  zipCodeFlag:boolean=false;
  currentUserData:any;
  constructor(private router:Router,
     private fb:FormBuilder,
     private familyService:FamilyService,
    private store: StoreService,
  private masterService:MasterService, private classRgiSrvice:ClassRegistrationService){}
  
  get zipCode() {
    return this.contactsForm.get('zipCode')!;
  }

  get CF(): { [key: string]: AbstractControl } {
    return this.contactsForm.controls;
  }
  async ngOnInit(){
    this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.currentUserData = this.classRgiSrvice.getLoggedInUser();
    await this.initForm();
    await  this.fetchstateList();
    
  }

  async fetchstateList(){
    this.stateList = await this.masterService.fetchstateList();
  }

 async initForm(){
    let password = window.btoa('');
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


  async onRegisterButtonClick(flag:any){
    let formValues = this.contactsForm.value;
    formValues.username=formValues.emailAddress;
    let user = {
      user:formValues,
      modifiedBy: this.currentUserData.personID
    }
    this.familyService.setRegisterWithMembership(flag);

    this.contactsForm.markAsTouched();
    this.mobileCheckFlag=false;
    this.validateFlag=false;
    this.zipCodeFlag=false;
    let ziplength:any = (this.contactsForm.controls['zipCode'].value).toString().length;
    if(!this.contactsForm.invalid && ziplength==5){
    let data:any = await this.familyService.saveFamilyAndPerson(user);
      Swal.fire({
        icon: 'success',
        title: 'New Family Created Successfully.',
        showCancelButton: false,
        confirmButtonText: 'OK',
      });
      sessionStorage.setItem('newUserData', JSON.stringify(data));
      this.familyService.setSelectedFamily(data.user);

      this.router.navigateByUrl('/programregistration/family-reg-workflow/'+flag);
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

  regiwrkFlw(){
   let data = JSON.parse(sessionStorage.getItem('newUserData') || '');
   this.familyService.setSelectedFamily(data.user);
  }

  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
