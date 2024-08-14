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

  

  displayedColumnscata: string[] = ['session', 'classCode', 'subClassCode', 'groupEmailId'];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginatorModule) paginatormodule: MatPaginatorModule
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedProgram: any;
  selectedAcademicYear: any;
  selectedChapterCode: any;
  loggedInUser: any;
  list: any;

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
      await this.populateData()
    });

    this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.selectedProgram = this.store.getValue(KEYS.program);
    this.loggedInUser = this.adminRegistrationService.getLoggedInUser();
    await this.populateData();

  }

  async populateData(){
   
// http://localhost:8080/adminRegistration/fetchEnrolledClassesList?programCode=CS_BALAVIHAR_2024-25&signupCode=2024-25_BALA_VIHAR_CLASS

    let params = {
      programCode:this.selectedProgram.code,
      signupCode:"2024-25_BALA_VIHAR_CLASS",
      "page": 0,
      "size": 50,
      "sortFieldName": "",
      "sortOrder": ""
    }


    let results:any = await this.adminRegistrationService.fetchEnrolledClassesList(params);
    //this.totalRecCount = results.totalProjectSummary;
    this.dataSource = new MatTableDataSource<any>(results.projectSummaryList);
    
    this.paginationConfig.length=results.totalProjectSummary;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource._updateChangeSubscription();
    
  }

  handlePageEvent(event:any){
    console.log(JSON.stringify(event,null,4));
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;  
    let previousIndex = event.previousPageIndex;
    let previousSize = pageSize * pageIndex;
    // this.searchCriteria.requestPageModel.page=pageIndex;
    // this.searchCriteria.requestPageModel.size=pageSize;
    // this.performSearch();
   
   }

 

  ViewProfiles(){
    this.router.navigateByUrl("/program-configuration/classes-and-teacher-assignments/teacher-assignment-details")
   }


}
