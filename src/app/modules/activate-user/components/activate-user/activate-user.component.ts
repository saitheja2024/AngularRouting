import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserList {
  familyid: number;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  account: string;
}

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
})

export class ActivateUserComponent {
  UserList: UserList[] = [
    {familyid: 3132, firstname: 'Mark', lastname: 'John', email: 'mark@gmail.com', username: 'Mark', account: ''}
  ]

  displayedColumnsUserList: string[] = ['familyid', 'firstname', 'lastname', 'email', 'username', 'account'];

  dataSourceUserList = new MatTableDataSource<UserList>(this.UserList);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngAfterViewInit() {
    this.dataSourceUserList=new MatTableDataSource(this.UserList);

    this.dataSourceUserList.paginator = this.paginator;

    this.dataSourceUserList.sort = this.sort;
  }
}
