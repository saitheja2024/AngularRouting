import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export const KEYS={
  chapter:"chapter",
  program:"program",
  academicYear:"academicYear",
  loggedInUser:"loggedInUser"
}

@Injectable({
  providedIn: 'root'
})
export class StoreService{

  private store:any={};
  private storeSubject$: Subject<any> = new Subject();
  private programSubject$: Subject<any> = new Subject();
  private loggedInUserSubject$ : Subject<any> = new Subject();


  constructor() { }

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
