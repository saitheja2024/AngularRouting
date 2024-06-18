import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface FamilySessionDetails {
  familyid: number;
  personid: number;
  signupcode: string;
  choice1: string;
  choice2: string;
  choice3: string;
}

@Component({
  selector: 'app-selection-familysessiondetails',
  templateUrl: './selection-familysessiondetails.component.html',
  styleUrls: ['./selection-familysessiondetails.component.scss']
})

export class SelectionFamilysessiondetailsComponent {
  [x: string]: any;

  FamilySessionDetails: FamilySessionDetails[] = [
    {familyid:4367, personid:13636, signupcode: 'Adult Class & Bala Vihar Session Preference', choice1: 'NA', choice2: 'Sunday 2 (12:15-1:50 PM)', choice3: 'Sunday 1 (9:15-10:50 AM)'}
  ];

  displayedColumnsFamilySessionDetails: string[] = ['familyid', 'personid', 'signupcode', 'choice1', 'choice2', 'choice3'];

  dataSourceFamilySessionDetails = new MatTableDataSource<FamilySessionDetails>(this.FamilySessionDetails);

  ngAfterViewInit() {
    this.dataSourceFamilySessionDetails=new MatTableDataSource(this.FamilySessionDetails);

    this.dataSourceFamilySessionDetails.sort = this.sort;
  }

  constructor(private modalService: NgbModal){
  
  }

  async closeModal(){
    const modalRef = await this.modalService.dismissAll();
  }
}
