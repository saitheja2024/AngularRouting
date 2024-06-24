import { Component } from '@angular/core';
import {KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';

@Component({
  selector: 'app-email-home',
  templateUrl: './email-home.component.html',
  styleUrls: ['./email-home.component.scss']
})
export class EmailHomeComponent {
  selectedProgram: any;
  selectedChapter: any;

  constructor(private store:StoreService){
    
    this.store.onProgramUpdate().subscribe((program:any)=>{
      this.selectedProgram=program;
    });

  }

  ngOnInit(){
    
     let chapter = this.store.getValue(KEYS.chapterDesc);
     this.selectedChapter=chapter[0].description;
  } 

}
