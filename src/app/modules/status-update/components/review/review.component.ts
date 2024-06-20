import { Component, ViewChild } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectionFamilyDetailsComponent } from '../selection-family-details/selection-family-details.component';
import { SelectionPaymentdetailsComponent } from '../selection-paymentdetails/selection-paymentdetails.component';

export interface StatusReview {
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
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})

export class ReviewComponent {
  StatusReview: StatusReview[] = [
    {checkbox:'', paymentdate: '2024-05-15 04:29:35', familyid: 4367, personid: 13636, firstname: 'Suresh', lastname: 'NA', email: 'csva3@ss.in', sessionassignment: 'NA', datecreated: '2024-05-15 04:28:29', reconcile: 'NA', payment:'', actions:''}
  ];

  displayedColumnsReview: string[] = ['checkbox','paymentdate','familyid', 'personid', 'firstname', 'lastname', 'email', 'sessionassignment', 'datecreated', 'reconcile', 'payment', 'actions'];

  dataSourceStatusReview = new MatTableDataSource<StatusReview>(this.StatusReview);

  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceStatusReview=new MatTableDataSource(this.StatusReview);

    this.dataSourceStatusReview.paginator = this.paginator;

    this.dataSourceStatusReview.sort = this.sort;
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
