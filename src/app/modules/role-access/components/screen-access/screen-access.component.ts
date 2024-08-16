import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface ScreenAccess {
  role: string;
  screenaccess: string;
}

@Component({
  selector: 'app-screen-access',
  templateUrl: './screen-access.component.html',
  styleUrls: ['./screen-access.component.scss']
})

export class ScreenAccessComponent {
  ScreenAccess: ScreenAccess[] = [
    {role: '', screenaccess: ''}
  ];

  displayedColumnsScreenAccess: string[] = ['role', 'screenaccess'];

  dataSourceScreenAccess = new MatTableDataSource<ScreenAccess>(this.ScreenAccess);

  @ViewChild(MatPaginatorModule) paginatormodule: MatPaginatorModule
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceScreenAccess=new MatTableDataSource(this.ScreenAccess);

    this.dataSourceScreenAccess.paginator = this.paginator;

    this.dataSourceScreenAccess.sort = this.sort;
  }
}
