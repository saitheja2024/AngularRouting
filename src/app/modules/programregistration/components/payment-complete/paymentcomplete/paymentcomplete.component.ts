import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ProgramService } from 'src/app/modules/chinmaya-shared/services/program/program.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-paymentcomplete',
  templateUrl: './paymentcomplete.component.html',
  styleUrls: ['./paymentcomplete.component.scss']
})
export class PaymentcompleteComponent {
  @Input() paymentResponse:any;
  @Output() back=new EventEmitter<string>();
  @Output() saveAndNext=new EventEmitter<string>();
  loggedInUser:any;
  currentDate:any;
  Signature:any='';
  currentUserData=  JSON.parse(localStorage.getItem('CurrentUser') || '');
  programCode = JSON.parse(localStorage.getItem('programcode') || '');
  timeDisplay:any;
  chapterCode:any;
  familyId:any;
  personID:any;
 constructor(private programService: ProgramService, private router: Router){
 
 }

 async ngOnInit() {
  sessionStorage.removeItem('fetchupdateResponse');
  this.currentUserData=  JSON.parse(localStorage.getItem('CurrentUser') || '');
  this.chapterCode = this.currentUserData.chapter;
  this.familyId= this.currentUserData.familyID;
  this.personID = this.currentUserData.personID;

   this.paymentInfoListDetails();
}

paymentListDetailsList:any;
TotalAmtData:any;
paymentCompleteTab:boolean=false;
annualPledgeFlag:any;
 paymentInfoListDetails(){
  let body ={
    familyId: this.familyId,
    programCode: this.programCode,
    chapterCode: this.chapterCode,
    paymentFlag:false
  }
  
  //var totalAmt=0;
  let data:any = this.programService.fetchpaymentInfoFamilyandproCode(body);
  this.paymentListDetailsList=data;
  this.programService.fetchpaymentInfoFamilyandproCode(body).subscribe({
    next: (data: any) => {
  this.annualPledgeFlag = (data.totalpledgeAmount!=0 && data.totalpledgeAmount!=null 
    && data.arpanamPledgeAdjustment!=null && data.arpanamPledgeAdjustment!=0 && data.pledgeTotal > data.arpanamPledgeAdjustment) || 
    (data.totalpledgeAmount==0 && data.arpanamPledgeAdjustment!=null && data.arpanamPledgeAdjustment!=0 
      && data.pledgeTotal == data.arpanamPledgeAdjustment);
     
      this.TotalAmtData = (((data.totalpledgeAmount!=0 && data.totalpledgeAmount!=null) &&
        (data.arpanamPledgeAdjustment!=null && data.arpanamPledgeAdjustment!=0)
        && data.pledgeTotal > data.arpanamPledgeAdjustment)?data.totalpledgeAmount:
      (data.totalpledgeAmount==0 && (data.arpanamPledgeAdjustment!=null && data.arpanamPledgeAdjustment!=0) &&
       data.pledgeTotal==data.arpanamPledgeAdjustment)?data.totalpledgeAmount:
       ((data.totalpledgeAmount!=0 && data.totalpledgeAmount!=null) && data.totalpledgeAmount==data.pledgeTotal
       &&data.arpanamPledgeAdjustment==0)?data.pledgeTotal:data.totalpledgeAmount);

      },
      error: (e:any) => {
        console.error(e);
      }
    });

}

disctingRec(arr:any, key:any){
  if(arr!=null && arr!=undefined){
  const counts:any = {};
  this.totalDiscting=[];
var filterData = arr.filter((obj:any) => {
  const value = obj[key];
  counts[value] = (counts[value] || 0) + 1;
  return counts[value] === 1;
});
this.disctingTotal(counts);
return filterData;
}
}

totalDiscting:any;
totalamtdisc:any;
disctingTotal(rec:any){
  let currentYear = moment(new Date()).format('YYYY');
  let featureYear:any = moment(new Date()).format('YY');
  featureYear = parseInt(featureYear)+1;
  let annualPledgeStr = currentYear+'-'+ featureYear+' Family Annual Pledge';
  let obj:any;
 for( obj in rec){
  if(rec[obj] >0 && obj!=annualPledgeStr && obj!='Adult Class & Bala Vihar Session Preference'){
  
    let tot=0;
    var objname={};
    for(var i=0; i<this.paymentResponse?.userProgramList.length; i++){
      if(this.paymentResponse?.userProgramList[i].signUpCodeDescription == obj){
        tot += this.paymentResponse?.userProgramList[i].displayamount;
       // this.totalamtdisc = tot;
        objname ={label:obj, value: tot };

      }
    }
    this.totalDiscting.push(objname);
  }
 }
}
  goBackToPreviousTab(){
    this.back.emit("Registration")  
   // this.router.navigate(['/programregistration']);
  }

  async completePayment(){
  
//    if(this.acceptRule && this.acceptAggreFlag){
      this.callupdatepayAPI();
    // }else{
    //   alert("Please select the Acceptence.");
    // }
  }
  
  // acceptRule:boolean=false;
  // acceptAggre_1(eve:any){
  //   this.acceptRule = eve.target.value;
  // }

  // acceptAggreFlag:boolean = false;
  // acceptAggre(eve:any){
  //  this.acceptAggreFlag = eve.target.value;
  // } 

  callupdatepayAPI(){
    
    let body ={
      familyId: this.currentUserData.familyID,
    programCode:  this.programCode,
    chapterCode: this.chapterCode,
    paymentFlag:true

    }
    
    this.programService.fetchpaymentInfoFamilyandproCode(body).subscribe({
      next: (data: any) => {
        this.getCallUpdateAPI(data);
      },
      error: (e:any) => {
        console.error(e);
      }
    })
  }


  async getCallUpdateAPI(resfam:any){
    var payopts:any = JSON.parse(localStorage.getItem('payOpts') || '');
      // var total = JSON.parse(localStorage.getItem('totalAMt') || '{}');
      // var totalwithcon = JSON.parse(localStorage.getItem('totalAMtwithconv') || '{}');
      this.loggedInUser= JSON.parse(localStorage.getItem('CurrentUser') || '{}');

      var programCodeVal = JSON.parse(localStorage.getItem('programcode') || '{}');
      
      var personCode = JSON.parse(localStorage.getItem('personID') || '{}');

      var chapterCode = JSON.parse(localStorage.getItem('chapterCode') || '{}');
      
      var datares:any ={
          "user": {
         "familyID": this.loggedInUser.familyID,
          "personID": personCode,
          "Xdata1":programCodeVal,
          // "firstName": resdata.firstName,
          // "middleName": resdata.middleName,
          // "lastName": resdata.lastName,
          // "gender": resdata.gender,
          // "emailAddress": resdata.emailAddress,
          // "phoneNumber": resdata.phoneNumber,
          // "homePhone":resdata.homePhone,
          // "address": resdata.address,
          // "address2": resdata.address2,
          // "address3":resdata.address3,
          // "city": resdata.city,
          // "state": resdata.state,
          // "zipCode": resdata.zipCode,
          "chapter":chapterCode,
          "totalAmount": resfam.totalAmount,
          "totalAmountWithConvenienceFee": resfam.totalAmountWithConv
        },
        programCode:programCodeVal,
        userProgramList:[],
        modeOfPayment: '',//(response.method_used== "echeck")?"ECHECK":"CC",
        installmentAmount:resfam.installmentAmount,
        installmentAmountWithConv:resfam.installmentAmountWithConv,
        pledgeTotal: resfam.pledgeTotal,
        arpanamPledgeAdjustment: resfam.arpanamPledgeAdjustment,
        totalpledgeAmount: resfam.totalpledgeAmount,
        totalPledgeAmountWithConv: resfam.totalPledgeAmountWithConv,
        completeFlag:true,
        immediatePaymentInstallmentInfo: '',
        deferredPaymentInstallmentInfo: ''
      }

      if(resfam.immediatePaymentInstallmentInfo!=null){
        datares.immediatePaymentInstallmentInfo={};
        datares.immediatePaymentInstallmentInfo = {
          id: resfam?.immediatePaymentInstallmentInfo?.id,
          familyID: resfam?.immediatePaymentInstallmentInfo?.familyID,
          personID: resfam?.immediatePaymentInstallmentInfo?.personID,
          invoiceNumber: resfam?.immediatePaymentInstallmentInfo?.invoiceNumber,
          totalInvoiceAmount: resfam?.immediatePaymentInstallmentInfo?.totalInvoiceAmount,
          installmentNumber: resfam?.immediatePaymentInstallmentInfo?.installmentNumber,
          scheduleTransactionAmount: resfam?.immediatePaymentInstallmentInfo?.scheduleTransactionAmount,
          scheduleTransactionAmountWithConv: resfam?.immediatePaymentInstallmentInfo?.scheduleTransactionAmountWithConv,
          scheduleTransactionDate:resfam?.immediatePaymentInstallmentInfo?.scheduleTransactionDate,
          scheduleAuthCode: resfam?.immediatePaymentInstallmentInfo?.scheduleAuthCode,
          status: resfam?.immediatePaymentInstallmentInfo?.status,
          scheduleType: resfam?.immediatePaymentInstallmentInfo?.scheduleType
        }
      }else{
        datares.immediatePaymentInstallmentInfo=null;
      }

      if(resfam.deferredPaymentInstallmentInfo!=null){
        datares.deferredPaymentInstallmentInfo={};
        datares.deferredPaymentInstallmentInfo = {
          id: resfam?.deferredPaymentInstallmentInfo?.id,
          familyID: resfam?.deferredPaymentInstallmentInfo?.familyID,
          personID: resfam?.deferredPaymentInstallmentInfo?.personID,
          invoiceNumber: resfam?.deferredPaymentInstallmentInfo?.invoiceNumber,
          totalInvoiceAmount: resfam?.deferredPaymentInstallmentInfo?.totalInvoiceAmount,
          installmentNumber: resfam?.deferredPaymentInstallmentInfo?.installmentNumber,
          scheduleTransactionAmount: resfam?.deferredPaymentInstallmentInfo?.scheduleTransactionAmount,
          scheduleTransactionAmountWithConv: resfam?.deferredPaymentInstallmentInfo?.scheduleTransactionAmountWithConv,
          scheduleTransactionDate:resfam?.deferredPaymentInstallmentInfo?.scheduleTransactionDate,
          scheduleAuthCode: resfam?.deferredPaymentInstallmentInfo?.scheduleAuthCode,
          status: resfam?.deferredPaymentInstallmentInfo?.status,
          scheduleType: resfam?.deferredPaymentInstallmentInfo?.scheduleType
        }
        //Object.assign(datares.deferredPaymentInstallmentInfo, deferredPaymentInstallmentInfo);
      }else{
        datares.deferredPaymentInstallmentInfo=null;
      }


      Object.assign(datares.userProgramList, resfam.userProgramList);
      if(payopts=="partAmt"){
        datares.paymentInstallmentInfoList= [];
        Object.assign(datares.paymentInstallmentInfoList, resfam.paymentInstallmentInfoList);
      }
      for(var i=0; i<datares.userProgramList.length; i++){
       // datares.userProgramList[i].registrationId = 25098;
        datares.userProgramList[i].registrationStatus= '';//response.response_description;
        if("echeck")
          datares.userProgramList[i].modeOfPayment= "ECHECK";
        else
        datares.userProgramList[i].modeOfPayment= "CC";
        datares.userProgramList[i].paymentAuthCode= '';//response.authorization_code;
        datares.userProgramList[i].paymentTraceNumber= '';//response.trace_number;
        datares.userProgramList[i].invoiceNumber= '';//response.xdata_3;

        datares.userProgramList[i].paymentSubmittedDate= new Date();
        datares.userProgramList[i].paymentTxnDate= new Date();
        
      }

      let data:any = await this.programService.completePaymentInfo(datares);
       if(data!=''){
        Swal.fire({
          // position: 'top-end',
           icon: 'success',
           title: 'Changes are successfully saved.',
           showConfirmButton: false,
           timer: 2000
         });
        this.router.navigate(['/program-registration']);
       }
  }
}
