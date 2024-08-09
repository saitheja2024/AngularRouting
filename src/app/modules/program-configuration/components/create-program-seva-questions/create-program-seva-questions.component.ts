import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface SevaQuestions {
  category: string;
  question: string;
  persontype: string;
  isdate: string;
  istext: string;
  isyn: string;
  isrequired: string;
  actions: string;
}

@Component({
  selector: 'app-create-program-seva-questions',
  templateUrl: './create-program-seva-questions.component.html',
  styleUrls: ['./create-program-seva-questions.component.scss']
})

export class CreateProgramSevaQuestionsComponent {
  SevaQuestions: SevaQuestions[] = [
    {category: '', question: '', persontype:'', isdate: '', istext: '', isyn: '', isrequired: '', actions:''}
  ];

  displayedColumnsSevaQuestions: string[] = ['category', 'question', 'persontype', 'isdate', 'istext', 'isyn', 'isrequired', 'actions'];

  dataSourceSevaQuestions = new MatTableDataSource<SevaQuestions>(this.SevaQuestions);

  @ViewChild(MatPaginatorModule) paginatormodule: MatPaginatorModule
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceSevaQuestions=new MatTableDataSource(this.SevaQuestions);

    this.dataSourceSevaQuestions.paginator = this.paginator;

    this.dataSourceSevaQuestions.sort = this.sort;
  }

  // Add rows in mat table

  AddRow() {
    const newRow: SevaQuestions = {
      category:'',
      question:'',
      persontype:'',
      isdate:'',
      istext:'',
      isyn:'',
      isrequired:'',
      actions: ''

    };
    const updatedData = [...this.dataSourceSevaQuestions.data, newRow];
    this.dataSourceSevaQuestions.data = updatedData;
  }


  // Delete rows in mat table

  i: number;
  DeleteRow(index: number) {
    const data = this.dataSourceSevaQuestions.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);

    this.dataSourceSevaQuestions.data = data;
  }
}
