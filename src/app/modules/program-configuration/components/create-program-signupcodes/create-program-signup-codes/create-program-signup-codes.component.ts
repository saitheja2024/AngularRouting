import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface SignUpCode {
  signupid: number;
  signupcode: string;
  description: string;
  starttime: string;
  endtime: string;
  location: string;
  programcode: string;
  actions: string;
}

@Component({
  selector: 'app-create-program-signup-codes',
  templateUrl: './create-program-signup-codes.component.html',
  styleUrls: ['./create-program-signup-codes.component.scss']
})

export class CreateProgramSignupCodesComponent {
  SignUpCode: SignUpCode[] = [
    {signupid: 810, signupcode: 'Chinmaya', description: 'Chinmaya SignUp', starttime: '08/05/2024 00:00', endtime: '08/06/2024 00:00',
     location: 'Washington, DC', programcode: 'CMWRC24_25', actions: ''}
  ];

  displayedColumnsSignUpCode: string[] = ['signupid', 'signupcode', 'description', 'starttime', 'endtime', 'location', 'programcode', 'actions'];

  dataSourceSignUpCode = new MatTableDataSource<SignUpCode>(this.SignUpCode);

  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngAfterViewInit() {
    this.dataSourceSignUpCode=new MatTableDataSource(this.SignUpCode);

    this.dataSourceSignUpCode.paginator = this.paginator;

    this.dataSourceSignUpCode.sort = this.sort;
  }

  constructor(
    private router:Router,
    ){
    
  }

  SignupCodeDetails(){
    this.router.navigateByUrl("/program-configuration/create-program/signup-codes/signup-code-details/signup-code-details")
  }

  back(){
    this.router.navigateByUrl("/program-configuration/create-program/registration-steps")
  }

  backtoconfig(){
    this.router.navigateByUrl("/program-configuration/create-program/configuration")
  }

  next(){
    this.router.navigateByUrl("/program-configuration/create-program/review-configuration")
  }

  i: number;
  Delete(index: number) {
    const data = this.dataSourceSignUpCode.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);

    this.dataSourceSignUpCode.data = data;
  }
}
