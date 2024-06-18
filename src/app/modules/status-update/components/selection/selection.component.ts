import { Component, ViewChild } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectionFamilyDetailsComponent } from '../selection-family-details/selection-family-details.component';
import { SelectionPaymentdetailsComponent } from '../selection-paymentdetails/selection-paymentdetails.component';

export interface StatusSelection {
  checkbox:string;
  paymentdate: string;
  familyid: number;
  personid: number;
  firstname: string;
  familyname: string;
  email: string;
  reconcile: string;
  payment: string;
  datecreated: string;
}

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})

export class SelectionComponent {
  StatusSelection: StatusSelection[] = [
    {checkbox:'', paymentdate: '2024-05-15 04:29:35', familyid: 4367, personid: 13636, firstname: 'Suresh', familyname: 'NA', email: 'csva3@ss.in', reconcile: 'NA', payment:'', datecreated:'2024-05-15 04:28:29'},
    {checkbox:'', paymentdate: '2024-05-28 09:29:05', familyid: 4384, personid: 13693, firstname: 'Mohan', familyname: 'Ad', email: 'admin1@ss.in', reconcile: 'NA', payment:'', datecreated: '2024-05-28 09:28:08'},
    {checkbox:'', paymentdate: '2024-05-28 09:37:31', familyid: 4385, personid: 13697, firstname: 'Andy', familyname: 'Ls', email: 'admin2@ss.in', reconcile: 'NA', payment: '', datecreated:'2024-05-28 09:36:55'},
    {checkbox:'', paymentdate: '2024-05-29 03:28:25', familyid: 4386, personid: 13699, firstname: 'Sri', familyname: 'Kl', email: 'admin3@ss.in', reconcile: 'NA', payment: '', datecreated:'2024-05-29 03:28:06'},
    {checkbox:'', paymentdate: '2024-05-29 05:14:31', familyid: 4389, personid: 13706, firstname: 'Rahul', familyname: 'Kd', email: 'admin6@ss.in', reconcile: 'NA', payment: '', datecreated:'2024-05-29 05:13:33'},
    {checkbox:'', paymentdate: '2024-06-11 05:04:00', familyid: 4408, personid: 13767, firstname: 'Anudeep', familyname: 'Km', email: 'fdbv1@ss.in', reconcile: 'NA', payment: '', datecreated:'2024-06-11 05:00:39'},
    {checkbox:'', paymentdate: '2024-06-12 03:31:03', familyid: 4416, personid: 13780, firstname: 'Anuj', familyname: 'Sd', email: 'bv11@ss.in', reconcile: 'NA', payment: '', datecreated:'2024-06-12 03:30:31'}
  ];

  displayedColumnsSelection: string[] = ['checkbox','paymentdate','familyid','personid','firstname','familyname','email','reconcile','payment','datecreated'];

  dataSourceStatusSelection = new MatTableDataSource<StatusSelection>(this.StatusSelection);

  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceStatusSelection=new MatTableDataSource(this.StatusSelection);

    this.dataSourceStatusSelection.paginator = this.paginator;

    this.dataSourceStatusSelection.sort = this.sort;
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
