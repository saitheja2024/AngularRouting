import { Component, Inject, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { RegistratioReviewService } from 'src/app/modules/chinmaya-shared/services/registration-review/registration-review.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

export interface PaymentDetails {
  familyid: number;
  invoicedamount: string;
  amountpaid: string;
  invoicenumber: number;
  paymentstatus: string;
  paymentmode: string;
  paymentauthcode: string;
}

@Component({
  selector: 'app-selection-paymentdetails',
  templateUrl: './selection-paymentdetails.component.html',
  styleUrls: ['./selection-paymentdetails.component.scss']
})

export class SelectionPaymentdetailsComponent {
  [x: string]: any;
  readonly dialogRef = inject(MatDialogRef<SelectionPaymentdetailsComponent>);

  PaymentDetails: PaymentDetails[] = [
    {familyid:4367, invoicedamount:'100.00', amountpaid: '100.00', invoicenumber: 2024512402, paymentstatus: 'PRE-AUTH_SUCCESS', paymentmode: 'CC', paymentauthcode: '0KH151'}
  ];

  displayedColumnsPaymentDetails: string[] = ['familyID', 'totalAmountWithOutConvenienceFee', 'amountPaid', 'invoiceNumber', 'paymentStatus', 'paymentMode', 'paymentAuthCode'];

  dataSourcePaymentDetails = new MatTableDataSource<PaymentDetails>(this.PaymentDetails);

  ngAfterViewInit() {
   console.log(this.data);
   this.modalPaymentCall();
    
  }

  constructor(private modalService: NgbModal, @Inject(MAT_DIALOG_DATA) public data:any, private regiStrationReviewService:RegistratioReviewService){
  
  }
  responseData:any;
  async modalPaymentCall(){
    let param={
      "familyId":this.data.familyId,
      "chapterCode":this.data.chapterCode
      }

      let results  = await this.regiStrationReviewService.fetchPaymentDetails(param);
      this.responseData = results.paymentHistoryList.length;
      this.dataSourcePaymentDetails=new MatTableDataSource(results.paymentHistoryList);
      this.dataSourcePaymentDetails.sort = this.sort;
  }

  async closeModal(){
    this.dialogRef.close();
  }
}




