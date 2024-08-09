import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface SevaQuestions {
  checkbox: string;
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
    {checkbox: '', category: '', question: '', persontype:'', isdate: '', istext: '', isyn: '', isrequired: '', actions:''}
  ];

  displayedColumnsSevaQuestions: string[] = ['checkbox', 'category', 'question', 'persontype', 'isdate', 'istext', 'isyn', 'isrequired', 'actions'];

  dataSourceSevaQuestions = new MatTableDataSource<SevaQuestions>(this.SevaQuestions);

  @ViewChild(MatPaginatorModule) paginatormodule: MatPaginatorModule
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceSevaQuestions=new MatTableDataSource(this.SevaQuestions);

    this.dataSourceSevaQuestions.paginator = this.paginator;

    this.dataSourceSevaQuestions.sort = this.sort;
  }

  AddRow() {
    const newRow: SevaQuestions = {
      checkbox:'',
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

  selection: SevaQuestions[] = [];

  toggleSelection(row: SevaQuestions) {
    const index = this.selection.indexOf(row);
    if (index === -1) {
      this.selection.push(row);
    } else {
      this.selection.splice(index, 1);
    }
  }

  isAllSelected() {
    return this.selection.length === this.dataSourceSevaQuestions.data.length;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection = [];
    } else {
      this.selection = [...this.dataSourceSevaQuestions.data];
    }
  }

  DeleteRow() {
    this.dataSourceSevaQuestions.data = this.dataSourceSevaQuestions.data.filter(row => !this.selection.includes(row));
    this.selection = [];
  }
}
