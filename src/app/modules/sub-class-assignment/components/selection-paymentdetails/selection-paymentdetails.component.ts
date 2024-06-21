import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  PaymentDetails: PaymentDetails[] = [
    {familyid:4367, invoicedamount:'100.00', amountpaid: '100.00', invoicenumber: 2024512402, paymentstatus: 'PRE-AUTH_SUCCESS', paymentmode: 'CC', paymentauthcode: '0KH151'}
  ];

  displayedColumnsPaymentDetails: string[] = ['familyid', 'invoicedamount', 'amountpaid', 'invoicenumber', 'paymentstatus', 'paymentmode', 'paymentauthcode'];

  dataSourcePaymentDetails = new MatTableDataSource<PaymentDetails>(this.PaymentDetails);

	  ngAfterViewInit() {
		this.dataSourcePaymentDetails=new MatTableDataSource(this.PaymentDetails);

		this.dataSourcePaymentDetails.sort = this.sort;
	  }

	  constructor(private modalService: NgbModal){
	  
	  }

	  async closeModal(){
		const modalRef = await this.modalService.dismissAll();
	  }
}