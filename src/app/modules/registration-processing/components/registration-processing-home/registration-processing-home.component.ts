import { Component } from '@angular/core';
import { StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';

@Component({
  selector: 'app-registration-processing-home',
  templateUrl: './registration-processing-home.component.html',
  styleUrls: ['./registration-processing-home.component.scss']
})
export class RegistrationProcessingHomeComponent {
  selectedProgram: any;
  selectedChapter: any;


  constructor(private store:StoreService){

  }

  ngOnInit(){
    this.store.onProgramUpdate().subscribe((program:any)=>{
      this.selectedProgram=program;
    });

    this.store.onChapterUpdate().subscribe((chapter:any)=>{
      this.selectedChapter=chapter;
    });
  } 
}
