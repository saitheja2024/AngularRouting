import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/modules/chinmaya-shared/services/master/master.service';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  academicYear: any;
  chapterList: any;
  programs: any;
  selectedChapterCode: any;
  selectedYear: any;

  constructor(private masterService:MasterService,
    private store:StoreService,
    private router:Router) { }

  async ngOnInit() {
    this.academicYear = await  this.masterService.fetchAcademicYear(true);
    this.chapterList = await this.masterService.fetchChaptherList(true);
  }

  async onAcademicYerChange(ev:any){
      this.selectedYear=ev.target.value;
      this.store.setValue(KEYS.academicYear,this.selectedYear);
      await this.fetchProgramsByAcademicYearAndChapterCode();
  }

  async onChapterChange(ev:any){
    this.selectedChapterCode = ev.target.value;
    this.store.setValue(KEYS.chapter,this.selectedChapterCode);
    await this.fetchProgramsByAcademicYearAndChapterCode();
  }

  async fetchProgramsByAcademicYearAndChapterCode(){
    this.programs=[];
    if(!this.selectedYear || !this.selectedChapterCode){
      return ;
    }
    this.programs = await this.masterService.fetchProgramsByAcademicYearAndChapterCode(this.selectedYear,this.selectedChapterCode)

  }

  async onProgramSelection(program:any){
    this.store.setValue(KEYS.program,program);
    this.router.navigateByUrl("/registration-processing");

  }
  

}
