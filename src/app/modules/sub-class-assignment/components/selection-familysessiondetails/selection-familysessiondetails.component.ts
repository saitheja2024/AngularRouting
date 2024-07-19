import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/modules/auth';
import { RegistratioReviewService } from 'src/app/modules/chinmaya-shared/services/registration-review/registration-review.service';
export interface FamilySessionDetails {
  familyid: number;
  personid: number;
  signupcode: string;
  choice1: string;
  choice2: string;
  choice3: string;
}

@Component({
  selector: 'app-selection-familysessiondetails',
  templateUrl: './selection-familysessiondetails.component.html',
  styleUrls: ['./selection-familysessiondetails.component.scss']
})

export class SelectionFamilysessiondetailsComponent {
  [x: string]: any;
  @Input() selectedRowData: any;
  FamilySessionDetails: FamilySessionDetails[] = [
    {familyid:4367, personid:13636, signupcode: 'Adult Class & Bala Vihar Session Preference', choice1: 'NA', choice2: 'Sunday 2 (12:15-1:50 PM)', choice3: 'Sunday 1 (9:15-10:50 AM)'}
  ];
  currentLoginUserData:any;
  displayedColumnsFamilySessionDetails: string[] = ['familyId', 'personId', 'signUpCode'];
  ColumnNameList:any={
    familyId:'Family ID',
    personId:'Person ID',
    signUpCode:'Signup Code'
  }
  dataSourceFamilySessionDetails:any;
  dataSource = new MatTableDataSource<any>();

  // ngAfterViewInit() {
  //   console.log(this.selectedRowData);
  //   this.dataSourceFamilySessionDetails=new MatTableDataSource(this.FamilySessionDetails);

  //   this.dataSourceFamilySessionDetails.sort = this.sort;
  // }

  constructor(private regiStrationReviewService: RegistratioReviewService, private authService:AuthService){
  
  }
  
  ngOnInit(){
    this.currentLoginUserData = this.authService.getLoggedInUser();
    
    this.familyRegSessionViewDetails();
  }

  joinSessionData(data:any){
    for(var i=0; i<data.responseSessionPreferenceList.length; i++){
      data.responseSessionPreferenceList[i].choiceDtoList.filter((item:any,key:any) =>{
        let choice = 'choice'+(key+1);
        this.displayedColumnsFamilySessionDetails.push(choice);
        //data.responseSessionPreferenceList[i][choice]={};
        data.responseSessionPreferenceList[i][choice]=item.description
       });
    }
  
   console.log(data);
   console.log(this.displayedColumnsFamilySessionDetails);
   return data;
  }
  async familyRegSessionViewDetails(){
    let param={
      "familyID": this.selectedRowData.familyId,
      "chapterID": this.selectedRowData.chapterCode,
      "programCode": this.selectedRowData.programCode,
      "modifiedBy": parseInt(this.currentLoginUserData.personID)
    };

      let results  = await this.regiStrationReviewService.fetchFamilySessionPreferenceDetais(param);
      console.log(results.responseSessionPreferenceList);
      this.joinSessionData(results);
      this.dataSourceFamilySessionDetails=results.responseSessionPreferenceList;
      this.responseData = results.responseSessionPreferenceList.length;
      //this.displayedColumnsFamilySessionDetails = [];
      //this.displayedColumnsFamilySessionDetails = this.displayedColumnsFamilySessionDetails;
    //  this.dataSourceFamilyDetails._updateChangeSubscription();

  }
}
