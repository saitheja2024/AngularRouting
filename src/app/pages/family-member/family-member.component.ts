import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-family-member',
  templateUrl: './family-member.component.html',
  styleUrls: ['./family-member.component.scss']
})
export class FamilyMemberComponent implements OnInit{
  familyList =[];
   constructor(public authService: AuthenticationService){

   }

   ngOnInit(){
    this.getFamilyDetails()

   }
   getFamilyDetails(){
    let data ={
      "familyID": 0,
      "lastName": "",
      "firstName": "",
      "homePhone": "",
      "email": "",
      "registrantType": "",
      "chapter": ""
    }
    this.authService.getFamilyDetails(data).pipe(map((res:any)=>{
      this.familyList = res?.personProgramList;
    })).subscribe();
   }

   getChapterList(){
    
   }
}
