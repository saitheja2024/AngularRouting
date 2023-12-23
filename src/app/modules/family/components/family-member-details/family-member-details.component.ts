import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FamilyService } from 'src/app/modules/chinmaya-shared/services/family/family.service';

@Component({
  selector: 'app-family-member-details',
  templateUrl: './family-member-details.component.html',
  styleUrls: ['./family-member-details.component.scss']
})
export class FamilyMemberDetailsComponent {
  selectedFamilyMember: any;
  familyMemberDetailsForm: any;


  constructor(
    private familyService: FamilyService,
    private fb: FormBuilder
  ) { }


  ngOnInit() {
    this.selectedFamilyMember = this.familyService.getSelectedFamilyMember();
    this.initForm();
  }

  initForm() {

    this.familyMemberDetailsForm = this.fb.group({
      avatar: [''],
      password: [''],
      familyID: [0],
      personID: [0],
      firstName: ['', [Validators.required,]],
      middleName: ['', []],
      lastName: ['', [Validators.required,]],
      gender: ['', Validators.required],
      emailAddress: ['', [Validators.required]],
      phoneNumber: ['', Validators.required],
      homePhone: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      address3: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required,],
      chapter: ['', Validators.required],
      totalAmount: [0],
      totalAmountWithConvenienceFee: [0],
      personType: ['', Validators.required],
      dateOfBirth: [''],
      maritalStatus: ['', Validators.required],
      status: [''],
      memberSince: [''],
      vaccinationStatus: ["", Validators.required],
      workPhone: ['', Validators.required],
      emergencyContact1: [''],
      phone1: [''],
      emergencyContact2: [''],
      phone2: [''],
      relationShipPrimaryContact: ['', Validators.required],
      dependentUsername: [''],
      schoolGrade: [''],
      primaryContact: [''],
      username: [''],
      chapterDescription: [''],
      tshirtSize: [''],
      relationShipPrimaryContact1: ['', Validators.required],
      relationShipPrimaryContact2: ['', Validators.required],
      childRelationShipContact1: [''],
      childRelationShipContact2: [''],
      mobileFlag: [''],
      workFlag: [''],
      sphomePhoneFlag: [''],
      custodyIssue: ['No'],
      loginFlag: [0]
    });
  }

}
