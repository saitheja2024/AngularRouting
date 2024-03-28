import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-search',
  templateUrl: './email-search.component.html',
  styleUrls: ['./email-search.component.scss']
})
export class EmailSearchComponent {


  constructor(private route:Router){}

  onSearch(){
    this.route.navigateByUrl("email-processing/email-search-results");
  }
}
