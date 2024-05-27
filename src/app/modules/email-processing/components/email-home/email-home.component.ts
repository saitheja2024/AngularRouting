import { Component } from '@angular/core';
import { StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';

@Component({
  selector: 'app-email-home',
  templateUrl: './email-home.component.html',
  styleUrls: ['./email-home.component.scss']
})
export class EmailHomeComponent {
  selectedProgram: any;
  selectedChapter: any;

  constructor(private store:StoreService){

  }

  ngOnInit(){
    this.infoInit();
  } 

  infoInit(){
    this.store.onProgramUpdate().subscribe((program:any)=>{
      this.selectedProgram=program;
    });

    this.store.onChapterUpdate().subscribe((chapter:any)=>{
      this.selectedChapter=chapter;
    });
  }
}
