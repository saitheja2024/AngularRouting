import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface ChoiceCodeDetails {
  choices: string;
  choicelabel: string;
  description: string;
  control: string;
  choiceorder: number;
  active: string;
}

@Component({
  selector: 'app-review-config-choice-code-details',
  templateUrl: './review-config-choice-code-details.component.html',
  styleUrls: ['./review-config-choice-code-details.component.scss']
})

export class ReviewConfigChoiceCodeDetailsComponent {
  ChoiceCodeDetails: ChoiceCodeDetails[] = [
    {choices: 'Chinmaya', choicelabel: 'Chinmaya Mission', description: 'Chinmaya Registration', control: 'Date', choiceorder: 2, active: ''}
  ];

  displayedColumnsChoiceCodeDetails: string[] = ['choices', 'choicelabel', 'description', 'control', 'choiceorder', 'active'];

  dataSourceChoiceCodeDetails = new MatTableDataSource<ChoiceCodeDetails>(this.ChoiceCodeDetails);

  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceChoiceCodeDetails=new MatTableDataSource(this.ChoiceCodeDetails);

    this.dataSourceChoiceCodeDetails.paginator = this.paginator;

    this.dataSourceChoiceCodeDetails.sort = this.sort;
  }
}
