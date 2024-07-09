import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface TSA {
  childsfirstname: string;
  childslastname: string;
  gender: string;
  grade: string;
  parent1firstname: string;
  parent1lastname: string;
  parent1email: string;
  parent2firstname: string;
  parent2lastname: string;
  parent2email: string;
}

@Component({
  selector: 'app-teacher-assignment-details',
  templateUrl: './teacher-assignment-details.component.html',
  styleUrls: ['./teacher-assignment-details.component.scss']
})

export class TeacherAssignmentDetailsComponent {
  TSA: TSA[] = [
    {childsfirstname: 'Mark', childslastname: 'G', gender: 'Male', grade: 'A', parent1firstname: 'Antony', parent1lastname: 'G', 
     parent1email: 'antony@gmail.com', parent2firstname: 'Jenny', parent2lastname: 'G', parent2email: 'jenny@gmail.com'}
  ];

  displayedColumnsTSA: string[] = ['childsfirstname', 'childslastname', 'gender', 'grade', 'parent1firstname', 'parent1lastname', 
                                   'parent1email', 'parent2firstname', 'parent2lastname', 'parent2email'];

  dataSourceTSA = new MatTableDataSource<TSA>(this.TSA);

  @ViewChild(MatPaginatorModule) paginatormodule: MatPaginatorModule
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    
    this.dataSourceTSA=new MatTableDataSource(this.TSA);

    this.dataSourceTSA.paginator = this.paginator;

    this.dataSourceTSA.sort = this.sort;
  }

  constructor(
    private router:Router,
    ){
    
  }

  back(){
    this.router.navigateByUrl("/program-configuration/classes-and-teacher-assignments")
   }
}
