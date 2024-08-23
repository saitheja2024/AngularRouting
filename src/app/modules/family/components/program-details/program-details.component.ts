import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/modules/chinmaya-shared/services/alert/alert.service';
import { FamilyService } from 'src/app/modules/chinmaya-shared/services/family/family.service';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.scss']
})
export class ProgramDetailsComponent {

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

  

   displayedColumns: string[] = [
    'personID',
    //'familyId',
    'firstName',
    'lastName',
    'programCode',
    'signupCode',
    'paymentStatus',
    'registrationStatus',
    //'createdDate',
    'amount'
  ];
  

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginatorModule) paginatormodule: MatPaginatorModule
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedProgram: any;
  selectedAcademicYear: any;
  selectedChapterCode: any;
  loggedInUser: any;
  selectedFamily: any;

  constructor(
    private router:Router,
    private store:StoreService,
    private alertService:AlertService,
    private familyService:FamilyService
    ){
    
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  async ngOnInit(){
    

    this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.selectedFamily = this.familyService.getSelectedFamily();

    await this.fetchProgramDetails();

  }


  


  async fetchProgramDetails(){
    
    let params:any = {
      "familyId": this.selectedFamily.familyId,
      "year": this.selectedAcademicYear,
      "chapterCode": this.selectedChapterCode
    }

 

  
    let results:any = await this.familyService.fetchProgramDetails(params);
    this.dataSource = new MatTableDataSource<any>(results.responseProgramDetailsList);
    this.dataSource.sort = this.sort;
    //this.paginationConfig.length=results.totalProjectSummary;
    this.dataSource._updateChangeSubscription();
    
  }

  handlePageEvent(event:any){
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;  
    let previousIndex = event.previousPageIndex;
    let previousSize = pageSize * pageIndex;
    this.requestPageModel.page=pageIndex;
    this.requestPageModel.size=pageSize;
   }


   

}
