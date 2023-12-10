import { Component } from '@angular/core';

@Component({
  selector: 'app-review-configuration',
  templateUrl: './review-configuration.component.html',
  styleUrls: ['./review-configuration.component.scss']
})
export class ReviewConfigurationComponent {

  menuAccordionFlag:any={
  Category_1:false,
  Category_2:false,
  Category_3:false,
  Category_4:false
  }
  accordionMenu(id:any){
    this.menuAccordionFlag[id]= !this.menuAccordionFlag[id];
  }
}
