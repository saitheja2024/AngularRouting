import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  FamilyDetails: FamilyDetails[] = [
    {familyid:4367, personid:13636, firstname: 'Suri', middlename:'NA', lastname:'NA', gender:'Male', dob:'1995-0908', registrationtype:'ADULT', homephone:1223345656, email:'csva3@ss.in', mobilephone:9834873476, primarycontact:2398456734},
    {familyid:4367, personid:13637, firstname: 'Siri', middlename:'NA', lastname:'NA', gender:'Female', dob:'1995-0908', registrationtype:'ADULT', homephone:1223345656, email:'csva3@ss.in', mobilephone:9284746464, primarycontact:2398456734},
    {familyid:4367, personid:13638, firstname: 'Suri 2', middlename:'NA', lastname:'NA', gender:'Male', dob:'1995-0908', registrationtype:'CHILD', homephone:1223345656, email:'csva3@ss.in', mobilephone:9384099238, primarycontact:2398456734},
    {familyid:4367, personid:13639, firstname: 'Suri 3', middlename:'NA', lastname:'NA', gender:'Male', dob:'1995-0908', registrationtype:'CHILD', homephone:1223345656, email:'csva3@ss.in', mobilephone:9392908070, primarycontact:2398456734},
    {familyid:4367, personid:13640, firstname: 'Suri 4', middlename:'NA', lastname:'NA', gender:'Male', dob:'1995-0908', registrationtype:'CHILD', homephone:1223345656, email:'csva3@ss.in', mobilephone:9940234567, primarycontact:2398456734}
  ];

  displayedColumnsFamilyDetails: string[] = ['familyid', 'personid', 'firstname', 'middlename', 'lastname', 'gender', 'dob', 'registrationtype', 'homephone', 'email', 'mobilephone', 'primarycontact'];

  dataSourceFamilyDetails = new MatTableDataSource<FamilyDetails>(this.FamilyDetails);

  ngAfterViewInit() {
    this.dataSourceFamilyDetails=new MatTableDataSource(this.FamilyDetails);

    this.dataSourceFamilyDetails.sort = this.sort;
  }

  constructor(private modalService: NgbModal){
  
  }

  async closeModal(){
    const modalRef = await this.modalService.dismissAll();
  }
}
