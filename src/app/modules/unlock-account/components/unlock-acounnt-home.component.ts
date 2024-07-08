import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { map } from 'rxjs-compat/operator/map';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UnlockaccountService } from 'src/app/modules/chinmaya-shared/services/unlock-account/unlockaccount.service';
@Component({
  selector: 'app-unlock-acounnt-home',
  templateUrl: './unlock-acounnt-home.component.html',
  styleUrls: ['./unlock-acounnt-home.component.scss']
})
export class UnlockAcounntHomeComponent {

  unlockAccForm:FormGroup;
  unlockResponseList:any='';

  constructor(private authService:AuthenticationService, private fb:FormBuilder, private unlockService:UnlockaccountService){
    this.unlockAccForm = this.fb.group({
      familyId:new FormControl(''),
      homePhone:new FormControl('') ,
      firstName:new FormControl('') ,
      lastName:new FormControl('') ,
      emailAddress:new FormControl('')
    }); 
  }

 async searchFilter(){
    let srcParam:any = this.unlockAccForm.value;
    if(srcParam.familyId!='' || srcParam.homePhone!='' || srcParam.firstName!='' || srcParam.lastName!='' || srcParam.emailAddress!=''){
      srcParam.familyId = (srcParam.familyId=='')?0:srcParam.familyId;
      this.unlockResponseList = await this.unlockService.fetchUnlockAccount(srcParam);
    }else{
      Swal.fire({
        // position: 'top-end',
         icon: 'error',
         title:'Required any one of the search criteria.',
         showConfirmButton: true,
         //timer: 1500
       });
    }
   
  }

  async unlockAccount(personId:any){
    let param={
      personId:personId
    };

    this.unlockResponseList =   await this.unlockService.getUnlockAccount(param);
    if(this.unlockResponseList){
      Swal.fire({
        // position: 'top-end',
         icon: 'success',
         title:this.unlockResponseList.message,
         showConfirmButton: true,
         //timer: 1500
       }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.searchFilter();
        }
       });
    }
  }


}
