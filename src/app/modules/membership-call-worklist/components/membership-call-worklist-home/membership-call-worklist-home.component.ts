import { Component, ViewChild } from '@angular/core';
import { MemberShipCallWorkListServices } from 'src/app/modules/chinmaya-shared/services/membershp-call-worklist/membershp-call-worklist.service';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableUtil } from 'src/app/utils/excelexport';

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
  searchCriteria:any={
    "requestPageModel": {
      "page": 0,
      "size": 10,
      "sortFieldName": "",
      "sortOrder": ""
    },
    "requestMemberShipCallWork": {
      "personId": 0,
      "academicYear": '',
      "chapterCode": '',
      "programCode": "",
      "registrationStatus": "PENDING",
      "paymentStatus": "NO_DUES",
      "assignToMe":''
    }
  };
  paginationConfig={
    pageSize : 10,
    pageIndex : 0,
    pageSizeOptions :[10,30, 50,150,200,300,350,450],
    showFirstLastButtons : true,
    length:10
    };
  displayedColumns: string[] = ['familyId', 'firstName', 'lastName', 'years','assignedTo'];
  dataSource:any = new MatTableDataSource<any>(); 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private membeshipService: MemberShipCallWorkListServices,
    private store:StoreService
  ){
    // this.store.onProgramUpdate().subscribe((program:any)=>{
    //   this.selectedProgram=program;
    // });
  }

  async ngOnInit(){
    this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    let chapter = this.store.getValue(KEYS.chapterDesc);
    this.selectedChapter=chapter[0].description;

    this.fetchMemberShipCallWork('');
   await  this.programDesc();
  }

 async programDesc(){
    let param = {
      "code": this.selectedChapterCode
    };
    let dataList= await this.membeshipService.membercallListProgram(param);
    this.selectedProgram = dataList.programDescription;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
   
  }

  exportTable() {
    TableUtil.exportArrayToExcel(this.totalRecList?.projectSummaryList,"workflow-call-list");
  }

  async fetchMemberShipCallWork(eve:any){
    this.searchCriteria.requestMemberShipCallWork.academicYear=this.selectedAcademicYear;
    this.searchCriteria.requestMemberShipCallWork.chapterCode=this.selectedChapterCode;
    this.searchCriteria.requestMemberShipCallWork.assignToMe=eve;
     
     let dataList= await this.membeshipService.fetchMemberShipCallWork(this.searchCriteria);
     this.list = dataList;
     this.totalRecFooter =dataList;
    this.totalRecList = dataList;

    this.dataSource = new MatTableDataSource<any>(dataList.projectSummaryList);
    // this.dataSource.paginator= this.paginator;
    this.dataSource.sort = this.sort;
     //this.sort.sort(({ id: 'primaryName', start: 'asc'}) as MatSortable);
    // this.dataSource.paginator.length = this.totalRecCount.totalProjectSummary;
    this.dataSource._updateChangeSubscription();
  }

  async handlePageEvent(event:any){
    console.log(JSON.stringify(event,null,4));
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
  
    let previousIndex = event.previousPageIndex;
  
    let previousSize = pageSize * pageIndex;
    this.searchCriteria.requestPageModel.page=pageIndex;
    this.searchCriteria.requestPageModel.size=pageSize;
    await this.fetchMemberShipCallWork('');
   }
 
   row_active:any={};
  async showCallDetails(callWork:any, ind:any){
    this.row_active={
      [ind]:true
    }
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

  this.activeOrder={[index]:true};
  this.dataSource.data = this.list.projectSummaryList.filter((item:any) => (item.lastName).toLowerCase().startsWith((letter).toLowerCase()));
  this.totalRecFooter = {totalProjectSummary:this.dataSource.data.length};
  this.dataSource.sort = this.sort;


}

refreshList(){
  this.fetchMemberShipCallWork('');
  this.activeOrder={};
}

async sendBulkEmail(){
  let bulkEmailParam:any={
    requestFamilyIdChaperCodeAndProgramCodeList:[]
  };
  console.log(this.totalRecList.projectSummaryList)
 for(var i=0; i <this.totalRecList.projectSummaryList.length; i++){
  let param:any= {
    familyID: this.totalRecList.projectSummaryList[i].familyId,
    chapterID: this.totalRecList.projectSummaryList[i].chapterID,
    programCode: this.totalRecList.projectSummaryList[i].programCode,
    signupCode: "",
    modifiedBy: 0
  }
  bulkEmailParam.requestFamilyIdChaperCodeAndProgramCodeList.push(param);
 }
   await this.membeshipService.sendEmail(bulkEmailParam);
}

}
