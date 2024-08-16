import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface GasItems {
  nonmenber: string;
  member: string;
  teacher: string;
  progregcoordinator: string;
  coreteam: string;
  leadershipteam: string;
  systemadmin: string;
  viewprogramconfig: string;
  accounting: string;
  addeditevent: string;
  veiweventreport: string;
  arpanamadmin: string;
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
    {nonmenber: '', member: '', teacher: '', progregcoordinator: '', coreteam: '', leadershipteam: '', systemadmin: '',
      viewprogramconfig: '', accounting: '', addeditevent: '', veiweventreport: '', arpanamadmin: '', chapter: '', programcode: '',
      signupcode: '', delete:''
    },

  ];

  displayedColumnsGasItems: string[] = ['nonmenber', 'member', 'teacher', 'progregcoordinator', 'coreteam', 'leadershipteam', 'systemadmin', 
                                        'viewprogramconfig', 'accounting', 'addeditevent', 'veiweventreport', 'arpanamadmin', 'chapter', 'programcode', 
                                        'signupcode', 'delete'
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
