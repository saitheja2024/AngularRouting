import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth';
import { ProgramRequestInterface } from 'src/app/modules/chinmaya-shared/services/master/master-interface';
import { MasterService } from 'src/app/modules/chinmaya-shared/services/master/master.service';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  academicYear: any;
  chapterList: any;
  programs: any;
  selectedChapterCode: any='';
  selectedYear: any='';
  loggedInUser: any;
  constructor(private masterService:MasterService,
    private store:StoreService,
    private router:Router,
    private authService:AuthService) { }

  async ngOnInit() {


    this.loggedInUser = this.authService.getLoggedInUser();
    this.academicYear = await  this.masterService.fetchAcademicYear(true);
    this.chapterList = await this.masterService.fetchChaptherList({username:this.loggedInUser.username},true);
  }

  async chapterDesc(code:any){
    let chapDesc = this.chapterList.filter((item:any)=>{
      if(item.code==code){
       return item;
      }
    });
    let chapterKey = KEYS.chapterDesc;
    this.store.setValue(chapterKey,chapDesc);
  }

  async onAcademicYerChange(ev:any){
      this.selectedYear=ev.target.value;
      this.store.setValue(KEYS.academicYear,this.selectedYear);
      this.router.navigateByUrl("/registration-processing");
      await this.fetchProgramsByAcademicYearAndChapterCode();
  }

  async onChapterChange(ev:any){
    this.selectedChapterCode = ev.target.value;
    let chapter = KEYS.chapter;
    this.store.setValue(chapter,this.selectedChapterCode);
    if(sessionStorage.getItem('userCred')!=null){
    let cred = JSON.parse(sessionStorage.getItem('userCred') || '');
    const user = await this.authService.login(cred);
    }
    this.chapterDesc(ev.target.value);
    this.router.navigateByUrl("/registration-processing");
    await this.fetchProgramsByAcademicYearAndChapterCode();
  }

  async fetchProgramsByAcademicYearAndChapterCode(){
    this.loggedInUser = this.authService.getLoggedInUser();
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

  resetActiveMenu(eve:any){
    this.subMenuActiveFlag ={};
    if(this.selectedYear =='' && this.selectedChapterCode==''){
      Swal.fire({
        // position: 'top-end',
         icon: 'warning',
         title: 'Please Select Academic Year and Chapter.',
         showConfirmButton: true,
         //timer: 1500
       });
    }else{
      this.router.navigateByUrl("/"+eve);
    }
  }


  

}
