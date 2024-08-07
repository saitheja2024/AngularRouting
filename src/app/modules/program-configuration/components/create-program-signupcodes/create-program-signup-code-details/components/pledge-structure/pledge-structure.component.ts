import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface PledgeStructure {
  checkbox: string;
  code: string;
  default: string;
  amount: string;
  sessioncriteria: string;
  effectivefrom: string;
  effectiveto: string;
}

@Component({
  selector: 'app-pledge-structure',
  templateUrl: './pledge-structure.component.html',
  styleUrls: ['./pledge-structure.component.scss']
})

export class PledgeStructureComponent {
  PledgeStructure: PledgeStructure[] = [
    {checkbox: '', code: '', default: '', amount: '', sessioncriteria: '', effectivefrom: '', effectiveto:''}
  ];

  displayedColumnsPledgeStructure: string[] = ['checkbox', 'code', 'default', 'amount', 'sessioncriteria', 'effectivefrom', 'effectiveto'];

  dataSourcePledgeStructure = new MatTableDataSource<PledgeStructure>(this.PledgeStructure);

  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourcePledgeStructure=new MatTableDataSource(this.PledgeStructure);

    this.dataSourcePledgeStructure.paginator = this.paginator;

    this.dataSourcePledgeStructure.sort = this.sort;
  }

  showContentPledgeStructure: boolean = false;

  onCheckboxChangePledgeStructure(event: Event) {
    this.showContentPledgeStructure = (event.target as HTMLInputElement).checked;
  }

  constructor(
    private router:Router,
    ){
    
  }

  back(){
    this.router.navigateByUrl("/program-configuration/create-program/signup-codes/signup-code-details/choice-details")
   }

   next(){
    this.router.navigateByUrl("/program-configuration/create-program/signup-codes/signup-code-details/class-codes")
   }
}
