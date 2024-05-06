import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class RouteChangeCall {
    private subject = new Subject<any>();
 
    sendData(message: object) {
        this.subject.next(message);
    }
 
    clearData() {
        this.subject.next('');
    }
 
    getData(): Observable<any> {
        return this.subject.asObservable();
    }
}