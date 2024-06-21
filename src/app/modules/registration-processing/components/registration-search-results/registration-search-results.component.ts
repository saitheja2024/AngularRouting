import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/modules/chinmaya-shared/services/registration-processing/registration.service';

@Component({
  selector: 'app-registration-search-results',
  templateUrl: './registration-search-results.component.html',
  styleUrls: ['./registration-search-results.component.scss']
})
export class RegistrationSearchResultsComponent {
  searchCriteria: any;
  searchResults: any=[];

  paginationConfig={
  pageSize : 10,
  pageIndex : 0,
  pageSizeOptions :[10,30, 50,150,200,300,350,450],
  showFirstLastButtons : true,
  }

  


  displayColumns: string[] = [
  "familyId",
  "primaryName",
  "paymentStatus",
  "registrationStatus",
  "paymentSubmittedDate",
  "choiceDescription",
  "choicePreference",
  'email'
  ];
  dataSource:any = new MatTableDataSource<any>(); 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  totalRecCount:any;
  totalRecFooter:any;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
   
  }


  constructor(
    private registrationService:RegistrationService,
    private router:Router){}

  ngOnInit(){
    this.searchCriteria = this.registrationService.getSearchCriteria();
    this.performSearch();
  }

  async performSearch(){
    let results  = await this.registrationService.fetchRegistrationDetailsBasedOnSearch(this.searchCriteria);
    this.totalRecCount =results;
    this.totalRecFooter = results;
    this.totalRecFooter.totalPages = this.totalRecCount.totalProjectSummary;
    //this.searchResults.push(...results.projectSummaryList);
    this.dataSource = new MatTableDataSource<any>(results.projectSummaryList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sort.sort(({ id: 'primaryName', start: 'asc'}) as MatSortable);
    //this.dataSource.paginator.length = this.totalRecCount.totalProjectSummary;
    this.dataSource._updateChangeSubscription();

  
 

    //this.paginationConfig.length=100
    //this.paginationConfig.pageSize=this.searchResults.size;
    //this.paginationConfig.pageIndex=this.searchResults.page;
    
    
  }

  onFilterClick(filterName:any,filter:any){
      this.searchCriteria.requestRegistrationProcessingSearch[filterName] = this.searchCriteria.requestRegistrationProcessingSearch[filterName].filter((item:any)=>item!=filter)

   
     this.performSearch();
  }



   formatColumnName(key: string): string {
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase words
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Handle consecutive uppercase letters
      .replace(/\b\w/g, (match) => match.toUpperCase()); // Capitalize the first letter of each word
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  showRegistrationDetails(selectedFamily:any){
    this.registrationService.setSelectedFamily(selectedFamily);
    this.router.navigateByUrl("/registration-processing/family-registration-details")
  }

  handlePageEvent(event:any){
   console.log(JSON.stringify(event,null,4));
   let pageIndex = event.pageIndex;
   let pageSize = event.pageSize;

   let previousIndex = event.previousPageIndex;

   let previousSize = pageSize * pageIndex;
   this.searchCriteria.requestPageModel.page=pageIndex;
   //this.searchCriteria.requestPageModel.size=pageSize;
   let pageCount = (event.length/pageSize);
   let lastPage = Math.trunc(pageCount);
   if(lastPage==pageIndex){
    this.searchCriteria.requestPageModel.size= this.searchCriteria.requestPageModel.size+100;
    if(this.searchCriteria.requestPageModel.size<this.totalRecCount.totalProjectSummary){
      this.performSearch();
    }
   }
  
  }

  activeOrder:any={};
sortItems(letter: string, index:any) {
  this.activeOrder={[index]:true};
  this.dataSource.data = this.totalRecCount.projectSummaryList.filter((item:any) => (item.primaryLastName).toLowerCase().startsWith((letter).toLowerCase()));
  this.totalRecFooter = {totalProjectSummary:this.totalRecCount.totalProjectSummary};
  this.dataSource.sort = this.sort;
}

refreshRec(){
  this.activeOrder={};
  this.dataSource.data = this.totalRecCount.projectSummaryList;
  this.totalRecFooter = {totalProjectSummary:this.totalRecCount.totalProjectSummary};
  this.dataSource.sort = this.sort;
}

}
