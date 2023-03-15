import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-family-member',
  templateUrl: './family-member.component.html',
  styleUrls: ['./family-member.component.scss']
})
export class FamilyMemberComponent implements OnInit{
  familyList =[];
  show!:boolean;
  registrantTypes:any=["Adult", "Youth", "Children"];
  chapters:any=["Chinmaya Somnath", "Chinmayam", "Fredric", "Chinmaya Richmond"];
   constructor(public authService: AuthenticationService, private fb:FormBuilder){}

   ngOnInit(){
    this.getFamilyDetails()
    this.show=false;
   }

   form = this.fb.group({
    familyID: ['',[Validators.required]],
    lastName: ['',[Validators.required]],
    firstName: ['',[Validators.required]],
    homePhone: ['',[Validators.required]],
    email: ['',[Validators.required]],
    registrantType: ['',[Validators.required]],
    chapter: ['',[Validators.required]]
   })

   searchButtonHandler(){
    console.log(this.form.value);
   }

   searchToggleButton(){
    this.show=!this.show;
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
    };
    // this.authService.getFamilyDetails(data).pipe(map((res:any)=>{
    //   this.familyList = res?.personProgramList;
    // })).subscribe();
   }
}
