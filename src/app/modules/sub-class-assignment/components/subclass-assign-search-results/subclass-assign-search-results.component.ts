import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

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

  constructor(private router:Router){}

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
