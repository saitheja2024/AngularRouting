import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MemberShipCallWorkListServices } from 'src/app/modules/chinmaya-shared/services/membershp-call-worklist/membershp-call-worklist.service';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';

@Component({
  selector: 'app-membership-call-details',
  templateUrl: './membership-call-details.component.html',
  styleUrls: ['./membership-call-details.component.scss']
})
export class MembershipCallDetailsComponent {


  @Input() callWorkDetails:any
  @Output() callWorkDetailsSavedNotification:EventEmitter<string> = new EventEmitter<string>();
  callWorkHistoryForm:any


  menuAccordionFlag:any={
    Category_1:false,
    Category_2:false,
    Category_3:false,
    Category_4:false
    }
  selectedAcademicYear: any;
  selectedChapterCode: any;


    constructor(private fb:FormBuilder,
      private store:StoreService,
      private membeshipService: MemberShipCallWorkListServices,
    
    ){}

    ngOnInit(){
      this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
      this.selectedChapterCode = this.store.getValue(KEYS.chapter);
      this.prepareForm()
    }

    ngOnChanges(changes:any){
      if(changes && changes["callWorkDetails"].currentValue){
        this.callWorkDetails=changes["callWorkDetails"].currentValue
       
        this.callWorkDetails.academicYear=this.selectedAcademicYear;
        this.callWorkDetails.personId=this.membeshipService.getLoggedInUser().personID
        this.callWorkHistoryForm.patchValue(this.callWorkDetails);
      } 
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
        academicYear: ['']
      })

      //this.callWorkHistoryForm.patchValue(this.callWorkDetails);
    }


    accordionMenu(id:any){
      this.menuAccordionFlag[id]= !this.menuAccordionFlag[id];
    }

    async onSaveButtonClick(){
        let formValues = this.callWorkHistoryForm.value;
        formValues.programCode="CS_BALAVAHAR_2024-25";
        
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
}
