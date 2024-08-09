import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface ClassCodeDetails {
  classcode: string;
  subclasscode: string;
  session: string;
  minimumschoolgrade: string;
  maximumschoolgrade: string;
  capacity: number;
}

@Component({
  selector: 'app-review-config-classcode-details',
  templateUrl: './review-config-classcode-details.component.html',
  styleUrls: ['./review-config-classcode-details.component.scss']
})

export class ReviewConfigClasscodeDetailsComponent {
  ClassCodeDetails: ClassCodeDetails[] = [
    {classcode: 'Class 1', subclasscode: 'Sub Class 1', session: 'Session 1', minimumschoolgrade: '2nd Grade', maximumschoolgrade: '5th Grade', capacity: 4}
  ];

  displayedColumnsClassCodeDetails: string[] = ['classcode', 'subclasscode', 'session', 'minimumschoolgrade', 'maximumschoolgrade', 'capacity'];

  dataSourceClassCodeDetails = new MatTableDataSource<ClassCodeDetails>(this.ClassCodeDetails);

  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceClassCodeDetails=new MatTableDataSource(this.ClassCodeDetails);

    this.dataSourceClassCodeDetails.paginator = this.paginator;

    this.dataSourceClassCodeDetails.sort = this.sort;
  }
}
