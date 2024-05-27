import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth';
import { ProgramRequestInterface } from 'src/app/modules/chinmaya-shared/services/master/master-interface';
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
  loggedInUser: any;
  constructor(private masterService:MasterService,
    private store:StoreService,
    private router:Router,
    private authService:AuthService) { }

  async ngOnInit() {


    this.loggedInUser = this.authService.getLoggedInUser();
    this.academicYear = await  this.masterService.fetchAcademicYear(true);
    this.chapterList = await this.masterService.fetchChaptherList({username:this.loggedInUser.username},true);
   console.log( this.loggedInUser);
  }

  async onAcademicYerChange(ev:any){
      this.selectedYear=ev.target.value;
      this.store.setValue(KEYS.academicYear,this.selectedYear);
      this.router.navigateByUrl("/registration-processing");
      await this.fetchProgramsByAcademicYearAndChapterCode();
  }

  async onChapterChange(ev:any){
    this.selectedChapterCode = ev.target.value;
    this.store.setValue(KEYS.chapter,this.selectedChapterCode);
    this.router.navigateByUrl("/registration-processing");
    await this.fetchProgramsByAcademicYearAndChapterCode();
  }

  async fetchProgramsByAcademicYearAndChapterCode(){
    this.programs=[];
    if(!this.selectedYear || !this.selectedChapterCode){
      return ;
    }

    let params:ProgramRequestInterface={
      chapterCode:this.selectedChapterCode,
      academicYear:this.selectedYear,
      userName:this.loggedInUser.username
    }

    this.programs = await this.masterService.fetchProgramsByAcademicYearAndChapterCode(params)

  }

  subMenuActiveFlag:any;

  async onProgramSelection(program:any,url:any, index:any){

    this.subMenuActiveFlag = {[index]:true};
    let proGram:any = KEYS.program;
    this.store.setValue(proGram,program);
    this.router.navigateByUrl(url);
   
  }

  resetActiveMenu(){
    this.subMenuActiveFlag ={};
  }


  

}
