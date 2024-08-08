import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface PackageDetails {
  checkbox: string;
  programcode: string;
  packagecode: string;
  packagedescription: string;
  amount: string;
  effectivestartdate: string;
  effectiveenddate: string;
  category: string;
}

@Component({
  selector: 'app-create-program-package-details',
  templateUrl: './create-program-package-details.component.html',
  styleUrls: ['./create-program-package-details.component.scss']
})

export class CreateProgramPackageDetailsComponent {
  PackageDetails: PackageDetails[] = [
    { checkbox: '', programcode: '', packagecode: '', packagedescription: '', amount: '', effectivestartdate: '', effectiveenddate: '', 
      category: '',}
  ];

  displayedColumnsPackageDetails: string[] = ['checkbox', 'programcode', 'packagecode', 'packagedescription', 'amount', 'effectivestartdate', 
                                              'effectiveenddate', 'category'];

  dataSourcePackageDetails = new MatTableDataSource<PackageDetails>(this.PackageDetails);

  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourcePackageDetails=new MatTableDataSource(this.PackageDetails);

    this.dataSourcePackageDetails.paginator = this.paginator;

    this.dataSourcePackageDetails.sort = this.sort;
  }

  constructor(
    private router:Router,
    ){
    
  }

  back(){
    this.router.navigateByUrl("/program-configuration/create-program/signup-codes")
   }

   next(){
    this.router.navigateByUrl("/program-configuration/create-program/review-configuration")
   }

   addRow() {
    const newRow: PackageDetails = {
      checkbox:'',
      programcode:'',
      packagecode:'',
      packagedescription:'',
      amount:'',
      effectivestartdate:'',
      effectiveenddate:'',
      category:''
    };
    const updatedData = [...this.dataSourcePackageDetails.data, newRow];
    this.dataSourcePackageDetails.data = updatedData;
  }

  selection: PackageDetails[] = [];

  toggleSelection(row: PackageDetails) {
    const index = this.selection.indexOf(row);
    if (index === -1) {
      this.selection.push(row);
    } else {
      this.selection.splice(index, 1);
    }
  }

  isAllSelected() {
    return this.selection.length === this.dataSourcePackageDetails.data.length;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection = [];
    } else {
      this.selection = [...this.dataSourcePackageDetails.data];
    }
  }

  deleteSelectedRows() {
    this.dataSourcePackageDetails.data = this.dataSourcePackageDetails.data.filter(row => !this.selection.includes(row));
    this.selection = [];
  }
}
