import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-requisites',
  templateUrl: './pre-requisites.component.html',
  styleUrls: ['./pre-requisites.component.scss']
})
export class PreRequisitesComponent {
  constructor (private router:Router,) { }

  back(){
    this.router.navigateByUrl("/program-configuration/create-program/signup-codes/signup-code-details/signup-code-details")
   }

   next(){
    this.router.navigateByUrl("/program-configuration/create-program/signup-codes/signup-code-details/payment-processing")
   }
}
