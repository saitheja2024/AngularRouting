import { Component } from '@angular/core';
import { StoreService, KEYS } from 'src/app/modules/chinmaya-shared/services/store/store.service';
import { RegistratioReviewService } from 'src/app/modules/chinmaya-shared/services/registration-review/registration-review.service';
@Component({
  selector: 'app-status-search-home',
  templateUrl: './status-search-home.component.html',
  styleUrls: ['./status-search-home.component.scss']
})

export class StatusSearchHomeComponent {
  
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
