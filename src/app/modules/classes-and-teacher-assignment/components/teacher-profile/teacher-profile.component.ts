import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface TP {
  teacher: string;
  personid: number;
  username: string;
  action: string;
}
 
@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss']
})

export class TeacherProfileComponent {
  TP: TP[] = [
    {teacher: 'Teacher1', personid: 1234, username: 'teacher1@gmail.com', action:''},
    {teacher: 'Teacher1', personid: 6789, username: 'teacher1@hotmail.com', action:''}
  ];

  displayedColumnsTP: string[] = ['teacher', 'personid', 'username', 'action'];

  dataSourceTP = new MatTableDataSource<TP>(this.TP);

  @ViewChild(MatPaginatorModule) paginatormodule: MatPaginatorModule
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceTP=new MatTableDataSource(this.TP);

    this.dataSourceTP.sort = this.sort;
  }
}
