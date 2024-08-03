import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProgramRegStepsEmailComponent } from '../create-program-reg-steps-email/create-program-reg-steps-email.component';

export interface RegSteps {
  registrationstatus: string;
  paymentstatus: string;
  sequence: string;
  email: string;
}

@Component({
  selector: 'app-create-program-registration-steps',
  templateUrl: './create-program-registration-steps.component.html',
  styleUrls: ['./create-program-registration-steps.component.scss']
})

export class CreateProgramRegistrationStepsComponent {
  RegSteps: RegSteps[] = [
    {registrationstatus: '', paymentstatus: '', sequence: '', email: ''}
  ];

  displayedColumnsRegSteps: string[] = ['registrationstatus', 'paymentstatus', 'sequence', 'email'];

  dataSourceRegSteps = new MatTableDataSource<RegSteps>(this.RegSteps);

  @ViewChild(MatPaginatorModule) paginatormodule: MatPaginatorModule
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceRegSteps=new MatTableDataSource(this.RegSteps);

    this.dataSourceRegSteps.paginator = this.paginator;

    this.dataSourceRegSteps.sort = this.sort;
  }

  constructor(private modalService: NgbModal){
    
  }

  async Email(){
    const modalRef = await this.modalService.open(CreateProgramRegStepsEmailComponent,{ size: 'lg' });
  }

}
