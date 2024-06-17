import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MemberShipCallWorkListServices } from 'src/app/modules/chinmaya-shared/services/membershp-call-worklist/membershp-call-worklist.service';

@Component({
  selector: 'app-membership-call-details',
  templateUrl: './membership-call-details.component.html',
  styleUrls: ['./membership-call-details.component.scss']
})
export class MembershipCallDetailsComponent {


  @Input() callWorkDetails:any
  callWorkHistoryForm:any


  menuAccordionFlag:any={
    Category_1:false,
    Category_2:false,
    Category_3:false,
    Category_4:false
    }


    constructor(private fb:FormBuilder,
      private membeshipService: MemberShipCallWorkListServices,
    ){}

    ngOnChanges(changes:any){
      if(changes && changes["callWorkDetails"].currentValue){
        this.callWorkDetails=changes["callWorkDetails"].currentValue
        this.callWorkHistoryForm.patchValue(this.callWorkDetails);
      } 
    }

    ngAfterViewInit(){
      this.prepareForm()
    }

    prepareForm(){
      this.callWorkHistoryForm = this.fb.group({
        callId: [''],
        personId: [''],
        familyId: [''],
        assignedTo: [''],
        callNotes: [''],
        doNotCallAgainFlag: [''],
        programCode: [''],
        academicYear: ['']
      })

      this.callWorkHistoryForm.patchValue(this.callWorkDetails);
    }


    accordionMenu(id:any){
      this.menuAccordionFlag[id]= !this.menuAccordionFlag[id];
    }

    async onSaveButtonClick(){
        let formValues = this.callWorkHistoryForm.value;
        await this.membeshipService.saveMembershipCallHistory(formValues);
      
     }
}
