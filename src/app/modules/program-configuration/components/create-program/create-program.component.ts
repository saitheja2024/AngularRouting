import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.scss']
})

export class CreateProgramComponent {
  tabs: { label: string; link: string; index: number; }[];

  constructor(private router:Router){
}

onTabChanged(event: MatTabChangeEvent): void {
  let link=""
  switch (event.index) {
    case 0:
      link='/program-configuration/create-program/configuration';
  break;
    case 1:
      link ="/program-configuration/create-program/program-details";
  break;
  case 2:
      link ="/program-configuration/create-program/registration-steps";
  break;
  case 3:
      link ="/program-configuration/create-program/signup-codes";
  break;
  case 4:
      link ="/program-configuration/create-program/package-details";
  break;
  case 5:
      link ="/program-configuration/create-program/review-configuration";
  break;
  }

  this.router.navigate([link]);
}

}
