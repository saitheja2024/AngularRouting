import { Observable, Subject } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable()

export class DatapasstoComponent{

    private messageData$: Subject<any> = new Subject();
    storedData:any;
    invokeMessage(msg: any) {
        this.storedData=msg;
        this.messageData$.next(this.storedData);
    }

    getStoreValue(){
        return this.storedData;
    }

    public onMessageUpdate(): Observable<any> {
        return this.messageData$.asObservable();
      }
  }