import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';
import { MasterService } from '../master/master.service';
import { AuthService } from 'src/app/modules/auth';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  
  chapterList: any;
  loggedInUser: any;

  constructor(private httpService:HttpService,private urlService:UrlService,
    private masterService:MasterService,
    private autService:AuthService) { }


    ngOnInit(){
      this.loggedInUser = this.autService.getLoggedInUser()
    }

  async fetchChapterList(reload?:any){
     let chapterList=await this.masterService.fetchChaptherList({username:this.loggedInUser.username});
     return chapterList;
  }

  async fetchAllPrograms(orgCode: any) {
    let options:Options={
      url: this.urlService.registrationProcessingURL.fetchAllPrograms,
      body: {code:orgCode}
    }

    

    let allPrograms:any = await this.httpService.post(options);

    if(allPrograms && allPrograms.selectDropdownList){
    return allPrograms.selectDropdownList;
    }

    return [];
  }

  
}
