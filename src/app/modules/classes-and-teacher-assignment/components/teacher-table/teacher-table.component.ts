import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface TT {
  teacher: string;
  action: string;
}

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html', 
  styleUrls: ['./teacher-table.component.scss']
})

export class TeacherTableComponent {
  TT: TT[] = [
    {teacher: 'Teacher1', action:''},
    {teacher: 'Teacher2', action:''}
  ];

  displayedColumnsTT: string[] = ['teacher', 'action'];

  dataSourceTT = new MatTableDataSource<TT>(this.TT);

  @ViewChild(MatPaginatorModule) paginatormodule: MatPaginatorModule
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceTT=new MatTableDataSource(this.TT);

    this.dataSourceTT.sort = this.sort;
  }
}