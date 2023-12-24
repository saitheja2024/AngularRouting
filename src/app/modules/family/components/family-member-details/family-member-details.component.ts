import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FamilyService } from 'src/app/modules/chinmaya-shared/services/family/family.service';
import { MasterService } from 'src/app/modules/chinmaya-shared/services/master/master.service';
import { ProgramService } from 'src/app/modules/chinmaya-shared/services/program/program.service';

@Component({
  selector: 'app-family-member-details',
  templateUrl: './family-member-details.component.html',
  styleUrls: ['./family-member-details.component.scss']
})
export class FamilyMemberDetailsComponent {
  selectedFamilyMember: any;
  familyMemberDetailsForm: any;
  familyMember: any;
  personTypeList: any;
  statusList: any;
  maritialStatusList: any;
  chapterCodes: any;
  stateList: any;


  constructor(
    private familyService: FamilyService,
    private fb: FormBuilder,
    private masterService: MasterService,
    private programService: ProgramService
  ) { }


  async ngOnInit() {
    this.selectedFamilyMember = this.familyService.getSelectedFamilyMember();
    this.initForm();
    await this.fetchMasterData();
    let params = { personID: this.selectedFamilyMember.personID }
    this.familyMember = await this.familyService.fetchPersonByPersonId(params);
    this.loadDataIntoForm(this.familyMember)
  }


  async fetchMasterData() {
    this.personTypeList = await this.masterService.getPersonType();
    this.statusList = await this.masterService.getStatus();
    this.maritialStatusList = await this.masterService.getMaritialStatusList();
    this.chapterCodes = await this.programService.fetchChapterList();
    this.stateList = await this.masterService.getStateList();
  }



  loadDataIntoForm(data: any) {
    this.familyMemberDetailsForm.patchValue(data);
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
