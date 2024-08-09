import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProgramRegStepsEmailComponent } from '../../../../create-program-reg-steps-email/create-program-reg-steps-email.component';

export interface RegSteps {
  checkbox: string;
  registrationstatus: string;
  paymentstatus: string;
  sequence: string;
  email: string;
}

@Component({
  selector: 'app-registration-steps',
  templateUrl: './registration-steps.component.html',
  styleUrls: ['./registration-steps.component.scss']
})

export class RegistrationStepsComponent {

  RegSteps: RegSteps[] = [
    {checkbox: '', registrationstatus: '', paymentstatus: '', sequence: '', email: ''}
  ];

  displayedColumnsRegSteps: string[] = ['checkbox', 'registrationstatus', 'paymentstatus', 'sequence', 'email'];

  dataSourceRegSteps = new MatTableDataSource<RegSteps>(this.RegSteps);

  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceRegSteps=new MatTableDataSource(this.RegSteps);

    this.dataSourceRegSteps.paginator = this.paginator;

    this.dataSourceRegSteps.sort = this.sort;
  }

  async Email(){
    const modalRef = await this.modalService.open(CreateProgramRegStepsEmailComponent,{ size: 'lg' });
  }

  constructor(
    private router:Router,
    private modalService: NgbModal
    ){
    
  }

  back(){
    this.router.navigateByUrl("/program-configuration/create-program/signup-codes/signup-code-details/class-codes")
   }

   backtoconfig(){
    this.router.navigateByUrl("/program-configuration/create-program/configuration")
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
      email:''
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
