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
  FamilyDetails: FamilyDetails [] = [
    {familyid: 4281, personid: 13322, firstname: 'Mohan', middlename:'Gm', lastname: 'Gh', gender: 'Male', dob: '1992-09-08', registrationtype: 'ADULT', homephone: 9823456789, email: 'mohan@ss.in', mobilephone: 9845672341, primarycontact: 1},
    {familyid: 4281, personid: 13323, firstname: 'Mh', middlename:'Gm', lastname: 'Gh', gender: 'Female', dob: '1995-11-12', registrationtype: 'ADULT', homephone: 9823456789, email: 'aaaa@ss.in', mobilephone: 9845672342, primarycontact: 1},
    {familyid: 4281, personid: 13324, firstname: 'Mh1', middlename:'Gm', lastname: 'Gh', gender: 'Male', dob: '2019-09-08', registrationtype: 'CHILD', homephone: 9823456789, email: 'bbbb@ss.in', mobilephone: 9845672343, primarycontact: 1},
    {familyid: 4281, personid: 13325, firstname: 'Mh2', middlename:'Gm', lastname: 'Gh', gender: 'Male', dob: '2021-04-06', registrationtype: 'CHILD', homephone: 9823456789, email: 'cccc@ss.in', mobilephone: 9845672344, primarycontact: 1}
  ]

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
