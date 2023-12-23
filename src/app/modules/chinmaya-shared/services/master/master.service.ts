import { Injectable } from '@angular/core';
import { HttpService } from '../https-service/http-service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private httpService: HttpService) { }

  getPersonType() {
    //return this.http.get<any>(`${environment.baseURL}master/fetchPersonTypeList`);
  }

}
