import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface ClassCodes {
  checkbox: string;
  classcode: string;
  subclasscode: string;
  session: string;
  minimumschoolgrade: string;
  maximumschoolgrade: string;
  capacity: string;
  actions: string;
}

@Component({
  selector: 'app-class-codes',
  templateUrl: './class-codes.component.html',
  styleUrls: ['./class-codes.component.scss']
})

export class ClassCodesComponent {
  ClassCodes: ClassCodes[] = [
    {checkbox:'', classcode: '', subclasscode: '', session: '', minimumschoolgrade: '', maximumschoolgrade: '', capacity: '', actions:''}
  ];

  displayedColumnsClassCodes: string[] = ['checkbox', 'classcode', 'subclasscode', 'session', 'minimumschoolgrade', 'maximumschoolgrade', 'capacity', 'actions'];

  dataSourceClassCodes = new MatTableDataSource<ClassCodes>(this.ClassCodes);

  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceClassCodes=new MatTableDataSource(this.ClassCodes);

    this.dataSourceClassCodes.paginator = this.paginator;

    this.dataSourceClassCodes.sort = this.sort;
  }

  showContentClassCodes: boolean = false;

  onCheckboxChangeClassCodes(event: Event) {
    this.showContentClassCodes = (event.target as HTMLInputElement).checked;
  }

  constructor(
    private router:Router,
    ){
    
  }

  back(){
    this.router.navigateByUrl("/program-configuration/create-program/signup-codes/signup-code-details/pledge-structure")
   }

   next(){
    this.router.navigateByUrl("/program-configuration/create-program/signup-codes/signup-code-details/registration-steps")
   }

   AddRow() {
    const newRow: ClassCodes = {
      checkbox:'',
      classcode:'',
      subclasscode:'',
      session:'',
      minimumschoolgrade:'',
      maximumschoolgrade:'',
      capacity:'',
      actions:''
    };
	
    const updatedData = [...this.dataSourceClassCodes.data, newRow];
    this.dataSourceClassCodes.data = updatedData;
  }

  selection: ClassCodes[] = [];

  toggleSelection(row: ClassCodes) {
    const index = this.selection.indexOf(row);
    if (index === -1) {
      this.selection.push(row);
    } else {
      this.selection.splice(index, 1);
    }
  }

  isAllSelected() {
    return this.selection.length === this.dataSourceClassCodes.data.length;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection = [];
    } else {
      this.selection = [...this.dataSourceClassCodes.data];
    }
  }

  DeleteRow() {
    this.dataSourceClassCodes.data = this.dataSourceClassCodes.data.filter(row => !this.selection.includes(row));
    this.selection = [];
  }
}
