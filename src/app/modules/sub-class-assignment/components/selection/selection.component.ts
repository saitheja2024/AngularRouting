import { Component, ViewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectionFamilyDetailsComponent } from '../selection-family-details/selection-family-details.component';
import { SelectionPaymentdetailsComponent } from '../selection-paymentdetails/selection-paymentdetails.component';

export interface SubclassSelection {
  checkbox:string;
  paymentdate: string;
  familyid: number;
  personid: number;
  firstname: string;
  familyname: string;
  gender: string;
  age: string;
  schoolgrade: string;
  primarypersonid: number;
  primaryfirstname: string;
  primarylastname: string;
  email: string;
  payment: string;
  datecreated: string;
}

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})

export class SelectionComponent {
  SubclassSelection: SubclassSelection[] = [
    {checkbox:'', paymentdate: '2024-05-15 04:29:35', familyid: 4367, personid: 13292, firstname: 'Sonu', familyname:'Sa', gender: 'Male', age: '14 Y 6 Months', schoolgrade: '3rd', primarypersonid: 13290, primaryfirstname: 'Mohan', primarylastname: 'G', email: 'mohan@ss.in', payment: '', datecreated: '2024-03-21 08:52:23'}
  ];

  displayedColumnsSelection: string[] = ['checkbox','paymentdate','familyid','personid','firstname','familyname','gender','age','schoolgrade','primarypersonid','primaryfirstname','primarylastname','email','payment','datecreated']
  dataSourceSubclassSelection = new MatTableDataSource<SubclassSelection>(this.SubclassSelection);

  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceSubclassSelection=new MatTableDataSource(this.SubclassSelection);

    this.dataSourceSubclassSelection.paginator = this.paginator;

    this.dataSourceSubclassSelection.sort = this.sort;
  }

  constructor(private modalService: NgbModal){
    
  }

  async familyid(){
   const modalRef = await this.modalService.open(SelectionFamilyDetailsComponent,{ size: 'lg' });
  }

  async paymentdetails(){
    const modalRef = await this.modalService.open(SelectionPaymentdetailsComponent,{ size: 'lg' });
   }
}
