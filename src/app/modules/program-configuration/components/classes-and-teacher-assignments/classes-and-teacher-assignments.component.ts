import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface cata {
  session: string;
  classname: string;
  subclass: string;
  classemaildistributionlist: string;
}

@Component({
  selector: 'app-classes-and-teacher-assignments',
  templateUrl: './classes-and-teacher-assignments.component.html',
  styleUrls: ['./classes-and-teacher-assignments.component.scss']
})

export class ClassesAndTeacherAssignmentsComponent {
  cata: cata[] = [
    {session: 'SUN_AM', classname: 'ATI-MADHURAM', subclass: 'A1', classemaildistributionlist: 'bv_Ati-Madhuramsuna1@chinmayasomnath.org'},
    {session: 'SUN_AM', classname: 'MADHURAM', subclass: 'A1', classemaildistributionlist: 'bv_Madhuramsuna1@chinmayasomnath.org'},
    {session: 'SUN_AM', classname: 'MADHURAM', subclass: 'A2', classemaildistributionlist: 'bv_Madhuramsuna2@chinmayasomnath.org'}
  ];

  displayedColumnscata: string[] = ['session', 'classname', 'subclass', 'classemaildistributionlist'];

  dataSourcecata = new MatTableDataSource<cata>(this.cata);

  @ViewChild(MatPaginatorModule) paginatormodule: MatPaginatorModule
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourcecata=new MatTableDataSource(this.cata);

    this.dataSourcecata.paginator = this.paginator;

    this.dataSourcecata.sort = this.sort;
  }

  constructor(
    private router:Router,
    ){
    
  }

  ViewProfiles(){
    this.router.navigateByUrl("/program-configuration/classes-and-teacher-assignments/teacher-assignment-details")
   }

}


