import { Component } from '@angular/core';
import { MemberShipCallWorkListServices } from 'src/app/modules/chinmaya-shared/services/membershp-call-worklist/membershp-call-worklist.service';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';

@Component({
  selector: 'app-membership-call-worklist-home',
  templateUrl: './membership-call-worklist-home.component.html',
  styleUrls: ['./membership-call-worklist-home.component.scss']
})
export class MembershipCallWorklistHomeComponent {
  list: any
  selectedAcademicYear: any;
  selectedChapterCode: any;
  selectedProgram: any;
  callWorkDetails: any;

  constructor(private membeshipService: MemberShipCallWorkListServices,
    private store:StoreService
  ){}

  async ngOnInit(){
    this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    var params = {
      "academicYear": this.selectedAcademicYear,
      "chapterCode": this.selectedChapterCode,
      "registrationStatus": "PENDING",
      "paymentStatus": "NO_DUES",
    }
    this.list = await this.membeshipService.fetchMemberShipCallWork(params);
  }


  async showCallDetails(callWork:any){
    callWork.familyID = callWork.familyId;
    callWork.programCode= "CS_BALAVIHAR_2024-25";
    this.callWorkDetails = await this.membeshipService.fetchMemberShipCallWorkDetailsByFamilyId(callWork);
  }

}
