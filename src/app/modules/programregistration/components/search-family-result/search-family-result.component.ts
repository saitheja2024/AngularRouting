import { Component, Input, ViewChild } from '@angular/core';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/modules/chinmaya-shared/services/alert/alert.service';
import { ErrorHandlerService } from 'src/app/modules/chinmaya-shared/services/errors/error-handler.service';
import { FamilyService } from 'src/app/modules/chinmaya-shared/services/family/family.service';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';

@Component({
  selector: 'app-search-family-result',
  templateUrl: './search-family-result.component.html',
  styleUrls: ['./search-family-result.component.scss']
})
export class SearchFamilyResultComponent {


  @Input() familyList: any;
  totalRecCount:any;
  totalRecFooter:any;
  constructor(
    private familyService: FamilyService,
    private router: Router,
    private alertService:AlertService,
    private store:StoreService
   
  ) {}

  displayColumns: string[] = ["familyId", "firstName", "lastName", "homePhone", "emailAddress","register"]
  dataSource:any = new MatTableDataSource<any>(); 
  
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes:any){
    if(changes && changes["familyList"].currentValue){
      this.familyList=changes["familyList"].currentValue
      this.showFamilyList(this.familyList);
    }
  }

  async ngOnInit() {
   // this.familyList = await this.familyService.getFamilyList();
   this.familyList = '';
    //const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    //this.dataToDisplay = [...this.dataToDisplay, ELEMENT_DATA[randomElementIndex]];
    //this.dataSource.setData(this.dataToDisplay);
    this.dataSource.data=[];
  }

  showFamilyList(familyList: any) {
    this.familyList = familyList;
    this.totalRecCount = familyList;
    this.dataSource.data=this.familyList.slice(); 
    this.dataSource.sort = this.sort;
    this.sort.sort(({ id: 'firstName', start: 'desc'}) as MatSortable);
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


onRegisterButtonClick(familyDetails:any){
  this.familyService.setSelectedFamily(familyDetails);
  let selectedChapterCode = this.store.getValue(KEYS.chapter);
 
  this.router.navigateByUrl("programregistration/program-dashboard")
}

}
