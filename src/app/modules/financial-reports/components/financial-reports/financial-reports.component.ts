import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface FinReports {
  chaptercode: string;
  programcode: string;
  signupcodecategory: string;
  signupcode: string;
  sessiontype: string;
  session: string;  
}

@Component({
  selector: 'app-financial-reports',
  templateUrl: './financial-reports.component.html',
  styleUrls: ['./financial-reports.component.scss']
})

export class FinancialReportsComponent {
  FinReports: FinReports[] = [
    {chaptercode: 'Chinmaya Mission', programcode: 'CHM_01', signupcodecategory: 'BV Programs', signupcode: 'BV_1', sessiontype: 'Session1', session:'Monday'}
  ];

  displayedColumnsFinReports: string[] = ['chaptercode','programcode','signupcodecategory','signupcode','sessiontype','session'];

  dataSourceFinReports = new MatTableDataSource<FinReports>(this.FinReports);

  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceFinReports=new MatTableDataSource(this.FinReports);

    this.dataSourceFinReports.paginator = this.paginator;

    this.dataSourceFinReports.sort = this.sort;
  }

}
