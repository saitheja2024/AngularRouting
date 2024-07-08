import { Component, ViewChild } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectionFamilyDetailsComponent } from '../selection-family-details/selection-family-details.component';
import { SelectionPaymentdetailsComponent } from '../selection-paymentdetails/selection-paymentdetails.component';
import { RegistratioReviewService } from 'src/app/modules/chinmaya-shared/services/registration-review/registration-review.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/modules/chinmaya-shared/services/alert/alert.service';



@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})

export class SelectionComponent {
  
  paginationConfig={
    pageSize : 10,
    pageIndex : 0,
    pageSizeOptions :[10,30, 50],
    showFirstLastButtons : true,
    length:10
  }
  
  displayedColumns: string[] = ['checkbox','paymentSubmittedDate','familyId','personID','firstName','payment','emailAddress','createdDate'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchCriteria: any;
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);


  constructor(private modalService: NgbModal,
    private regiStrationReviewService:RegistratioReviewService,
    private router:Router,
    private alertService:AlertService
    
  ){
    
  }

  async ngOnInit(){
    this.searchCriteria = this.regiStrationReviewService.getSearchCriteria();
    this.performSearch();
   
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }



  async performSearch(){
    let results  = await this.regiStrationReviewService.fetchRegistrationReviewDetailsBasedOnSearch(this.searchCriteria);
   
   
    this.dataSource = new MatTableDataSource<any>(results.projectSummaryList);
    
    this.paginationConfig.length=results.totalProjectSummary;
   
    this.dataSource._updateChangeSubscription();

  
 

    // this.paginationConfig.length=100
    // this.paginationConfig.pageSize=this.searchResults.size;
    // this.paginationConfig.pageIndex=this.searchResults.page;
    
    
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

 

  async familyid(){
   const modalRef = await this.modalService.open(SelectionFamilyDetailsComponent,{ size: 'lg' });
  }

  async paymentdetails(){
    //const modalRef = await this.modalService.open(SelectionPaymentdetailsComponent,{ size: 'lg' });
   }

  
  onProceedToReviewButtonClick(){
    if(this.selection.selected.length==0){
      this.alertService.showErrorALert("Please select atleast one record to proceed");
      return;
    }
    this.regiStrationReviewService.setSelectedFamilyRecords(this.selection.selected);
    this.router.navigateByUrl("/status-update/status-search-results/review")
    
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
}
