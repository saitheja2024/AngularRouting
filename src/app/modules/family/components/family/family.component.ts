import { Component } from '@angular/core';
import { StoreService, KEYS } from 'src/app/modules/chinmaya-shared/services/store/store.service';
import { FamilyService } from 'src/app/modules/chinmaya-shared/services/family/family.service';
@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent {
  selectedChapterCode:any;
  selectedChapter:any;
  selectedProgram:any;
  constructor(private store:StoreService, private familyService:FamilyService){}

  async ngOnInit(){
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    let chapter = this.store.getValue(KEYS.chapterDesc);
    this.selectedChapter=chapter[0].description;
    await  this.programDesc();
  }

  async programDesc(){
    let param = {
      "code": this.selectedChapterCode
    };
    let dataList= await this.familyService.getProgramDesc(param);
    this.selectedProgram = dataList.programDescription;
  }

}
