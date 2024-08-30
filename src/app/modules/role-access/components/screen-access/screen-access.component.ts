import { Component,ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

export interface ScreenAccess {
  role: string;
  screens: string;
  screenaccess: string;
  actions: string;
}

@Component({
  selector: 'app-screen-access',
  templateUrl: './screen-access.component.html',
  styleUrls: ['./screen-access.component.scss']
})

export class ScreenAccessComponent {

  dropdownData : any[] = [];  
  settings:IDropdownSettings={};
  form!:FormGroup;
  selectedItems: any[] = [] ;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dropdownData = [
      { ID: 1, Value: 'Data1' },
      { ID: 2, Value: 'Data2' },
      { ID: 3, Value: 'Data3' },
      { ID: 4, Value: 'Data4' },
      { ID: 5, Value: 'Data5' }
    ];
    this.settings = {
      idField: 'ID',
      textField: 'Value',
    };
    
    this.form = this.fb.group({
      myItems: [this.selectedItems]
  });
  }

  ScreenAccess: ScreenAccess[] = [
    {role: '', screens: '', screenaccess: '', actions:''}
  ];

  displayedColumnsScreenAccess: string[] = ['role', 'screens', 'screenaccess', 'actions'];

  dataSourceScreenAccess = new MatTableDataSource<ScreenAccess>(this.ScreenAccess);

  @ViewChild(MatPaginatorModule) paginatormodule: MatPaginatorModule
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceScreenAccess=new MatTableDataSource(this.ScreenAccess);

    this.dataSourceScreenAccess.paginator = this.paginator;

    this.dataSourceScreenAccess.sort = this.sort;
  }

  AddRow() {
    const newRow: ScreenAccess = {
      role: '',
      screens: '',
      screenaccess: '',
      actions: ''
    };

    const updatedData = [...this.dataSourceScreenAccess.data, newRow];
    this.dataSourceScreenAccess.data = updatedData;
  }

  // Delete rows in mat table

  i: number;
  DeleteRow(index: number) {
    const data = this.dataSourceScreenAccess.data;
    data.splice(index, 1);
    this.dataSourceScreenAccess.data = data;
  }

}