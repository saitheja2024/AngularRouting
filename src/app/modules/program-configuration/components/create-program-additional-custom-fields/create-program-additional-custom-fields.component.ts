import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface CustonFields {
  usercustomfield: string;
  usercustomfield1: string;
  isrequired: string;
  admincustomfield: string;
  admincustomfield1: string;
  isrequired1: string; 
}

@Component({
  selector: 'app-create-program-additional-custom-fields',
  templateUrl: './create-program-additional-custom-fields.component.html',
  styleUrls: ['./create-program-additional-custom-fields.component.scss']
})

export class CreateProgramAdditionalCustomFieldsComponent {
  CustonFields: CustonFields[] = [
    {usercustomfield: 'Customfield Label 1', usercustomfield1:'', isrequired:'', admincustomfield:'Customfield Label 6', admincustomfield1:'', isrequired1:''},
    {usercustomfield: 'Customfield Label 2', usercustomfield1:'', isrequired:'', admincustomfield:'Customfield Label 7', admincustomfield1:'', isrequired1:''},
    {usercustomfield: 'Customfield Label 3', usercustomfield1:'', isrequired:'', admincustomfield:'Customfield Label 8', admincustomfield1:'', isrequired1:''},
    {usercustomfield: 'Customfield Label 4', usercustomfield1:'', isrequired:'', admincustomfield:'Customfield Label 9', admincustomfield1:'', isrequired1:''},
    {usercustomfield: 'Customfield Label 5', usercustomfield1:'', isrequired:'', admincustomfield:'Customfield Label 10', admincustomfield1:'', isrequired1:''}
  ];

  displayedColumnsCustonFields: string[] = ['usercustomfield', 'usercustomfield1', 'isrequired', 'admincustomfield', 'admincustomfield1', 'isrequired1'];

  dataSourceCustonFields = new MatTableDataSource<CustonFields>(this.CustonFields);

  @ViewChild(MatPaginatorModule) paginatormodule: MatPaginatorModule
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedTabChange: number;

  ngAfterViewInit() {
    this.dataSourceCustonFields=new MatTableDataSource(this.CustonFields);

    this.dataSourceCustonFields.paginator = this.paginator;

    this.dataSourceCustonFields.sort = this.sort;
  }
}
