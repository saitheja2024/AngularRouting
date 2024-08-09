import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProgramRegStepsEmailComponent } from '../create-program-reg-steps-email/create-program-reg-steps-email.component';

export interface RegStatus {
  registrationstatus: string;
  paymentstatus: string;
  sequence: string;
  email: string;
}

@Component({
  selector: 'app-review-config-reg-steps',
  templateUrl: './review-config-reg-steps.component.html',
  styleUrls: ['./review-config-reg-steps.component.scss']
})

export class ReviewConfigRegStepsComponent {
  RegStatus: RegStatus[] = [
    {registrationstatus: 'ACCEPTED', paymentstatus: 'BALANCE_DUE', sequence: '', email: ''}
  ];

  displayedColumnsRegStatus: string[] = ['registrationstatus', 'paymentstatus', 'sequence', 'email'];

  dataSourceRegStatus = new MatTableDataSource<RegStatus>(this.RegStatus);

  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceRegStatus=new MatTableDataSource(this.RegStatus);

    this.dataSourceRegStatus.paginator = this.paginator;

    this.dataSourceRegStatus.sort = this.sort;
  }

  constructor(
    private modalService: NgbModal,
  ){
    
  }

  async Email(){
    const modalRef = await this.modalService.open(CreateProgramRegStepsEmailComponent,{ size: 'lg' });
  }

}
