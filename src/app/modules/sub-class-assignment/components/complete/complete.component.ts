import { Component, ViewChild, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectionFamilyDetailsComponent } from '../selection-family-details/selection-family-details.component';
import { SelectionPaymentdetailsComponent } from '../selection-paymentdetails/selection-paymentdetails.component';
import { Router } from '@angular/router';
import { RegistratioReviewService } from 'src/app/modules/chinmaya-shared/services/registration-review/registration-review.service';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent {
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['familyId','personID','firstName','lastName','gender','schoolGradeDescription','paymentSubmittedDate','sessionAssignment','classAssignment','subClassAssignment','dateCreated']
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
    console.log(results);
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

  async familyid(ele:any){
    //const modalRef = await this.modalService.open(SelectionFamilyDetailsComponent,{ size: 'lg' });
     let dialogRef = this.dialog.open(SelectionFamilyDetailsComponent, {
       data: ele,
     });
   }

  async paymentdetails(){
    //const modalRef = await this.modalService.open(SelectionPaymentdetailsComponent,{ size: 'lg' });
   }
   

   onBackButtonClick(){
    this.router.navigateByUrl("/sub-class-assignment/subclass-assign-search-results/review");
  }

  onUpdateCompleteButtonClick(){
    this.router.navigateByUrl("/sub-class-assignment/subclass-assign-search");
  }

  getTimeFormat(timeVal:any){
    if(timeVal!=null && timeVal!=''){
      let tmp:any = new DatePipe('en-Us').transform(timeVal, 'HH:mm:ss a');
      //let TimeData = tmp.slice(-8);
      return tmp;
    }
  }
 
}
