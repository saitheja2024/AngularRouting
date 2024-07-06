import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MemberShipCallWorkListServices } from 'src/app/modules/chinmaya-shared/services/membershp-call-worklist/membershp-call-worklist.service';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';
import * as moment from 'moment';

@Component({
  selector: 'app-membership-call-details',
  templateUrl: './membership-call-details.component.html',
  styleUrls: ['./membership-call-details.component.scss']
})
export class MembershipCallDetailsComponent {


  @Input() callWorkDetails:any
  @Output() callWorkDetailsSavedNotification:EventEmitter<string> = new EventEmitter<string>();
  callWorkHistoryForm:any
  popupWindowFlag:boolean=false;
  Object = Object;

  menuAccordionFlag:any={
    Category_1:false,
    Category_2:false,
    Category_3:false,
    Category_4:false
    }
  selectedAcademicYear: any;
  selectedChapterCode: any;
  currentDateTime:any;
  timeDisplay:any;
  currentDate:any;
    constructor(private fb:FormBuilder,
      private store:StoreService,
      private membeshipService: MemberShipCallWorkListServices,
    
    ){}

    ngOnInit(){
      this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
      this.selectedChapterCode = this.store.getValue(KEYS.chapter);
      this.popupWindowFlag=false;
      this.prepareForm();
      //this.groupbyNameforSession();
    }
   groupbyNameSignupDetails:any;
    groupbyNameforSession(){
      this.groupbyNameSignupDetails='';
      const groupedByName = this.callWorkDetails?.childList.reduce((acc:any, item:any) => {
        // If the name doesn't exist in the accumulator, initialize it with an empty array
        if (!acc[item.name]) {
          acc[item.name] = [];
        }
        // Push the current item into the array for this name
        acc[item.name].push(item);
        return acc;
      }, {});
      this.groupbyNameSignupDetails=groupedByName;
      console.log(groupedByName);
    }

    ngOnChanges(changes:any){
      if(changes && changes["callWorkDetails"].currentValue){
        this.callWorkDetails=changes["callWorkDetails"].currentValue
       
         let callHistory:any = {
          assignedTo:"",
          callId:0
         };
         let checkcallHistory = (this.callWorkDetails.callHistoryList==null)?'':this.callWorkDetails.callHistoryList[0];
         if(this.callWorkDetails && this.callWorkDetails.callHistoryList){
            callHistory = this.callWorkDetails.callHistoryList[0];
         }
        callHistory.academicYear=this.selectedAcademicYear;
        callHistory.personId=this.membeshipService.getLoggedInUser().personID
        callHistory.familyId = this.callWorkDetails.familyId;
        callHistory.programCode=this.callWorkDetails.programCode;
        callHistory.callNotes="";
        this.callWorkHistoryForm.patchValue(callHistory); 
      //  this.getCurrentDateTime(checkcallHistory);
        if(this.callWorkDetails.callHistoryList==null){
          this.callWorkHistoryForm.controls['assignedTo'].setValue('');
          this.callWorkHistoryForm.controls['doNotCallAgainFlag'].setValue('');
          this.callWorkHistoryForm.controls['callCount'].setValue('');
          this.callWorkHistoryForm.controls['callNotes'].setValue('');
        }
      } 

      this.groupbyNameforSession();
    }
    prepareForm(){
      this.callWorkHistoryForm = this.fb.group({
        callId: [0],
        personId: [''],
        familyId: [''],
        assignedTo: [''],
        callNotes: [''],
        doNotCallAgainFlag: [''],
        programCode: [''],
        academicYear: [''],
        callCount:[''],
        lastCallDate:['']
      })

      // let callHistory = this.callWorkDetails.callHistoryList[0];
      // this.callWorkHistoryForm.patchValue(callHistory);
    }


    accordionMenu(id:any){
      this.menuAccordionFlag[id]= !this.menuAccordionFlag[id];
    }

    async onSaveButtonClick(){
        let formValues = this.callWorkHistoryForm.value;
        //formValues.programCode="CS_BALAVAHAR_2024-25";
        
        // formValues=
        //   {
        //     "callId": 0,
        //     "personId": 3915,
        //     "familyId": 4942,
        //     "assignedTo": "zz",
        //     "callNotes": "call notes....",
        //     "doNotCallAgainFlag": true,
        //     "programCode": "CS_BALAVAHAR_2024-25",
        //     "academicYear": "2024-2025"
        //   }
          
        await this.membeshipService.saveMembershipCallHistory(formValues);
        this.callWorkDetailsSavedNotification.emit();
      
     }

     onViewPreviouCallNotesClick(){
      this.popupWindowFlag=true;
      if(this.callWorkDetails && this.callWorkDetails.callHistoryList){
        let  callNotesList = this.callWorkDetails.callHistoryList[0].responseCallNotesList.map((note:any) => note.callNotes);
        callNotesList=callNotesList.join('\n');
        this.callWorkHistoryForm.get("callNotes").setValue(callNotesList);
       }
     }

     closePopup(){
      this.popupWindowFlag=false;
     }

    //  getCurrentDateTime(data:any){
    //   var d = new Date(); 
    //   d.getHours(); 
    //   d.getMinutes(); 
    //   d.getSeconds();
    
    //   let val = (data.lastCallDate!=null && data.lastCallDate!='' && !data.lastCallDate.includes('-') )? new Date(data.lastCallDate): new Date();
    //  this.currentDate =  moment(val).format('MM/DD/YYYY');
    //  this.timeDisplay =  moment(d).format('HH:mm');
    //  this.currentDateTime = this.currentDate+' - '+this.timeDisplay;
    //  if(this.callWorkHistoryForm.get("lastCallDate").value =='' || data.lastCallDate==null ){
    //   this.callWorkHistoryForm.get("lastCallDate").setValue(this.currentDateTime);
    //  }
    //  }
}
