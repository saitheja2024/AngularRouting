import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';
import { MasterService } from '../master/master.service';
import { AuthService } from 'src/app/modules/auth';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  
  chapterList: any;
  loggedInUser: any;
  primaryContactDetails$: Subject<any> = new Subject()

  constructor(private httpService:HttpService,private urlService:UrlService,
    private masterService:MasterService,
    private autService:AuthService, private http:HttpClient) { }


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

  async fetchProgramConfigurationFields(body: any) {
    let options: Options = { body: body, url: this.urlService.classRegistration.ProgramConfigurationFields };
    let response = await this.httpService.post(options);
    return response;
  }

  async saveProgramConfigurationFields(body: any) {

    let options: Options = { body: body, url: this.urlService.classRegistration.ProgramConfigurationFields };
     let dataResponse = await this.httpService.post(options);
     return dataResponse;
  }

  async reviewAndUpdateWaitListedStatus(body: any) {
    let options: Options = { body: body, url: 'programSelection/reviewAndUpdateWaitListedStatus' };
    let dataRes =  await this.httpService.post(options);
    return dataRes;
  }

  uploadImages(file:any, queryparam:any) {
    // Create form data
    const formData = new FormData();
    let params ='?documentID='+queryparam.documentID+'&personID='+queryparam.personID+'&documentTypeCode=Person&tabName=Person';
    // Store form name as "file" with file data
    formData.append('file', file, file.name);
    let options:Options={
      body:formData,
      url:"/file/uploadFile"+params
    }

    // Make http post request over api
    // with formData as req
    return this.httpService.post(options);
  }

  downloadImage(queryParam: string) {
    return new Promise((resolve,reject)=>{
    const headers = new HttpHeaders().set('Accept', '*/*');
    this.http.get<Blob>(`${environment.baseURL}/file/downloadFile`+queryParam,{
      headers: headers,
      responseType: 'blob' as 'json'
    }).subscribe(response=>{
      resolve(response);
    });

  })
  }

  fetchPersonProgramRegistrationsByWaitListed(body: any) {
    let options: Options = { body: body, url: this.urlService.review.fetchPersonProgramRegistrationsByWaitListed };
    return this.http.post(environment.baseURL + options.url, options.body)
  }

  fetchProgramPledgeReview(body: any) {
    let options: Options = { body: body, url: this.urlService.review.fetchProgramPledgeReview };
    return this.http.post(environment.baseURL + options.url, options.body)
  }

  onPrimaryContactDetailsChange(): Observable<any> {
    return this.primaryContactDetails$.asObservable();
  }

  getPrimaryContact(body: any) {

    let options: Options = { body: body, url: this.urlService.review.fetchPrimaryContactByFamilyId };
    return new Promise(async (resolve, reject) => {
      let response = await this.httpService.post(options);
      this.primaryContactDetails$.next(response);
      resolve(response);
    })

  }
}
