import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2'
import { ProgramService } from 'src/app/modules/chinmaya-shared/services/program/program.service';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';
import { AuthService } from 'src/app/modules/auth';
import { RouteChangeCall } from 'src/app/modules/chinmaya-shared/services/program-registration/routechange.service';
declare function scrollTop():any;

@Component({
  selector: 'app-constant',
  templateUrl: './constant.component.html',
  styleUrls: ['./constant.component.scss']
})
export class ConstantComponent {

  selectedAcademicYear: any;
  selectedChapterCode: any;
  selectedProgram: any;
  loggedInUser: any;
  selectedFamily:any;
  currentDate:any;
  currentUserData:any;
  programCode:any;
  chapterCode:any;
  familyId:any;
  personID:any;
  timeDisplay:any;
  sanitizedURL:any;
  Signature:any;
 constructor(private programService: ProgramService, private sanitizer: DomSanitizer,
   private store:StoreService, private authService:AuthService, private routePass:RouteChangeCall){
  moment(new Date()).format('MM/DD/YYYY')
 }

 async ngOnInit() {
 // scrollTop();
  this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
  this.selectedChapterCode = this.store.getValue(KEYS.chapter);
  this.selectedProgram = this.store.getValue(KEYS.program);
  this.selectedFamily = this.store.getValue(KEYS.selectedFamily);
  this.currentUserData = this.authService.getLoggedInUser();

  this.programCode = this.selectedProgram.code;
  this.chapterCode =  this.selectedChapterCode;
  this.familyId= this.selectedFamily.familyId;
  this.personID =  this.selectedProgram.personID;

  let IFRAME_URL:any='assets/documents/'+this.chapterCode+'/'+this.programCode+'.pdf';
  this.sanitizedURL = this.sanitizer.bypassSecurityTrustResourceUrl(IFRAME_URL);

    var d = new Date(); // for now
    d.getHours(); // => 9
    d.getMinutes(); // =>  30
    d.getSeconds(); // => 51

   this.currentDate =  moment(new Date()).format('MM/DD/YYYY');
   this.timeDisplay =  moment(d).format('HH:mm');
   this.Signature='';
   this.fetchPaymentValidatedSignature();
}
  goBackToPreviousTab(){
    this.routePass.sendData({'currenttab':'Constant','Event':'back'}); 
  }
errorMsgConstent:boolean=false;
  async acceptGoPayment(){
    this.errorMsgConstent=false;
    if(this.Signature!=''){
      this.signatureUpdate();
      
    }else{
      this.errorMsgConstent=true;
    }
  }
 
  signaturesData:any;
  fetchPaymentValidatedSignature(){
    let body ={
      familyID:  this.familyId,
      programCode: this.programCode,
      personID: this.personID,
      paymentValidatedSignature:''
    }
    
    this.programService.fetchPaymentValidatedSignature(body).subscribe({
      next: (data: any) => {
        this.Signature = '';// data.paymentValidatedSignature;
      },
      error: (e) => {
        console.error(e);
      }
    })
  }
  
  signatureUpdate(){
    let body ={
      familyID:  this.familyId,
      programCode: this.programCode,
      personID: this.personID,
      paymentValidatedSignature:this.Signature
    }
    
    this.programService.updatePaymentValidatedSignature(body).subscribe({
      next: (data: any) => {
        this.Signature = '';
        this.routePass.sendData({'currenttab':'Consent','Event':'SaveNext'}); 
      },
      error: (e) => {
        console.error(e);
      }
    })
  }
}
