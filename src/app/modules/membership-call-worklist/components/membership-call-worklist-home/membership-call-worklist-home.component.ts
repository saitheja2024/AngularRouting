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
  selectedChapter: any;
  totalRecList:any;
  constructor(private membeshipService: MemberShipCallWorkListServices,
    private store:StoreService
  ){}

  async ngOnInit(){
    this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    let chapter = this.store.getValue(KEYS.chapterDesc);
    this.selectedChapter=chapter[0].description;

    this.fetchMemberShipCallWork('');
  }

  async fetchMemberShipCallWork(eve:any){
    var params = {
      "requestPageModel": {
        "page": 0,
        "size": 0,
        "sortFieldName": "",
        "sortOrder": ""
      },
      "requestMemberShipCallWork": {
        "personId": 0,
        "academicYear": this.selectedAcademicYear,
        "chapterCode": this.selectedChapterCode,
        "programCode": "",
        "registrationStatus": "PENDING",
        "paymentStatus": "NO_DUES",
        "assignToMe":eve
      }
    };
     let dataList= await this.membeshipService.fetchMemberShipCallWork(params);
     this.list = dataList;
    this.totalRecList =dataList;
  }


  async showCallDetails(callWork:any){
    callWork.familyID = callWork.familyId;
    
    this.callWorkDetails = await this.membeshipService.fetchMemberShipCallWorkDetailsByFamilyId(callWork);
  }

  oncallWorkDetailsSavedNotification(ev:any){
    this.fetchMemberShipCallWork('');
  }

  activeOrder:any={};
  totalRecFooter:any;
sortItems(letter: string, index:any) {
  this.activeOrder={[index]:true};
  let dataFilter =  this.list.projectSummaryList;
  let filteredData = dataFilter.filter((item:any) => (item.primaryLastName).toLowerCase().startsWith((letter).toLowerCase()));
  this.totalRecFooter = {totalProjectSummary:filteredData.length};
  this.list.projectSummaryList = filteredData;
}

}
