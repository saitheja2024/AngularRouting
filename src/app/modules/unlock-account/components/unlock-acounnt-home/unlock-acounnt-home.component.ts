import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { map } from 'rxjs-compat/operator/map';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-unlock-acounnt-home',
  templateUrl: './unlock-acounnt-home.component.html',
  styleUrls: ['./unlock-acounnt-home.component.scss']
})
export class UnlockAcounntHomeComponent {

  unlockAccForm:FormGroup;
  unlockResponseList:any;

  constructor(private authService:AuthenticationService, private fb:FormBuilder){
    this.unlockAccForm = this.fb.group({
      familyId:new FormControl(''),
      homePhone:new FormControl('') ,
      firstName:new FormControl('') ,
      lastName:new FormControl('') ,
      emailAddress:new FormControl('')
    }); 
  }

  searchFilter(){
    let srcParam:any = this.unlockAccForm.value;
    this.authService.searchUnlockAccount(srcParam).subscribe(response => {
      this.unlockResponseList = response;
    },(err : HttpErrorResponse)=>{
      var msg = err.error;    
      Swal.fire({
        // position: 'top-end',
         icon: 'error',
         title: msg.message,
         showConfirmButton: true,
         //timer: 1500
       });    
    });
    
  }

  unlockAccount(personId:any){
    let param={
      personId:personId
    }
    this.authService.unlockAccount(param).subscribe(response => {
      this.unlockResponseList = response;
      Swal.fire({
        // position: 'top-end',
         icon: 'success',
         title: response.message,
         showConfirmButton: true,
         //timer: 1500
       });
    },(err : HttpErrorResponse)=>{
      var msg = err.error;  
      Swal.fire({
        // position: 'top-end',
         icon: 'error',
         title: msg.message,
         showConfirmButton: true,
         //timer: 1500
       });    
    });
  }


}
