import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService, Options } from '../https-service/http-service';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  chapterList: any;

  constructor(private httpService:HttpService) { }

  async fetchChapterList(reload?:any){
      let options:Options={
        url: "organization/fetchChaptersList",
        body: null
      }

      if(!reload && this.chapterList){
        return this.chapterList;
      }

      this.chapterList = await this.httpService.get(options);
      return this.chapterList;
  }

  
}
