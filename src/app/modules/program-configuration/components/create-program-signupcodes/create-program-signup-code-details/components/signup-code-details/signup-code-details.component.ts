import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-code-details',
  templateUrl: './signup-code-details.component.html',
  styleUrls: ['./signup-code-details.component.scss']
})
export class SignupCodeDetailsComponent {
  constructor (private router:Router,) { }

  ngOnInit() {
    
  }
  
  url="./assets/images/jellyfish.jpg";
  
  onselectFile(e:any) {
    if(e.target.files) {
      var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=(event:any)=> {
    this.url=event.target.result;
    }
    }
  }

  back(){
    this.router.navigateByUrl("/program-configuration/create-program/signup-codes")
   }

   next(){
    this.router.navigateByUrl("/program-configuration/create-program/signup-codes/signup-code-details/pre-requisites")
   }
  
}
