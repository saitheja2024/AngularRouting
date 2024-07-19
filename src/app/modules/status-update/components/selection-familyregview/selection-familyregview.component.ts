import { Component, Input, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { RegistratioReviewService } from 'src/app/modules/chinmaya-shared/services/registration-review/registration-review.service';
export interface FamilyDetails {
  familyid: number;
  personid: number;
  firstname: string;
  middlename: string;
  lastname: string;
  gender: string;
  dob: string;
  registrationtype: string;
  homephone: number;
  email: string;
  mobilephone: number;
  primarycontact: number;
}

@Component({
  selector: 'app-selection-familyregview',
  templateUrl: './selection-familyregview.component.html',
  styleUrls: ['./selection-familyregview.component.scss']
})

export class SelectionFamilyregviewComponent {
  [x: string]: any;
  @Input() selectedRowData: any;
  FamilyDetails: FamilyDetails[] = [
    {familyid:4367, personid:13636, firstname: 'Suri', middlename:'NA', lastname:'NA', gender:'Male', dob:'1995-0908', registrationtype:'ADULT', homephone:1223345656, email:'csva3@ss.in', mobilephone:9834873476, primarycontact:2398456734},
    {familyid:4367, personid:13637, firstname: 'Siri', middlename:'NA', lastname:'NA', gender:'Female', dob:'1995-0908', registrationtype:'ADULT', homephone:1223345656, email:'csva3@ss.in', mobilephone:9284746464, primarycontact:2398456734},
    {familyid:4367, personid:13638, firstname: 'Suri 2', middlename:'NA', lastname:'NA', gender:'Male', dob:'1995-0908', registrationtype:'CHILD', homephone:1223345656, email:'csva3@ss.in', mobilephone:9384099238, primarycontact:2398456734},
    {familyid:4367, personid:13639, firstname: 'Suri 3', middlename:'NA', lastname:'NA', gender:'Male', dob:'1995-0908', registrationtype:'CHILD', homephone:1223345656, email:'csva3@ss.in', mobilephone:9392908070, primarycontact:2398456734},
    {familyid:4367, personid:13640, firstname: 'Suri 4', middlename:'NA', lastname:'NA', gender:'Male', dob:'1995-0908', registrationtype:'CHILD', homephone:1223345656, email:'csva3@ss.in', mobilephone:9940234567, primarycontact:2398456734}
  ];

  displayedColumnsFamilyDetails: string[] = ['familyId', 'personID', 'firstName', 'middleName', 'lastName', 'gender', 'dateOfBirth', 'registrationId', 'homePhone', 'emailAddress', 'phoneNumber', 'primaryContact'];

  dataSourceFamilyDetails = new MatTableDataSource<FamilyDetails>(this.FamilyDetails);

  ngAfterViewInit() {
    console.log(this.selectedRowData);
    
  }

  constructor(private regiStrationReviewService:RegistratioReviewService){
  
  }
 
  ngOnInit(){
    this.familyRegViewDetails();
  }

  async familyRegViewDetails(){
    let param={"familyId":this.selectedRowData.familyId};

      let results  = await this.regiStrationReviewService.fetchfamilyDetails(param);
      this.responseData = results.personProgramList.length;
      this.dataSourceFamilyDetails=new MatTableDataSource(results.personProgramList);
      this.dataSourceFamilyDetails.sort = this.sort;

  }
  
}
