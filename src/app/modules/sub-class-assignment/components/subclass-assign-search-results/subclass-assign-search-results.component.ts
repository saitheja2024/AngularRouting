import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistratioReviewService } from 'src/app/modules/chinmaya-shared/services/registration-review/registration-review.service';

@Component({
  selector: 'app-subclass-assign-search-results',
  templateUrl: './subclass-assign-search-results.component.html',
  styleUrls: ['./subclass-assign-search-results.component.scss']
})

export class SubclassAssignSearchResultsComponent {
  tabs: { label: string; link: string; index: number; }[];
  StatusSearchResultaTabs:any = [
    { label: 'Selection', path: 'selection' },
    { label: 'Review', path: 'review' },
    { label: 'Complete', path: 'complete' },
  ];
  Object = Object;
  selectedIndex: any=0;
  searchCriteria: any;
  disableTab:boolean=true;
  criteriaLabel:any={
        programCode:'Program Code' ,
        registrationStatusList:'Registration Status',
        paymentStatusList:'Payment Status',
        choiceLabel:'Session Choice',
        choiceCode:'Choice',
        assignedSessionList:'Assigned Session',
        signupCode:'Signup Code',
        className:'Class',
        currentSchoolGrade:'Current School Grade',
        risingSchoolGrade:'Rising School Grade',
        familyID:'Family Id',
        firstName:'First Name',
        lastName:'Last Name',
        homePhone:'Home Phone',
        email:'Email',
        paymentStartDate:'Payment Start Date',
        paymentEndDate:'Payment End Date'
  };
  constructor(private router:Router,
    private activatedRoute: ActivatedRoute,
    private regiStrationReviewService:RegistratioReviewService){}




  ngOnInit(){
    this.searchCriteria = this.regiStrationReviewService.getSearchCriteria();
    console.log(this.searchCriteria);
    this.activatedRoute.url.subscribe(() => {
      let path:any = this.router.url.split('/');
      path = path[path.length-1];
      this.selectedIndex = this.getTabIndex(path);
    });
  }


  getTabIndex(path: string): number {
    switch (path) {
      case 'selection':
        return 0;
      case 'review':
        return 1;
      case 'complete':
        return 2;
      default:
        return 0;
    }
  }

 
  onTabChanged(event: MatTabChangeEvent): void {
    let link=""
    switch (event.index) {
      case 0:
        link='/sub-class-assignment/subclass-assign-search-results/selection';
    break;
      case 1:
        link ="/sub-class-assignment/subclass-assign-search-results/review";
    break;
      case 2:
        link="/sub-class-assignment/subclass-assign-search-results/complete";
    break;
    }

    this.router.navigateByUrl(link);
  }
}
