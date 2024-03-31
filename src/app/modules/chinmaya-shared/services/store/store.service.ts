import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export const KEYS={
  chapter:"chapter",
  program:"program",
  academicYear:"academicYear",
  loggedInUser:"loggedInUser",
  selectedFamily:"selectedFamily"
}

@Injectable({
  providedIn: 'root'
})
export class StoreService{

  private store:any={};
  private storeSubject$: Subject<any> = new Subject();
  private programSubject$: Subject<any> = new Subject();
  private loggedInUserSubject$ : Subject<any> = new Subject();


  constructor() { 
  
    this.store={
      "academicYear": "2024-2025",
      "chapter": "CMWRC",
      "program": {
          "code": "CMWRC24_25",
          "description": "CMWRC Family Membership 2024-25"
      },
      "selectedFamily": {
        "personID": 15104,
        "familyId": 5226,
        "primaryPersonId": 15104,
        "personType": "ADULT",
        "chapterCode": "CSVA",
        "programCode": "CS_BALAVIHAR_2024-25",
        "signupCode": "ADULT_CLASS",
        "paymentStatus": "NO_DUES",
        "registrationStatus": "PENDING",
        "paymentSubmittedDate": "2024-03-28T08:27:27-04:00",
        "choiceLabel": "Session Choice 1:",
        "choiceCode": "SUN_BVSESSION1",
        "choicePreference": 1,
        "primaryFirstName": "Mohan",
        "primaryLastName": "Su",
        "dateSent": "2024-03-28T12:32:41.344321-04:00"
    },
      "loggedInUser":{
        familyID: "5226",
        personID: "13318",
        firstName: "nmohammefirst",
        username: "nmohamme12345",
        password: "MTIzNDU2"
      }
  }

  }

  setValue(key: string, obj: any) {
    this.store[key] = obj;
    console.log("###########   Current Store values ##################");
    console.log(JSON.stringify(this.store,null,4));
    // If Program's value is updated then
    if(key==KEYS.program){
      this.programSubject$.next(obj);
    }
    if(key==KEYS.loggedInUser){
      this.loggedInUserSubject$.next(obj);
    }
    
    this.storeSubject$.next(this.store);
  }



  getValue(key: string): any {

   
    return this.store[key];
  }




  getStore(){
    return this.store;;
  }

  public onStoreUpdate(): Observable<any> {
    return this.storeSubject$.asObservable();
  }

  public onProgramUpdate(): Observable<any> {
    return this.programSubject$.asObservable();
  }

  public onloggedInUser(): Observable<any> {
    return this.loggedInUserSubject$.asObservable();
  }




}
