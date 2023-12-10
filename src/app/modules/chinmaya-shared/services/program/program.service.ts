import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  
  chapterList: any;

  constructor(private httpService:HttpService,private urlService:UrlService) { }

  async fetchChapterList(reload?:any){
      let options:Options={
        url: this.urlService.organzationURL.fetchAllOrgnaztion,
        body: null
      }

      if(!reload && this.chapterList){
        return this.chapterList;
      }

      this.chapterList=[];
      let chapterList:any = await this.httpService.get(options);
      if(chapterList && chapterList.selectDropdownList){
        this.chapterList=chapterList.selectDropdownList;
        
      }
      return this.chapterList;
  }

  async fetchAllPrograms(orgCode: any) {
    let options:Options={
      url: this.urlService.registrationURL.fetchAllPrograms,
      body: {code:orgCode}
    }

    

    let allPrograms:any = await this.httpService.post(options);

    if(allPrograms && allPrograms.selectDropdownList){
    return allPrograms.selectDropdownList;
    }

    return [];
  }

  
}
