import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccessAlert(message:any){
    let config:any = {duration:3000,horizontalPosition:"center",verticalPosition:"top"}
    let action;
    this.snackBar.open(message,action,config)
  }

  showErrorALert(message:any){
    let config:any = {duration:3000,horizontalPosition:"center",verticalPosition:"top",panelClass:"errorMessageClass"}
    let action;
    this.snackBar.open(message,action,config)
  }
}
