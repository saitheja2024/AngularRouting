import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(){}

  handleError(error: HttpErrorResponse) {
    let errorMessage ="Unknow error";
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      errorMessage=error.error.message;
      

    } else if(error?.error?.message){
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(JSON.stringify(error.error,null,4));
      errorMessage=error?.error?.message
    }

   
    alert(errorMessage);


   
    //this.toast.error(errorMessage,"Error");

    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  };
}