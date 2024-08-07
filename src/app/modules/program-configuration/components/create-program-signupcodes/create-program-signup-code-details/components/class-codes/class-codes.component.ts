import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface ClassCodes {
  classcode: string;
  subclasscode: string;
  session: string;
  minimumschoolgrade: string;
  maximumschoolgrade: string;
  capacity: string;
  actions: string;
}

@Component({
  selector: 'app-class-codes',
  templateUrl: './class-codes.component.html',
  styleUrls: ['./class-codes.component.scss']
})

export class ClassCodesComponent {
  ClassCodes: ClassCodes[] = [
    {classcode: '', subclasscode: '', session: '', minimumschoolgrade: '', maximumschoolgrade: '', capacity: '', actions:''}
  ];

  displayedColumnsClassCodes: string[] = ['classcode', 'subclasscode', 'session', 'minimumschoolgrade', 'maximumschoolgrade', 'capacity', 'actions'];

  dataSourceClassCodes = new MatTableDataSource<ClassCodes>(this.ClassCodes);

  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceClassCodes=new MatTableDataSource(this.ClassCodes);

    this.dataSourceClassCodes.paginator = this.paginator;

    this.dataSourceClassCodes.sort = this.sort;
  }

  showContentClassCodes: boolean = false;

  onCheckboxChangeClassCodes(event: Event) {
    this.showContentClassCodes = (event.target as HTMLInputElement).checked;
  }

  constructor(
    private router:Router,
    ){
    
  }

  back(){
    this.router.navigateByUrl("/program-configuration/create-program/signup-codes/signup-code-details/pledge-structure")
   }

   next(){
    this.router.navigateByUrl("/program-configuration/create-program/signup-codes/signup-code-details/registration-steps")
   }
}
