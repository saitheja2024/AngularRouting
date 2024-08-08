import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PledgeStructure {
  code: string;
  default: string;
  amount: string;
  session: string;
  effectivefrom: string;
  effectiveend: string;
}

@Component({
  selector: 'app-review-config-pledge-structure',
  templateUrl: './review-config-pledge-structure.component.html',
  styleUrls: ['./review-config-pledge-structure.component.scss']
})

export class ReviewConfigPledgeStructureComponent {
  PledgeStructure: PledgeStructure[] = [
    {code: '1ST_REGISTRATION', default: 'Yes', amount: '34.00', session:'Sunday 11:00 AM to 11:50 AM', effectivefrom: '08/08/2024', effectiveend: '08/10/2024'}
  ];

  displayedColumnsPledgeStructure: string[] = ['code', 'default', 'amount', 'session', 'effectivefrom', 'effectiveend'];

  dataSourcePledgeStructure = new MatTableDataSource<PledgeStructure>(this.PledgeStructure);

  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourcePledgeStructure=new MatTableDataSource(this.PledgeStructure);

    this.dataSourcePledgeStructure.paginator = this.paginator;

    this.dataSourcePledgeStructure.sort = this.sort;
  }
}
