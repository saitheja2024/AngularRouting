import { Component, ViewChild } from '@angular/core';
import { MatSort, MatSortable } from '@angular/material/sort';
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
  totalRecCount:any;
  totalRecFooter:any;
  constructor(
    private familyService: FamilyService,
    private router: Router
  ) {}

  displayColumns: string[] = ["familyId", "personID", "firstName", "middleName", "lastName", "gender", "personType", "homePhone", "emailAddress"]
  dataSource:any = new MatTableDataSource<any>(); 
  paginationConfig={
    pageSize : 10,
    pageIndex : 0,
    pageSizeOptions :[10,30, 50,150,200,300,350,450],
    showFirstLastButtons : true,
    length:10
  }

  
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  async ngOnInit() {
    this.showFamilyList("");
  }

  async showFamilyList(familyList: any) {
    let param=this.familyService.getSearchCriteria();
    if(!param){
      return;
    }
    this.familyList = await this.familyService.searchFamilies(param);
    this.totalRecCount = this.familyList.projectSummaryList;
    this.dataSource = new MatTableDataSource<any>(this.familyList.projectSummaryList.slice());
    this.dataSource.sort = this.sort;
    this.paginationConfig.length=this.familyList.totalProjectSummary;
    this.dataSource._updateChangeSubscription();
   
    // this.sort.sort(({ id: 'firstName', start: 'desc'}) as MatSortable);
  }

  showFamilyMemberList(family: any) {
    this.familyService.setSelectedFamily(family);
    this.router.navigateByUrl("/family/familyMemberList/true");
  }

  activeOrder:any={};
sortItems(letter: string, index:any) {
  this.activeOrder={[index]:true};
  this.dataSource.data = this.totalRecCount.filter((item:any) => (item.lastName).toLowerCase().startsWith((letter).toLowerCase()));
  this.totalRecFooter = this.dataSource.data.length;
  this.dataSource.sort = this.sort;
}

async handlePageEvent(event:any){
  let pageIndex = event.pageIndex;
  let pageSize = event.pageSize;  
  let previousIndex = event.previousPageIndex;
  let previousSize = pageSize * pageIndex;
  let searchCriteria = this.familyService.getSearchCriteria();
  searchCriteria.requestPageModel.page=pageIndex;
  searchCriteria.requestPageModel.size=pageSize;
  let familyList = await this.familyService.searchFamilies(searchCriteria);
  this.showFamilyList(familyList);
 
 }

}