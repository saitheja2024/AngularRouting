import { Component, ViewChild, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectionFamilyDetailsComponent } from '../selection-family-details/selection-family-details.component';
import { SelectionPaymentdetailsComponent } from '../selection-paymentdetails/selection-paymentdetails.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { RegistratioReviewService } from 'src/app/modules/chinmaya-shared/services/registration-review/registration-review.service';
import { AlertService } from 'src/app/modules/chinmaya-shared/services/alert/alert.service';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

export interface SubclassSelection {
  checkbox:string;
  paymentdate: string;
  familyid: number;
  personid: number;
  firstname: string;
  familyname: string;
  gender: string;
  age: string;
  schoolgrade: string;
  primarypersonid: number;
  primaryfirstname: string;
  primarylastname: string;
  email: string;
  payment: string;
  datecreated: string;
}

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})

export class SelectionComponent {
  readonly dialog = inject(MatDialog);

  displayedColumnsSelection: string[] = ['checkbox','familyId','personID','firstName','lastName','gender','schoolGradeDescription','paymentSubmittedDate','sessionAssignment','classAssignment','subClassAssignment','createdDate']
  paginationConfig={
    pageSize : 10,
    pageIndex : 0,
    pageSizeOptions :[10,30, 50, 150, 250, 300],
    showFirstLastButtons : true,
    length:10
  }
  
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchCriteria: any;
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);
  totalRecCount:any;
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
    this.totalRecCount = results.totalProjectSummary;
    this.dataSource = new MatTableDataSource<any>(results.projectSummaryList);
    
    this.paginationConfig.length=results.totalProjectSummary;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

 
  async familyid(ele:any){
    //const modalRef = await this.modalService.open(SelectionFamilyDetailsComponent,{ size: 'lg' });
     let dialogRef = this.dialog.open(SelectionFamilyDetailsComponent, {
       data: ele,
     });
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
    this.router.navigateByUrl("/sub-class-assignment/subclass-assign-search-results/review")
    
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

   getTimeFormat(timeVal:any){
    if(timeVal!=null && timeVal!=''){
      let tmp:any = new DatePipe('en-Us').transform(timeVal, 'HH:mm:ss a');
      //let TimeData = tmp.slice(-8);
      return tmp;
    }
  }
}
