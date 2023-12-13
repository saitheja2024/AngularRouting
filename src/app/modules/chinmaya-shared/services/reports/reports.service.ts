import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  
  programYears: any;

  constructor(private httpService:HttpService,private urlService:UrlService) { }

  async fetchProgramYears(programCode:any,reload?:any){
      let options:Options={
        url: this.urlService.reportsURL.fetchProgramYears,
        body: {code:programCode}
      }

      if(!reload && this.programYears){
        return this.programYears;
      }

      this.programYears=[];
      let programYears:any = await this.httpService.post(options);
      if(programYears && programYears.selectDropdownList){
        this.programYears=programYears.selectDropdownList;
        
      }
      return this.programYears;
  }

  

  
}
