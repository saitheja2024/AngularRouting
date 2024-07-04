import { Component, ViewChild } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectionFamilyDetailsComponent } from '../selection-family-details/selection-family-details.component';
import { SelectionPaymentdetailsComponent } from '../selection-paymentdetails/selection-paymentdetails.component';
import { SelectionModel } from '@angular/cdk/collections';
import { RegistratioReviewService } from 'src/app/modules/chinmaya-shared/services/registration-review/registration-review.service';
import { Router } from '@angular/router';

export interface StatusReview {
  checkbox:string;
  paymentdate: string;
  familyid: number;
  personid: number;
  firstname: string;
  lastname: string;
  email: string;
  sessionassignment: string;
  datecreated: string;
  reconcile: string;
  payment: string;
  actions: string;
}

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})

export class ReviewComponent {
  displayedColumns: string[] = ['checkbox','paymentSubmittedDate','familyId','personID','firstName','payment','emailAddress','reconcile','createdDate'];

  dataSource = new MatTableDataSource<any>();
  searchCriteria: any;
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);

  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  registrationStatusList: any;
  registrationStatus:any
  sessionChoice: any;
  sessionChoiceList: any[];

  constructor(private modalService: NgbModal,
    private regiStrationReviewService:RegistratioReviewService,
    private router:Router,

  ){
    
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  async ngOnInit(){
    this.fetchRegistrationStatusList();
    await this.fetchSessionChoice();
    let results  =  this.regiStrationReviewService.getSelectedFamilyRecords();
   
    this.dataSource = new MatTableDataSource<any>(results);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource._updateChangeSubscription();
  }

  async fetchRegistrationStatusList() {
    this.registrationStatusList=await this.regiStrationReviewService.fetchRegistrationStatusList()
  }


  async fetchSessionChoice(){
    let params = {
      "programCode":this.regiStrationReviewService.getSelectedFamilyRecords()[0].programCode
    }
    this.sessionChoiceList = await this.regiStrationReviewService.fetchSessionChoice(params);
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
    const modalRef = await this.modalService.open(SelectionPaymentdetailsComponent,{ size: 'lg' });
   }

   async onUpdateButtonClick(){
    let param ={
      saveReviewRequestList:this.selection.selected,
      registrationStatus: this.registrationStatus,
      sessionAssignment:this.sessionChoice
    }

    let response = await this.regiStrationReviewService.saveRegistrationReview(param);
    this.regiStrationReviewService.setUpdatedReviewedRecords(response);
    this.router.navigateByUrl("/status-update/status-search-results/complete");

   }



}
