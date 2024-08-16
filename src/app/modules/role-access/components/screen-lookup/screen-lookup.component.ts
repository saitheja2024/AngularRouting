import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface ScreenLookup {
  screenname: string;
  status: string;
}

@Component({
  selector: 'app-screen-lookup',
  templateUrl: './screen-lookup.component.html',
  styleUrls: ['./screen-lookup.component.scss']
})

export class ScreenLookupComponent {
  ScreenLookup: ScreenLookup[] = [
    {screenname: '', status: ''}
  ];

  displayedColumnsScreenLookup: string[] = ['screenname', 'status'];

  dataSourceScreenLookup = new MatTableDataSource<ScreenLookup>(this.ScreenLookup);

  @ViewChild(MatPaginatorModule) paginatormodule: MatPaginatorModule
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceScreenLookup=new MatTableDataSource(this.ScreenLookup);

    this.dataSourceScreenLookup.paginator = this.paginator;

    this.dataSourceScreenLookup.sort = this.sort;
  }
}
