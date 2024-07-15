import { Component, ViewChild, inject } from '@angular/core';
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
import { AlertService } from 'src/app/modules/chinmaya-shared/services/alert/alert.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

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
  displayedColumns: string[] = ['checkbox','paymentSubmittedDate','familyId','personID','firstName','emailAddress','createdDate'];
  readonly dialog = inject(MatDialog);
  dataSource = new MatTableDataSource<any>();
  searchCriteria: any;
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);
  totalRecCount:any;
  totalRecordList:any;
  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  registrationStatusList: any;
  registrationStatus:any="";
  sessionChoice: any="";
  sessionChoiceList: any[];

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
    this.fetchRegistrationStatusList();
    await this.fetchSessionChoice();
    let results  =  this.regiStrationReviewService.getSelectedFamilyRecords();
    this.totalRecCount = results.length;
    this.totalRecordList = results;
    this.dataSource = new MatTableDataSource<any>(results);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource._updateChangeSubscription();
  }

  async fetchRegistrationStatusList() {
    this.registrationStatusList=await this.regiStrationReviewService.fetchRegistrationStatusList()
  }

  onBackButtonClick(){
    this.router.navigateByUrl("/status-update/status-search-results/selection");
  }


  async fetchSessionChoice(){
    let params={
      "programCode": this.regiStrationReviewService.getSelectedFamilyRecords()[0].programCode,
      "chapterCode": this.regiStrationReviewService.getSelectedFamilyRecords()[0].chapterCode,
      "signupCode":this.regiStrationReviewService.getSelectedFamilyRecords()[0].signupCode,
    }
    // let params = {
    //   "programCode":this.regiStrationReviewService.getSelectedFamilyRecords()[0].programCode
    // }
    this.sessionChoiceList = await this.regiStrationReviewService.fetchSessionChoicesDropdown(params);
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

  async paymentdetails(ele:any){
    //const modalRef = await this.modalService.open(SelectionPaymentdetailsComponent,{ size: 'lg' });
    let dialogRef = this.dialog.open(SelectionPaymentdetailsComponent, {
      data: ele,
    });
   }

   selectionRecAssignment(arr:any){
    return arr.filter((item:any)=>{
      item.sessionAssignment = this.sessionChoice;
    })
   }


   async onUpdateButtonClick(){

    if(this.selection.selected.length==0){
      this.alertService.showErrorALert("Please select atleast one record to proceed");
      return;
    }
    this.selectionRecAssignment(this.selection.selected);

    let param ={
      saveReviewRequestList:this.selection.selected,
      registrationStatus: this.registrationStatus,
      sessionAssignment:this.sessionChoice
    }

   if(this.registrationStatus!='' && this.registrationStatus!=null){
    let response = await this.regiStrationReviewService.saveRegistrationReview(param);
    this.regiStrationReviewService.setUpdatedReviewedRecords(response);
    this.router.navigateByUrl("/status-update/status-search-results/complete");
   }else{
    this.alertService.showErrorALert("Please select Regstration Status.");
    return;

   }

   }

   // Function to remove selected objects by id
removeSelectedObjects(original:any, selected:any) {
  return original.filter((object:any) => selected.personID != object.personID);
};

   removeRecord(){
    let newArray='';
    for(var i=0; i<this.selection.selected.length; i++){
      newArray = this.removeSelectedObjects(this.totalRecordList, this.selection.selected[i]);
      this.totalRecordList = newArray;
    }
    this.selection.clear();
    this.totalRecCount = this.totalRecordList.length;
    this.dataSource = new MatTableDataSource<any>(this.totalRecordList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource._updateChangeSubscription();
   }

   waitListFlagCheck:any={};
  waitlistFlag(eve:any, index:any){
   if(eve.waitListedFlag==1){
   this.waitListFlagCheck={
     [index]:true
   }
 }else{
   this.waitListFlagCheck={
     [index]:false
   }
   }
  }
  
  waitlistFlagRemove(){
    this.waitListFlagCheck={};
  }

  getTimeFormat(timeVal:any){
    if(timeVal!=null && timeVal!=''){
      let tmp:any = new DatePipe('en-Us').transform(timeVal, 'MM/dd/yyyy HH:mm a');
      let TimeData = tmp.slice(-8) +' '+ tmp?.slice(-2)
      return TimeData;
    }
  }
  
}
