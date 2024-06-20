import { Component, ViewChild } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectionFamilyDetailsComponent } from '../selection-family-details/selection-family-details.component';
import { SelectionPaymentdetailsComponent } from '../selection-paymentdetails/selection-paymentdetails.component';

export interface StatusComplete {
  checkbox:string;
  paymentdate: string;
  familyid: number;
  personid: number;
  firstname: string;
  lastname: string;
  email: string;
  sessionassignment: string;
  datecreated: string;
  reconcile: string;
  payment: string;
  actions: string;
}

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})

export class CompleteComponent {
  StatusComplete: StatusComplete[] = [
    {checkbox:'', paymentdate: '2024-05-15 04:29:35', familyid: 4367, personid: 13636, firstname: 'Suresh', lastname: 'NA', email: 'csva3@ss.in', sessionassignment: 'NA', datecreated: '2024-05-15 04:28:29', reconcile: 'NA', payment:'', actions:''}
  ];

  displayedColumnsComplete: string[] = ['checkbox','paymentdate','familyid', 'personid', 'firstname', 'lastname', 'email', 'sessionassignment', 'datecreated', 'reconcile', 'payment', 'actions'];

  dataSourceStatusComplete = new MatTableDataSource<StatusComplete>(this.StatusComplete);

  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceStatusComplete=new MatTableDataSource(this.StatusComplete);

    this.dataSourceStatusComplete.paginator = this.paginator;

    this.dataSourceStatusComplete.sort = this.sort;
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
