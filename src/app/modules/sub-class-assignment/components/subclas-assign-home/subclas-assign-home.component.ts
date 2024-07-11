import { Component } from '@angular/core';
import { RegistratioReviewService } from 'src/app/modules/chinmaya-shared/services/registration-review/registration-review.service';
import { StoreService, KEYS } from 'src/app/modules/chinmaya-shared/services/store/store.service';
@Component({
  selector: 'app-subclas-assign-home',
  templateUrl: './subclas-assign-home.component.html',
  styleUrls: ['./subclas-assign-home.component.scss']
})
export class SubclasAssignHomeComponent {
  selectedChapter:any;
  selectedProgram:any;
  constructor(private store:StoreService, private registrationReviewService:RegistratioReviewService){
    
  }

  ngOnInit(){
    this.registrationReviewService.programSel.subscribe(program => this.selectedProgram = program);
    let chapter = this.store.getValue(KEYS.chapterDesc);
     this.selectedChapter=chapter[0].description;
  }
}


