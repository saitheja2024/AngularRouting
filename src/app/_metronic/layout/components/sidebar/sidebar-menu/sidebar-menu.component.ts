import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth';
import { ProgramRequestInterface } from 'src/app/modules/chinmaya-shared/services/master/master-interface';
import { MasterService } from 'src/app/modules/chinmaya-shared/services/master/master.service';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';
import Swal from 'sweetalert2'
import * as moment from 'moment';

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
  chapterCode:any;
  academicYearCode:any;
  constructor(private masterService:MasterService,
    private store:StoreService,
    private router:Router,
    private authService:AuthService) { }

  async ngOnInit() {
    let currentYear = moment(new Date()).format('YYYY');
    let featureYear:any = moment(new Date()).format('YYYY');
    featureYear = parseInt(featureYear)+1;
     this.academicYearCode = currentYear+'-'+ featureYear;
    this.loggedInUser = JSON.parse(sessionStorage.getItem('profileData') || '');
    this.academicYear = await  this.masterService.fetchAcademicYear(true);
    this.chapterList = await this.masterService.fetchChaptherList({username:this.loggedInUser.username},true);
    this.chapterCode = (this.loggedInUser.chapterCode!=undefined)? this.loggedInUser.chapterCode:this.loggedInUser.chapter;
    this.store.setValue(KEYS.chapter,this.chapterCode);
    this.chapterDesc(this.chapterCode);
    await this.fetchProgramsByAcademicYearAndChapterCode();
  }

  async chapterDesc(code:any){
    let chapDesc = this.chapterList.filter((item:any)=>{
      if(item.code==code){
       return item;
      }
    });
    let chapterKey = KEYS.chapterDesc;
    this.chapterCode = chapDesc[0].code;
    this.store.setValue(chapterKey,chapDesc);
  }

  async onAcademicYerChange(ev:any){
      this.selectedYear=ev.target.value;
      this.academicYearCode = ev.target.value;
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
    if(!this.chapterCode || !this.academicYearCode){
      return ;
    }

    let params:ProgramRequestInterface={
      chapterCode:this.chapterCode,
      academicYear:this.academicYearCode,
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
    if(this.chapterCode =='' && this.academicYearCode==''){
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
