import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerVisible = new BehaviorSubject<boolean>(false);

  get isVisible() {
    return this.spinnerVisible.asObservable();
  }

  show() {
    this.spinnerVisible.next(true); 
  }

  hide() {
    this.spinnerVisible.next(false);
  }
}