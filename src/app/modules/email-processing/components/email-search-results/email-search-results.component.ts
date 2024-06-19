import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
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
    pageSizeOptions :[10,30, 50,150,200,300,350,450],
    showFirstLastButtons : true,
    length:10
    }
    displayedColumns: string[] = ['select', 'familyId', 'primaryName', 'registrationStatus', 'paymentStatus','choiceDescription', 'TemplateID','email'];

    dataSource:any = new MatTableDataSource<any>(); 
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator:MatPaginator
    selection = new SelectionModel<any>(true, []);
    totalRecFooter:any;

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
  
  totalRecCount:any='';
  async performSearch(){
    let results:any  = await this.emailProcService.RegistrationDetailsBasedOnSearch(this.searchCriteria);
    this.totalRecCount = results;
    this.totalRecFooter = results;
    // this.paginationConfig.length = results.totalProjectSummary;
     //this.searchResults.push(...results.projectSummaryList);
    this.dataSource = new MatTableDataSource<any>(results.projectSummaryList);
    this.dataSource.paginator= this.paginator;
    this.dataSource.sort = this.sort;
    this.sort.sort(({ id: 'primaryName', start: 'asc'}) as MatSortable);
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
 async previewTemplate(data:any){
  //this.popupTemplateData=data;
  let param:any = {
    familyId: data.familyId,
    programCode: data.programCode,
    chapterId:data.chapterCode,
    registrationStatus: data.registrationStatus,
    paymentStatus:data.paymentStatus
  }
  this.showpopupFlag=true;
  this.popupTemplateData= await this.emailProcService.fetchviewTemplate(param);
 }
 
 closeTemplatePopup(){
  this.showpopupFlag=false;
 }

 isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
}
 
sendEmail(){

  let param:any = {
    sendEmailRequestList: []
  };
  this.selection.selected.forEach(item => param.sendEmailRequestList.push({
    familyId: item.familyId,
    programCode: item.programCode,
    chapterId:item.chapterCode,
    registrationStatus: item.registrationStatus,
    paymentStatus:item.paymentStatus
  }));
  

  
  this.popupTemplateData= this.emailProcService.sendEmailTemplate(param);

}
activeOrder:any={};
sortItems(letter: string, index:any) {
  this.activeOrder={[index]:true};
  this.dataSource.data = this.totalRecCount.projectSummaryList.filter((item:any) => item.primaryName.startsWith(letter));
  this.totalRecFooter = {totalProjectSummary:this.dataSource.data.length};
  this.dataSource.sort = this.sort;
}

refreshRec(){
  this.activeOrder={};
  this.dataSource.data = this.totalRecCount.projectSummaryList;
  this.totalRecFooter = {totalProjectSummary:this.totalRecCount.totalProjectSummary};
  this.dataSource.sort = this.sort;
}


}
