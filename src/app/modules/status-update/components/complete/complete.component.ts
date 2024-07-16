import { Component, ViewChild, inject } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectionFamilyDetailsComponent } from '../selection-family-details/selection-family-details.component';
import { SelectionPaymentdetailsComponent } from '../selection-paymentdetails/selection-paymentdetails.component';
import { RegistratioReviewService } from 'src/app/modules/chinmaya-shared/services/registration-review/registration-review.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})

export class CompleteComponent {
  
  displayedColumnsComplete: string[] = ['paymentSubmittedDate','familyId', 'personID', 'firstName', 'lastName', 'email', 'sessionDesription', 'dateCreated'];
  readonly dialog = inject(MatDialog);
  dataSource = new MatTableDataSource<any>();
  totalRecCount:any;
  notfyFlag:boolean=true;
  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private modalService: NgbModal,
    private regiStrationReviewService:RegistratioReviewService,
    private router:Router,

  ){
    
  }

  async ngOnInit(){
    let results  =  this.regiStrationReviewService.getUpdatedReviewedRecords();
    setTimeout(()=> {this.notfyFlag=false;},800);
    this.totalRecCount = results.length;
    if(this.totalRecCount==0){this.notfyFlag=false; }
    this.dataSource = new MatTableDataSource<any>(results);
    this.dataSource._updateChangeSubscription();
  }

  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
  }

  async familyid(){
   //const modalRef = await this.modalService.open(SelectionFamilyDetailsComponent,{ size: 'lg' });
  }

  async paymentdetails(ele:any){
    //const modalRef = await this.modalService.open(SelectionPaymentdetailsComponent,{ size: 'lg' });
    let dialogRef = this.dialog.open(SelectionPaymentdetailsComponent, {
      data: ele,
    });
   }
   
   onBackButtonClick(){
    this.router.navigateByUrl("/status-update/status-search-results/review");
  }

  onUpdateCompleteButtonClick(){
    this.router.navigateByUrl("/status-update/status-search");
  }


  // getTimeFormat(timeVal:any){
  //   if(timeVal!=null && timeVal!=''){
  //     let tmp:any = new DatePipe('en-Us').transform(timeVal, 'MM/dd/yyyy HH:mm a');
  //     let TimeData = tmp.slice(-8) +' '+ tmp?.slice(-2)
  //     return TimeData;
  //   }
  // }
}
