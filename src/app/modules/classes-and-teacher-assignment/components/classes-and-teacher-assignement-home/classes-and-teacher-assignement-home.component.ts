import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminregistrationServices } from 'src/app/modules/chinmaya-shared/services/admin-registration/admin-registration.service';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';


export interface cata {
  session: string;
  classname: string;
  subclass: string;
  classemaildistributionlist: string;
}

@Component({
  selector: 'app-classes-and-teacher-assignement-home',
  templateUrl: './classes-and-teacher-assignement-home.component.html',
  styleUrls: ['./classes-and-teacher-assignement-home.component.scss']
})
export class ClassesAndTeacherAssignementHomeComponent {


  paginationConfig={
    pageSize : 10,
    pageIndex : 0,
    pageSizeOptions :[10,30, 50,150,200,300,350,450],
    showFirstLastButtons : true,
    length:10
  }

  requestPageModel={
    page: 0,
    size: 10,
    sortFieldName: '',
    sortOrder:''
  }

  

  displayedColumns: string[] = ['session', 'classCode', 'subClassCode', 'groupEmailId'];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginatorModule) paginatormodule: MatPaginatorModule
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedProgram: any;
  selectedAcademicYear: any;
  selectedChapterCode: any;
  loggedInUser: any;
  list: any;
  signupCodes: any;
  selectedCodeIndex: any;
  selectedSignupCode: any;
  enrolledClassesList: any=[];

  constructor(
    private router:Router,
    private store:StoreService,
    private adminRegistrationService:AdminregistrationServices
    ){
    
  }

  ngAfterViewInit() {
    

    //this.dataSourcecata.paginator = this.paginator;

    this.dataSource.sort = this.sort;
  }

  async ngOnInit(){
    this.store.onProgramUpdate().subscribe(async (program:any)=>{
      this.selectedProgram=program;
      await this.fetchSignupCodes();
      await this.populateData()
     
    });

    this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.selectedProgram = this.store.getValue(KEYS.program);
    this.loggedInUser = this.adminRegistrationService.getLoggedInUser();
    await this.fetchSignupCodes();

  }


  async fetchSignupCodes(){
    
    let param:any = {
       organizationCode:this.selectedChapterCode,
       programCode:this.selectedProgram.code,
      userName:this.loggedInUser.username
    }

    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.signupCodes = await this.adminRegistrationService.fetchSignupCodes(param);
  }

  async onSignupCodeButtonClick(index: number,signupCode:any) {
    this.selectedCodeIndex = index;
    this.selectedSignupCode = signupCode;
    await this.populateData();
  }

  async populateData(){
    let params = {
       requestPageModel:this.requestPageModel,
        requestProgramCodeAndSignupCode:{
           programCode:this.selectedProgram.code,
           signupCode:this.selectedSignupCode.code,
        }
      
    }
    let results:any = await this.adminRegistrationService.fetchEnrolledClassesList(params);
    this.enrolledClassesList=results.projectSummaryList;
    this.dataSource = new MatTableDataSource<any>(results.projectSummaryList);
    this.paginationConfig.length=results.totalProjectSummary;
    this.dataSource._updateChangeSubscription();
    
  }

  handlePageEvent(event:any){
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;  
    let previousIndex = event.previousPageIndex;
    let previousSize = pageSize * pageIndex;
    this.requestPageModel.page=pageIndex;
    this.requestPageModel.size=pageSize;
    this.populateData();
   
   }


   async onRefreshDistroButtonClick(){
     let params = {
       "chapterId": this.selectedChapterCode,
       "enrolledClassesList": this.enrolledClassesList
     }

     await this.adminRegistrationService.refreshEmailDistributionList(params);
     this.populateData();


   }

 

  ViewProfiles(){
    this.router.navigateByUrl("/program-configuration/classes-and-teacher-assignments/teacher-assignment-details")
   }


}
