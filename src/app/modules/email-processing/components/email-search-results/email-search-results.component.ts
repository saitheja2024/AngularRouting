import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {SelectionModel} from '@angular/cdk/collections';
import { EmailProcessingServices } from 'src/app/modules/chinmaya-shared/services/email-processing/emailprocessing.service';
@Component({
  selector: 'app-email-search-results',
  templateUrl: './email-search-results.component.html',
  styleUrls: ['./email-search-results.component.scss']
})
export class EmailSearchResultsComponent {

  searchCriteria:any;
  
  paginationConfig={
    pageSize : 10,
    pageIndex : 0,
    pageSizeOptions :[10, 20,30],
    showFirstLastButtons : true,
    length:10
    }

  displayColumns: string[] = [
    "familyId",
    "primaryPersonName",
    "registrationStatus",
    "paymentStatus",
    "sessionChoice1/AssignedSession",
    "emailSentDate",
    "templateId&Preview",
    ];
    dataSource:any = new MatTableDataSource<any>(); 
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator:MatPaginator
    selection = new SelectionModel<any>(true, []);

    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
     
    }
  
  constructor(
    private emailProcService:EmailProcessingServices,
    private router:Router){}
    
  ngOnInit(){
    this.searchCriteria = this.emailProcService.getEmailSearchCriteria();
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
  
  async performSearch(){
    let results:any  = await this.emailProcService.RegistrationDetailsBasedOnSearch(this.searchCriteria)
     //this.searchResults.push(...results.projectSummaryList);
    this.dataSource = new MatTableDataSource<any>(results.projectSummaryList);
    this.paginator.length=results.totalProjectSummary
    this.dataSource._updateChangeSubscription();
  }

  onFilterClick(filterName:any,filter:any){
    this.searchCriteria.requestRegistrationProcessingSearch[filterName] = this.searchCriteria.requestRegistrationProcessingSearch[filterName].filter((item:any)=>item!=filter)

 
  this.performSearch();
}

showRegistrationDetails(selectedFamily:any){
  this.emailProcService.setSelectedFamily(selectedFamily);
 // this.router.navigateByUrl("/registration-processing/family-registration-details")
}


handlePageEvent(event:any){
  console.log(JSON.stringify(event,null,4));
  let pageIndex = event.pageIndex;
  let pageSize = event.pageSize;

  let previousIndex = event.previousPageIndex;

  let previousSize = pageSize * pageIndex;
  this.searchCriteria.requestPageModel.page=pageIndex;
  this.searchCriteria.requestPageModel.size=pageSize;
  this.performSearch();
 }
 
 popupTemplateData:any;
showpopupFlag:boolean=false;
 previewTemplate(data:any){
  this.popupTemplateData=data;
  this.showpopupFlag=true;
 }
 
 closeTemplatePopup(){
  this.showpopupFlag=false;
 }
 

}
