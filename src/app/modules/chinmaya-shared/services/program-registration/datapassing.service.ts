import { Observable, Subject } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable()

export class DatapasstoComponent{

    private messageData$: Subject<any> = new Subject();
    private reviewScreenUpdate$: Subject<any> = new Subject();

    storedData:any;
    reviewStoredData:any;
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

      reviewInvokeMessage(msg: any) {
        this.reviewStoredData=msg;
        this.reviewScreenUpdate$.next(this.reviewStoredData);
    }

    getReviewStoreValue(){
        return this.reviewStoredData;
    }

      public onReviewUpdate(): Observable<any> {
        return this.reviewScreenUpdate$.asObservable();
      }

  }