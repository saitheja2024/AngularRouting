import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProgramRegStepsEmailComponent } from '../create-program-reg-steps-email/create-program-reg-steps-email.component';
import { Router } from '@angular/router';

export interface RegSteps {
  checkbox: string;
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
    {checkbox: '', registrationstatus: '', paymentstatus: '', sequence: '', email: ''}
  ];

  displayedColumnsRegSteps: string[] = ['checkbox', 'registrationstatus', 'paymentstatus', 'sequence', 'email'];

  dataSourceRegSteps = new MatTableDataSource<RegSteps>(this.RegSteps);

  @ViewChild(MatPaginatorModule) paginatormodule: MatPaginatorModule
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceRegSteps=new MatTableDataSource(this.RegSteps);

    this.dataSourceRegSteps.paginator = this.paginator;

    this.dataSourceRegSteps.sort = this.sort;
  }

  constructor(
    private modalService: NgbModal,
    private router:Router,
  ){
    
  }

  async Email(){
    const modalRef = await this.modalService.open(CreateProgramRegStepsEmailComponent,{ size: 'lg' });
  }

  back(){
    this.router.navigateByUrl("/program-configuration/create-program/program-details")
   }

  next(){
    this.router.navigateByUrl("/program-configuration/create-program/signup-codes")
   }

   AddRow() {
    const newRow: RegSteps = {
      checkbox:'',
      registrationstatus:'',
      paymentstatus:'',
      sequence:'',
      email:'',
    };


    const updatedData = [...this.dataSourceRegSteps.data, newRow];
    this.dataSourceRegSteps.data = updatedData;
  }

  selection: RegSteps[] = [];

  toggleSelection(row: RegSteps) {
    const index = this.selection.indexOf(row);
    if (index === -1) {
      this.selection.push(row);
    } else {
      this.selection.splice(index, 1);
    }
  }

  isAllSelected() {
    return this.selection.length === this.dataSourceRegSteps.data.length;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection = [];
    } else {
      this.selection = [...this.dataSourceRegSteps.data];
    }
  }

  DeleteRow() {
    this.dataSourceRegSteps.data = this.dataSourceRegSteps.data.filter(row => !this.selection.includes(row));
    this.selection = [];
  }

}
