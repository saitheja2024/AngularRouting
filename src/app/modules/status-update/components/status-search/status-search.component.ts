import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status-search',
  templateUrl: './status-search.component.html',
  styleUrls: ['./status-search.component.scss']
})

export class StatusSearchComponent {

  constructor(
    private router:Router,
    ){
    
  }

  onSearchButtonClick(){
    this.router.navigateByUrl("/status-update/status-search-results")
   }
}
