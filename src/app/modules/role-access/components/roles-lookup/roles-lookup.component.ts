import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface RolesLookup {
  rolename: string;
  status: string;
}

@Component({
  selector: 'app-roles-lookup',
  templateUrl: './roles-lookup.component.html',
  styleUrls: ['./roles-lookup.component.scss']
})

export class RolesLookupComponent {
  RolesLookup: RolesLookup[] = [
    {rolename: '', status: ''}
  ];

  displayedColumnsRolesLookup: string[] = ['rolename', 'status'];

  dataSourceRolesLookup = new MatTableDataSource<RolesLookup>(this.RolesLookup);

  @ViewChild(MatPaginatorModule) paginatormodule: MatPaginatorModule
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceRolesLookup=new MatTableDataSource(this.RolesLookup);

    this.dataSourceRolesLookup.paginator = this.paginator;

    this.dataSourceRolesLookup.sort = this.sort;
  }
}
