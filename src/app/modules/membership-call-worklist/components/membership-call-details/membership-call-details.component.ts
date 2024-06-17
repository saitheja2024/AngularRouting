import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-membership-call-details',
  templateUrl: './membership-call-details.component.html',
  styleUrls: ['./membership-call-details.component.scss']
})
export class MembershipCallDetailsComponent {


  @Input() callWorkDetails:any

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
