import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface RegSteps {
  registrationstatus: string;
  paymentstatus: string;
  sequence: string;
  email: string;
}

@Component({
  selector: 'app-create-program-signup-codes',
  templateUrl: './create-program-signup-codes.component.html',
  styleUrls: ['./create-program-signup-codes.component.scss']
})

export class CreateProgramSignupCodesComponent {
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
}
