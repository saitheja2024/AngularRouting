import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
  searchResults: any;

  paginationConfig={
  pageSize : 5,
  pageIndex : 0,
  pageSizeOptions :[5, 10, 25],
  showFirstLastButtons : true,
  length:10
  }

  


  displayColumns: string[] = [
  "familyId",
  "primaryFirstName",
  "primaryLastName",
  "paymentStatus",
  "registrationStatus",
  "paymentSubmittedDate",
  "choiceCode",
  "choicePreference"
  ];
  dataSource:any = new MatTableDataSource<any>(); 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    //this.dataSource.paginator=this.paginator  
  }


  constructor(
    private registrationService:RegistrationService,
    private router:Router){}

  ngOnInit(){
    this.searchCriteria = this.registrationService.getSearchCriteria();
    this.performSearch();
  }

  async performSearch(){
    this.searchResults = await this.registrationService.fetchRegistrationDetailsBasedOnSearch(this.searchCriteria)
    this.dataSource.data=this.searchResults.projectSummaryList.slice(); 

    this.paginationConfig.length=this.searchResults.totalProjectSummary
    this.paginationConfig.pageSize=this.searchResults.size;
    
    this.dataSource.paginator =this.paginator;
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

  handlePageEvent(ev:any){
   console.log(JSON.stringify(ev,null,4));
  }


}
