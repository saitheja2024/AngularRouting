import { Component, ViewChild } from '@angular/core';
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



@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent {
  displayedColumns: string[] = ['paymentSubmittedDate','familyId','personID','firstName','subClassAssignment','gender','age','primaryPersonId','primaryFirstName','primaryLastName','email','payment','createdDate']
  dataSource = new MatTableDataSource<any>();

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

   
    this.dataSource = new MatTableDataSource<any>(results);
    this.dataSource._updateChangeSubscription();
  }



  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
  }

  

  async familyid(){
   const modalRef = await this.modalService.open(SelectionFamilyDetailsComponent,{ size: 'lg' });
  }

  async paymentdetails(){
    const modalRef = await this.modalService.open(SelectionPaymentdetailsComponent,{ size: 'lg' });
   }
   

   onBackButtonClick(){
    this.router.navigateByUrl("/sub-class-assignment/subclass-assign-search-results/review");
  }

  onUpdateCompleteButtonClick(){
    this.router.navigateByUrl("/sub-class-assignment/subclass-assign-search");
  }
}
