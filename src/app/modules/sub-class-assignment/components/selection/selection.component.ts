import { Component, ViewChild } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
}

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})

export class SelectionComponent {
  SubclassSelection: SubclassSelection[] = [
    {checkbox:'', paymentdate: '2024-05-15 04:29:35', familyid: 4367, personid: 13292, firstname: 'Sonu', familyname:'Sa', gender: 'Male', age: '14 Y 6 Months', schoolgrade: '3rd'}
  ];

  displayedColumnsSelection: string[] = ['checkbox','paymentdate','familyid','personid','firstname','familyname','gender','age','schoolgrade']
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
   //const modalRef = await this.modalService.open(SelectionFamilyDetailsComponent,{ size: 'lg' });
  }

  async paymentdetails(){
    //const modalRef = await this.modalService.open(SelectionPaymentdetailsComponent,{ size: 'lg' });
   }
}
