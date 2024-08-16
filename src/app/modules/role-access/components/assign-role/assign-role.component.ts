import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface GasItems {
  nonmenber: string;
  member: string;
  teacher: string;
  regcoordinator: string;
  balviharcoordinators: string;
  managementteam: string;
  systemadmin: string;
  membershipteam: string;
  accounting: string;
  eventregcoordinator: string;
  eventcoordinator: string;
  arpanamadmin: string;
  arpanamcoordinator: string;
  chapter: string;
  programcode: string;
  signupcode: string;
  delete: string;
}

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.scss']
})

export class AssignRoleComponent {
  GasItems: GasItems[] = [
    {nonmenber: '', member: '', teacher: '', regcoordinator: '', balviharcoordinators: '', managementteam: '', systemadmin: '',
      membershipteam: '', accounting: '', eventregcoordinator: '', eventcoordinator: '', arpanamadmin: '', arpanamcoordinator: '', 
      chapter: '', programcode: '', signupcode: '', delete:''
    },

  ];

  displayedColumnsGasItems: string[] = ['nonmenber', 'member', 'teacher', 'regcoordinator', 'balviharcoordinators', 'managementteam', 'systemadmin', 
                                        'membershipteam', 'accounting', 'eventregcoordinator', 'eventcoordinator', 'arpanamadmin', 'arpanamcoordinator', 
                                        'chapter', 'programcode', 'signupcode', 'delete'
  ];

  dataSourceGasItems = new MatTableDataSource<GasItems>(this.GasItems);

  @ViewChild(MatPaginatorModule) paginatormodule: MatPaginatorModule
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSourceGasItems=new MatTableDataSource(this.GasItems);

    this.dataSourceGasItems.paginator = this.paginator;

    this.dataSourceGasItems.sort = this.sort;
  }
}
