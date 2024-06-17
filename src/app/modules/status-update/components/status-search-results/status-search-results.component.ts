import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status-search-results',
  templateUrl: './status-search-results.component.html',
  styleUrls: ['./status-search-results.component.scss']
})

export class StatusSearchResultsComponent {
  tabs: { label: string; link: string; index: number; }[];

  constructor(private router:Router){}

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
