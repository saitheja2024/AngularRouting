import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistratioReviewService } from 'src/app/modules/chinmaya-shared/services/registration-review/registration-review.service';

@Component({
  selector: 'app-status-search-results',
  templateUrl: './status-search-results.component.html',
  styleUrls: ['./status-search-results.component.scss'],
})

export class StatusSearchResultsComponent {
  tabs: { label: string; link: string; index: number; }[];
  StatusSearchResultaTabs:any = [
    { label: 'Selection', path: 'selection' },
    { label: 'Review', path: 'review' },
    { label: 'Complete', path: 'complete' },
  ];
  selectedIndex: any=0;
  searchCriteria: any;

  constructor(private router:Router,
    private activatedRoute: ActivatedRoute,
    private regiStrationReviewService:RegistratioReviewService){}




  ngOnInit(){
    this.searchCriteria = this.regiStrationReviewService.getSearchCriteria();
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
        link='/status-update/status-search-results/selection';
    break;
      case 1:
        link ="/status-update/status-search-results/review";
    break;
      case 2:
        link="/status-update/status-search-results/complete";
    break;
    }

    this.router.navigateByUrl(link);
  }
}
