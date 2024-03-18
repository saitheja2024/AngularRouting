import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export const KEYS={
  chapter:"chapter",
  program:"program",
  academicYear:"academicYear"
}

@Injectable({
  providedIn: 'root'
})
export class StoreService{

  private store:any={};
  private storeSubject$: Subject<any> = new Subject();
  private programSubject$: Subject<any> = new Subject();


  constructor() { }

  setValue(key: string, obj: any) {
    this.store[key] = obj;
    console.log("###########   Current Store values ##################");
    console.log(JSON.stringify(this.store,null,4));
    if(key==KEYS.program){
      this.programSubject$.next(obj);
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



}
