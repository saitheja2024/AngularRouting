import { Component, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})

export class ReviewComponent {
  displayedColumnsSelection: string[] = ['checkbox','paymentSubmittedDate','familyId','personID','firstName','gender','age','primaryPersonId','primaryFirstName','primaryLastName','emailAddress','createdDate','sessionAssignment','schoolGradeDescription','classAssignment']

  dataSource = new MatTableDataSource<any>();
  searchCriteria: any;
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);
  totalRecordList:any;
  totalRecCount:any;
  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  SubClassAssignList: any;
  subClass:any=""

  constructor(private modalService: NgbModal,
    private regiStrationReviewService:RegistratioReviewService,
    private router:Router,
    private alertService:AlertService

  ){
    
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  async ngOnInit(){
    this.searchCriteria = this.regiStrationReviewService.getSearchCriteria();

    await this.fetchSubClassAssignList();
    let results  =  this.regiStrationReviewService.getSelectedFamilyRecords();
    console.log(results);
    this.totalRecordList=results;
    this.totalRecCount=results.length;
    this.dataSource = new MatTableDataSource<any>(results);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource._updateChangeSubscription();
  }

  onBackButtonClick(){
    this.router.navigateByUrl("/sub-class-assignment/subclass-assign-search-results/selection");
  }

  async fetchSubClassAssignList(){
    let params = {
      "programCode":this.regiStrationReviewService.getSelectedFamilyRecords()[0].programCode,
      signupCode:this.searchCriteria.requestRegistrationProcessingSearch.signupCode
    }
    this.SubClassAssignList = await this.regiStrationReviewService.fetchSubClassDetails(params);
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
   //const modalRef = await this.modalService.open(SelectionFamilyDetailsComponent,{ size: 'lg' });
  }

  async paymentdetails(){
    //const modalRef = await this.modalService.open(SelectionPaymentdetailsComponent,{ size: 'lg' });
   }

   async onUpdateButtonClick(){

    if(this.selection.selected.length==0){
      this.alertService.showErrorALert("Please select atleast one record to proceed");
      return;
    }
    let param ={
      saveReviewRequestList:this.selection.selected,
      //registrationStatus: this.registrationStatus,
      //sessionAssignment:this.sessionChoice
      subClassAssignment:this.subClass
    }

    let response = await this.regiStrationReviewService.saveRegistrationReview(param);
    this.regiStrationReviewService.setUpdatedReviewedRecords(response);
    this.router.navigateByUrl("/sub-class-assignment/subclass-assign-search-results/complete");

   }

   removeRecord(){

    for(var i=0; i<this.selection.selected.length; i++){
      this.totalRecordList.filter((item:any, index:any)=>{
        if(item.personID == this.selection.selected[i].personID){
          this.totalRecordList.splice(index, 1);
        }
       });
    }
    
    this.dataSource = new MatTableDataSource<any>(this.totalRecordList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource._updateChangeSubscription();
   }


}