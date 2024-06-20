import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subclass-assign-search',
  templateUrl: './subclass-assign-search.component.html',
  styleUrls: ['./subclass-assign-search.component.scss']
})

export class SubclassAssignSearchComponent {

  constructor(
    private router:Router,
    ){
    
  }

  onSearchButtonClick(){
    this.router.navigateByUrl("/sub-class-assignment/subclass-assign-search-results")
   }
}
