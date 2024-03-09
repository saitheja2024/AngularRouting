import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FamilyService } from 'src/app/modules/chinmaya-shared/services/family/family.service';

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.scss']
})
export class FamilyListomponent {

  familyList: any;

  constructor(
    private familyService: FamilyService,
    private router: Router
  ) {

  }


  

  displayColumns: string[] = ["familyId", "personID", "firstName", "middleName", "lastName", "gender", "dateOfBirth", "personType", "homePhone", "emailAddress"]
  dataSource:any = new MatTableDataSource<any>(); 
  
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  async ngOnInit() {
    this.familyList = await this.familyService.getFamilyList();
    //const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    //this.dataToDisplay = [...this.dataToDisplay, ELEMENT_DATA[randomElementIndex]];
    //this.dataSource.setData(this.dataToDisplay);
    console.log(this.familyList);
    this.dataSource.data=this.familyList.slice(); 
    console.log(this.dataSource)
  }

  showFamilyList(familyList: any) {
    this.familyList = familyList;
  }

  showFamilyMemberList(family: any) {
    this.familyService.setSelectedFamily(family);
    this.router.navigateByUrl("/family/familyMemberList/true");
  }

}