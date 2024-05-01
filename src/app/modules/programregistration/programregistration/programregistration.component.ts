import { Component } from '@angular/core';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';

@Component({
  selector: 'app-programregistration',
  templateUrl: './programregistration.component.html',
  styleUrls: ['./programregistration.component.scss']
})
export class ProgramregistrationComponent {
  selectedProgram:any;
  selectedChapter:any;
  constructor(private store:StoreService){

  }

  ngOnInit(){
    
    this.store.onProgramUpdate().subscribe((program:any)=>{
      this.selectedProgram=program;
    });

    this.store.onChapterUpdate().subscribe((chapter:any)=>{
      this.selectedChapter=chapter;
    });

   // this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    //this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.selectedProgram = this.store.getValue(KEYS.program);  }
}
