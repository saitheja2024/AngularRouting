import { Component } from '@angular/core';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';

@Component({
  selector: 'app-registration-processing-home',
  templateUrl: './registration-processing-home.component.html',
  styleUrls: ['./registration-processing-home.component.scss']
})
export class RegistrationProcessingHomeComponent {
  selectedProgram: any;
  selectedChapter: any;


  constructor(private store:StoreService){
    this.store.onProgramUpdate().subscribe((program:any)=>{
      this.selectedProgram=program;
    });

        this.store.onChapterDescUpdate().subscribe((chapter:any)=>{
      this.selectedChapter=chapter[0].description;
    });

  }

  ngOnInit(){
    
    let chapter = this.store.getValue(KEYS.chapterDesc);
    this.selectedChapter=chapter[0].description;

    // this.store.onChapterDescUpdate().subscribe((chapter:any)=>{
    //   this.selectedChapter=chapter[0].description;
    // });

    // let chapter = this.store.getValue(KEYS.chapterDesc);
    // this.selectedChapter=chapter[0].description;
  } 
}
