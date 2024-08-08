import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface ChoiceDetails {
  checkbox: string;
  code: string;
  label: string;
  description: string;
  control: string;
  displayorder: string;
  active: string;
  actions: string;
}

@Component({
  selector: 'app-choice-details',
  templateUrl: './choice-details.component.html',
  styleUrls: ['./choice-details.component.scss']
})
export class ChoiceDetailsComponent {

  ChoiceDetails: ChoiceDetails[] = [
    {checkbox: '', code: '', label: '', description: '', control: '', displayorder: '', active: '', actions:''}
  ];

  displayedColumnsChoiceDetails: string[] = ['checkbox', 'code', 'label', 'description', 'control', 'displayorder', 'active', 'actions'];

  dataSourceChoiceDetails = new MatTableDataSource<ChoiceDetails>(this.ChoiceDetails);

  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceChoiceDetails=new MatTableDataSource(this.ChoiceDetails);

    this.dataSourceChoiceDetails.paginator = this.paginator;

    this.dataSourceChoiceDetails.sort = this.sort;
  }

  showContentAddChoiceDetails: boolean = false;

  onCheckboxChangeAddChoiceDetails(event: Event) {
    this.showContentAddChoiceDetails = (event.target as HTMLInputElement).checked;
  }

  constructor(
    private router:Router,
    ){
    
  }

  back(){
    this.router.navigateByUrl("/program-configuration/create-program/signup-codes/signup-code-details/payment-processing")
   }

   next(){
    this.router.navigateByUrl("/program-configuration/create-program/signup-codes/signup-code-details/pledge-structure")
   }

   AddRow() {
    const newRow: ChoiceDetails = {
      checkbox:'',
      code:'',
      label:'',
      description:'',
      control:'',
      displayorder:'',
      active:'',
      actions:''
    };

    const updatedData = [...this.dataSourceChoiceDetails.data, newRow];
    this.dataSourceChoiceDetails.data = updatedData;
  }

  selection: ChoiceDetails[] = [];

  toggleSelection(row: ChoiceDetails) {
    const index = this.selection.indexOf(row);
    if (index === -1) {
      this.selection.push(row);
    } else {
      this.selection.splice(index, 1);
    }
  }

  isAllSelected() {
    return this.selection.length === this.dataSourceChoiceDetails.data.length;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection = [];
    } else {
      this.selection = [...this.dataSourceChoiceDetails.data];
    }
  }

  DeleteRow() {
    this.dataSourceChoiceDetails.data = this.dataSourceChoiceDetails.data.filter(row => !this.selection.includes(row));
    this.selection = [];
  }
}
