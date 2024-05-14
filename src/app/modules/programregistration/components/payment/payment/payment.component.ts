import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import Swal from 'sweetalert2'
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/modules/auth';
import { MasterService } from 'src/app/modules/chinmaya-shared/services/master/master.service';
import { ProgramService } from 'src/app/modules/chinmaya-shared/services/program/program.service';
import { StoreService, KEYS } from 'src/app/modules/chinmaya-shared/services/store/store.service';
import { RouteChangeCall } from 'src/app/modules/chinmaya-shared/services/program-registration/routechange.service';

declare function callbackUTC_1():any;
declare function scrollTop():any;


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  paymentListDetailsList:any;
  TotalAmtData:any;
  immediatePaymentAmount:any;
  immediatePaymentAmountWithConv:any;
  annualPledgeFlag:any;
  paymentCompleteTab:boolean=false;

  selectedAcademicYear: any;
  selectedChapterCode: any;
  selectedProgram: any;
  loggedInUser: any;
  selectedFamily:any;
  currentUserData:any;

  programCode:any;
  chapterCode:any;
  familyId:any;
  personID:any;

  payFullAmt:string="fullAmt";
  signature:any;
  utc_time:any;

constructor(private masterService: MasterService,private programService: ProgramService,  
  private sanitizer: DomSanitizer, private authService:AuthService,
  private store:StoreService, private router:Router, private routePass:RouteChangeCall){

}

ngOnInit(){
  localStorage.setItem('payOpts',JSON.stringify("fullAmt"));
  this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
  this.selectedChapterCode = this.store.getValue(KEYS.chapter);
  this.selectedProgram = this.store.getValue(KEYS.program);
  this.selectedFamily = this.store.getValue(KEYS.selectedFamily);
  this.currentUserData = this.authService.getLoggedInUser();

  this.programCode = this.selectedProgram.code;
  this.chapterCode =  this.selectedChapterCode;
  this.familyId= this.selectedFamily.familyId;
  this.personID =  this.selectedProgram.personID;

  this.paymentInfoListDetails();
}

 async paymentInfoListDetails(){
    //scrollTop();
    let body ={
      familyId: this.familyId,
      programCode: this.programCode,
      chapterCode: this.chapterCode,
      paymentFlag:false
    }
    
    //var totalAmt=0;
    let data:any = await this.programService.fetchpaymentInfoFamilyandproCode(body);
         this.paymentListDetailsList=data;
        //  for(var i=0; i< this.paymentListDetailsList.userProgramList.length; i++){
        //   totalAmt += this.paymentListDetailsList.userProgramList[i].amount;
        //  }
        // this.TotalAmtData = totalAmt;
        
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

         if (data.deferredPaymentInstallmentInfo != null && data.deferredPaymentInstallmentInfo != '') {
          this.immediatePaymentAmount = data.immediatePaymentAmount;
          this.immediatePaymentAmountWithConv = data.immediatePaymentAmountWithConv;
          localStorage.setItem('totalAMt', this.immediatePaymentAmount);
          localStorage.setItem('totalAMtwithconv', this.immediatePaymentAmountWithConv);
         }else{
          this.immediatePaymentAmount = (data.arpanamPledgeAdjustment==0)? data.totalAmount:data.totalpledgeAmount;
          this.immediatePaymentAmountWithConv = (data.arpanamPledgeAdjustment==0)? data.totalAmountWithConv:data.totalPledgeAmountWithConv;
          localStorage.setItem('totalAMt', this.immediatePaymentAmount);
          localStorage.setItem('totalAMtwithconv', this.immediatePaymentAmountWithConv);
         }

         this.paymentCompleteTab = (data.totalpledgeAmount==0 && data.arpanamPledgeAdjustment!=null && data.arpanamPledgeAdjustment!=0 
          && data.pledgeTotal==data.arpanamPledgeAdjustment)
         || (data.totalpledgeAmount==0 && data.arpanamPledgeAdjustment==0 && data.pledgeTotal==0)
         ? true : false;
      
  }

  
  paymentModeSelect(val:string){
    localStorage.setItem('payOpts',JSON.stringify(val));
    this.ccCardPay='';
  }

  disctingRec(arr:any, key:any){
    const counts:any = {};
    this.totalDiscting=[];
if(arr!=null){
  var filterData = arr.filter((obj:any) => {
    const value = (obj.category==101 && obj.adjustedAmount==0)?'':obj[key];
    counts[value] = (obj.category==101 && obj.adjustedAmount==0)?'': (counts[value] || 0) + 1;
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
      for(var i=0; i<this.paymentListDetailsList.userProgramList.length; i++){
        if(this.paymentListDetailsList.userProgramList[i].signUpCodeDescription == obj){
          tot += this.paymentListDetailsList.userProgramList[i].displayamount;
         // this.totalamtdisc = tot;
          objname ={label:obj, value: (this.paymentListDetailsList.userProgramList[i].arpanamLevel==1)?0 :tot, category:this.paymentListDetailsList.userProgramList[i].category, displayamount:this.paymentListDetailsList.userProgramList[i].displayamount };

        }
      }
      this.totalDiscting.push(objname);
    }
   }
  }

  ccCardPay:any='';
  amountwithconvience:any=0;
  proceedPayBtnCC:boolean=false;
  proceedPayBtnEcheck:boolean=false;
  convienceFee:any;

  cardValue(){
    this.proceedPayBtnCC = false;
    this.proceedPayBtnEcheck = false;
    let body={
      chapterCode:this.chapterCode,
      programCode:this.programCode
    }
    this.programService.fetchConvienceFee(body).subscribe({
      next: (data: any) => {
         this.convienceFee=data;
         var buttonval = $('button[id]');
          buttonval.attr('api_access_id',environment.API_Access_ID);
          buttonval.attr('location_id', environment.LOCATION_ID);
         if(this.ccCardPay=='CC'){
          this.proceedPayBtnCC = true;
          var button = $('button[api_access_id]');
          button.attr('allowed_methods',"visa, mast, disc"); 
        // var amountConv = (this.TotalAmtData*data.convenienceFee)/100;
        // this.amountwithconvience = this.TotalAmtData+amountConv;
        // localStorage.setItem('totalAMt', this.TotalAmtData);
        // localStorage.setItem('totalAMtwithconv', this.amountwithconvience);
      }else{
        this.proceedPayBtnEcheck = true;
         var button = $('button[api_access_id]');
         button.attr('allowed_methods',"echeck");
        // this.amountwithconvience = this.TotalAmtData;
        // localStorage.setItem('totalAMt', this.TotalAmtData);
        // localStorage.setItem('totalAMtwithconv', this.TotalAmtData);
      }
     
     
        this.callPaymentInfo();
  

      },
      error: (e:any) => {
        console.error(e);
      }
    });

  }

 fetchresponsePayData:any='';
  async callPaymentInfo(){
    localStorage.setItem('payMode', JSON.stringify(this.ccCardPay));
    let body ={
      familyId: this.familyId,
      programCode: this.programCode,
      chapterCode: this.chapterCode,
      paymentFlag:true
    }
    
    var totalAmt=0;
    var fetchUpdateFlag = sessionStorage.getItem('fetchupdateResponse');
    
    if(fetchUpdateFlag==undefined || fetchUpdateFlag==null){
      this.fetchresponsePayData = await  this.programService.fetchpaymentInfoFamilyandproCodeFlagTrue(body);
      sessionStorage.setItem('fetchupdateResponse', JSON.stringify(this.fetchresponsePayData));
    }

        if(this.payFullAmt=='fullAmt'){
          if(this.ccCardPay=='E-Check'){ 
            var button = $("button[id*='pay_proceed_btn_echeck_full']"); 
          }else{ 
            var button = $("button[id*='pay_proceed_btn_cc_full']"); 
          }  
          //var button = $('button[api_access_id]');
        //  var api_access_id=button.attr('api_access_id');
     button.attr('billing_name',this.fetchresponsePayData.billingName);
     button.attr('billing_street_line1',this.fetchresponsePayData.billingStreetLine1);
     button.attr('billing_locality',this.fetchresponsePayData.billingLocality);
     button.attr('billing_region',this.fetchresponsePayData.billingRegion);
     button.attr('billing_postal_code',this.fetchresponsePayData.billingPostalCode);
     button.attr('billing_phone_number',this.fetchresponsePayData.billingPhoneNumber);
     button.attr('billing_email_address',this.fetchresponsePayData.billingEmailAddress);
     //button.attr('line_item_4',responsedata.);
      if(this.ccCardPay=='E-Check'){
        button.attr('total_amount', this.immediatePaymentAmount);
        button.attr('xdata_2',this.immediatePaymentAmount);
      }else{
        button.attr('total_amount', this.immediatePaymentAmountWithConv);
        button.attr('xdata_2',this.immediatePaymentAmountWithConv);
      }
     
  
     button.attr('order_number',this.fetchresponsePayData.xdata3);
     button.attr('consumer_id',this.fetchresponsePayData.familyId);
     button.attr('xdata_1',this.fetchresponsePayData.xdata1);
     button.attr('xdata_3',this.fetchresponsePayData.xdata3);
     button.attr('reference_id',this.fetchresponsePayData.xdata1);
    // if(this.ccCardPay!='E-Check'){
    //  for(var i=0; i<this.fetchresponsePayData.userProgramList.length; i++){
    //     //for(var j=0; j<this.signupcode.length; j++){
    //      //if( this.signupcode[j].signUpCode == response.userProgramList[i].classes) {
    //       button.attr('line_item_'+(i+1), this.fetchresponsePayData.userProgramList[i].signUpCodeDescription +',Immediate,'+new Date()+','+ this.fetchresponsePayData.userProgramList[i].amount+".00");
    //     // }
    //    // }
    //    }
     // }
     callbackUTC_1();
     this.signature = JSON.parse(localStorage.getItem('signature') || '');
     this.utc_time = JSON.parse(localStorage.getItem('utc_time') || '');
     setTimeout(() => {
      if(this.ccCardPay=='E-Check'){
        var id = document.getElementById('pay_proceed_btn_echeck_full'); 
      }else{
        var id = document.getElementById('pay_proceed_btn_cc_full'); 
      }  
       id?.setAttribute('api_access_id', environment.API_Access_ID);
       id?.setAttribute('location_id', environment.LOCATION_ID);
      // id?.setAttribute('signature', this.signature);
      // id?.setAttribute('utc_time', this.utc_time);
       //this.proceedPayBtn=true;
       
      }, 1500);
   
        }else if(this.payFullAmt=='partAmt'){
          if(this.ccCardPay=='E-Check'){
            var button = $("button[id*='pay_proceed_btn_echeck']"); 
          }else{ 
            var button = $("button[id*='pay_proceed_btn_cc']"); 
          }  
          //var button = $('button[api_access_id]');
          var api_access_id=button.attr('api_access_id');
          var installAmt = (this.ccCardPay=='E-Check')?this.fetchresponsePayData.installmentAmount : (this.fetchresponsePayData.convenienceFee==0)?this.fetchresponsePayData.installmentAmount:this.fetchresponsePayData.installmentAmountWithConv;
     button.attr('billing_name',this.fetchresponsePayData.billingName);
     button.attr('billing_street_line1',this.fetchresponsePayData.billingStreetLine1);
     button.attr('billing_locality',this.fetchresponsePayData.billingLocality);
     button.attr('billing_region',this.fetchresponsePayData.billingRegion);
     button.attr('billing_postal_code',this.fetchresponsePayData.billingPostalCode);
     button.attr('billing_phone_number',this.fetchresponsePayData.billingPhoneNumber);
     button.attr('billing_email_address',this.fetchresponsePayData.billingEmailAddress);
     //button.attr('line_item_4',responsedata.);
     button.attr('total_amount', installAmt);
     button.attr('order_number',this.fetchresponsePayData.xdata3);
     button.attr('consumer_id',this.fetchresponsePayData.familyId);
     button.attr('xdata_1',this.fetchresponsePayData.xdata1);
     button.attr('xdata_2',this.fetchresponsePayData.xdata2+".00");
     button.attr('xdata_3',this.fetchresponsePayData.xdata3);
    // button.attr('schedule_start_date', moment(this.fetchresponsePayData.instalmentDate).format('MM/DD/YYYY'));
     //button.attr('schedule_quantity', this.fetchresponsePayData.instalmentNum);
     button.attr('reference_id',this.fetchresponsePayData.xdata1);

     var origtotalcount = this.fetchresponsePayData.userProgramList.length;
     
    // if(this.ccCardPay!='E-Check'){
    //  for(var i=0; i<this.fetchresponsePayData.userProgramList.length; i++){
      
    //   if(i==0){
    //     const val:any = i;
    //     let num = val+1;
    //     button.attr('line_item_'+num, this.fetchresponsePayData.userProgramList[i].classes +",Immediate,"+moment(new Date()).format('MM/DD/YYYY')+','+ this.fetchresponsePayData.totalAmount+".00"+','+installAmt);
    //    }

    //    if(i!=0){
    //     const val1:any = i;
    //     let num = val1+1;
    //     button.attr('line_item_'+num, this.fetchresponsePayData.userProgramList[i].signUpCodeDescription +",Future,"+moment(this.fetchresponsePayData.lastDateOfCurrentMonth).format('MM/DD/YYYY')+","+this.fetchresponsePayData.totalAmount+".00"+","+installAmt)
    //    }
    //   }
      
      //  for (var j=0; j<2; j++){
      //   if(j==0){
      //     button.attr('line_item_'+(1+origtotalcount),",,Total Amount,"+this.fetchresponsePayData.totalAmount+".00"+','+installAmt);
      //   }else if(j==1){
      //     button.attr('line_item_'+(origtotalcount+2), ",,First Instalment Pledge Amount,"+moment(new Date()).format('MM/DD/YYYY')+','+installAmt);
      //   }
       //} 
      //}

     callbackUTC_1();
     setTimeout(() => {
      if(this.ccCardPay=='E-Check'){
        var id = document.getElementById('pay_proceed_btn_echeck'); 
      }else{
        var id = document.getElementById('pay_proceed_btn_cc'); 
      }
         
       id?.setAttribute('api_access_id', environment.API_Access_ID);
       id?.setAttribute('location_id', environment.LOCATION_ID);
       //id?.setAttribute('signature', this.signature);
       //id?.setAttribute('utc_time', this.utc_time);
      // this.proceedPayBtn=true;
      }, 1500);
        }
       

  }


  backtoSignatureTab(){
    this.routePass.sendData({'currenttab':'Payment','Event':'back'}); 

  }

  onBackTab(ev:any){
    this.routePass.sendData({'currenttab':'Registration','Event':'current'}); 
  }


}


