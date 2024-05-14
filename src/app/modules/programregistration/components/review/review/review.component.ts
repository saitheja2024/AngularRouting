import { Component } from '@angular/core';
import { ProgramService } from 'src/app/modules/chinmaya-shared/services/program/program.service';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';
import { AuthService } from 'src/app/modules/auth';
import { RouteChangeCall } from 'src/app/modules/chinmaya-shared/services/program-registration/routechange.service';
import { DatapasstoComponent } from 'src/app/modules/chinmaya-shared/services/program-registration/datapassing.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  pendingPaymentData:any;
  selectedList:any=[];

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
  primaryContatDetails:any;
  Object = Object;
  signupURL:string;

  Datamessage:any;

  constructor(private programService:ProgramService, private store:StoreService,
     private authService:AuthService, private routePass:RouteChangeCall, private Dataservice:DatapasstoComponent){

  }
  ngOnInit(){
    this.signupURL = 'https://cmwrc.chinmayadc.org/support/arpanam/';
    this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.selectedProgram = this.store.getValue(KEYS.program);
    this.selectedFamily = this.store.getValue(KEYS.selectedFamily);
    this.currentUserData = this.authService.getLoggedInUser();

    this.programCode = this.selectedProgram.code;
    this.chapterCode =  this.selectedChapterCode;
    this.familyId= this.selectedFamily.familyId;
    this.personID =  this.selectedProgram.personID;

    this.ReviewTabInit();
    this.subscribeCompData();
  }

  subscribeCompData(){
    this.pendingPaymentData = this.Dataservice.getStoreValue();
    console.log(this.pendingPaymentData)
    this.selectedChoice();
  }

    selectedChoice(){
    this.selectedList=[];
      for(var k=0; k<this.pendingPaymentData.length; k++){
        if(this.pendingPaymentData[k].familySessionPreference.length>0){
          this.selectedList.push({'personName': this.pendingPaymentData[k].personName,'signupCode': this.pendingPaymentData[k].signUpCodeDescription, 'Session': this.pendingPaymentData[k].familySessionPreference });
        }
       }  
  }

  timeSlotDetailsList:any;

  transferTimeSlot(eve:any){
   this.timeSlotDetailsList=eve;
  }

  reviewTabWaitListData:any;
  reviewgrpWaitlistPerson:any=[];
  async reviewTabWaitList(){
    return new Promise((resolve,reject)=>{
    let body ={
      familyId: this.familyId,
      programCode: this.programCode,
    }
    this.programService.fetchPersonProgramRegistrationsByWaitListed(body).subscribe((data:any)=>{
      this.reviewTabWaitListData=data;
      if(data?.personProgramRegistrationList.length>0){
       // this.sortOrderReviewData = data?.userProgramList.sort((a:any, b:any) => a.personID - b.personID);
        let grpName = this.groupReviewData(data?.personProgramRegistrationList, 'personName');
        this.reviewgrpWaitlistPerson=grpName;
        this.TotalValReviewWaitList();
       }
        resolve(data)
    })

  })
  }

  totalAmtWaitlistAccordion:any=[];
  TotalValReviewWaitList(){
    this.totalAmtWaitlistAccordion =[];
    let total  =0;
    let sortData = this.reviewTabWaitListData?.personProgramRegistrationList; //.sort((a:any, b:any) => a.personID - b.personID);
    sortData.filter( (item:any, index:any, self:any) =>{
        if(this.totalAmtWaitlistAccordion[item.personName]==undefined){this.totalAmtWaitlistAccordion[item.personName]=[];}
        if(self.indexOf(item) ===index){
        total = ((this.totalAmtWaitlistAccordion[item.personName].length==0)?0: this.totalAmtWaitlistAccordion[item.personName][0])+item.displayamount;
        if(this.totalAmtWaitlistAccordion[item.personName].length==0){this.totalAmtWaitlistAccordion[item.personName].push(total);}else{ this.totalAmtWaitlistAccordion[item.personName][0] = total; }
       }
    });
    
  }

  groupReviewData(objectArray:any, property:any) {
    return objectArray.reduce(function (acc:any, obj:any) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
}


getDate(timeString: any) {
  const dummyDate = new Date();
  const [hours, minutes, seconds] = timeString.split(':');
  dummyDate.setHours(+hours, +minutes, +seconds);
  return dummyDate;
}

reviewTabData:any;
reviewwgrpPerson:any=[];
sortOrderReviewData:any;
ReviewTabInit(){
  //scrollTop();
  let body ={
    familyId: this.familyId,
    programCode: this.programCode,
    chapterCode: this.chapterCode,
    paymentFlag: false,
    personId: 0
  }
  this.programService.fetchProgramPledgeReview(body).subscribe({
    next: (data: any) => {
      this.reviewTabData=data;
      if(data?.userProgramList.length>0){
      this.sortOrderReviewData = data?.userProgramList.sort((a:any, b:any) => a.personID - b.personID);
      let grpName = this.groupReviewData(this.sortOrderReviewData, 'firstName');
      this.reviewwgrpPerson=grpName;
      this.TotalValReview();

     }
    },
    error: (e:any) => {
      console.error(e);
    }
  })
}
totalAmtAccordion:any;
TotalValReview(){
  this.totalAmtAccordion =[];
  let total  =0;
  let sortData = this.reviewTabData?.userProgramList.sort((a:any, b:any) => a.personID - b.personID);
  sortData.filter( (item:any, index:any, self:any) =>{
      if(this.totalAmtAccordion[item.firstName]==undefined){this.totalAmtAccordion[item.firstName]=[];}
      if(self.indexOf(item) ===index){
      total = ((this.totalAmtAccordion[item.firstName].length==0)?0: this.totalAmtAccordion[item.firstName][0])+item.displayamount;
      if(this.totalAmtAccordion[item.firstName].length==0){this.totalAmtAccordion[item.firstName].push(total);}else{ this.totalAmtAccordion[item.firstName][0] = total; }
     }
  });
}

async fetchPrimaryContactDetails() {
  const body = {
    familyId: this.currentUserData.familyID,
    programCode:"",
    chapterCode: this.currentUserData.chapter,
    paymentFlag: false
  }
  let data:any = await this.programService.getPrimaryContact(body);
  this.primaryContatDetails = data;
}

backtoClassRegistration(){
  this.routePass.sendData({'currenttab':'Additional Details','Event':'back'}); 
}

newwindow(){
  window.open(this.signupURL, "_blank");
}

paymentTab(){
  //this.onSaveAndNext("");
  this.routePass.sendData({'currenttab':'Review','Event':'SaveNext'}); 
}

backToReviewTab(){
  this.routePass.sendData({'currenttab':'Review','Event':'back'}); 
}

}
