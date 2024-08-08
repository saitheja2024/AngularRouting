import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-program-review-configuration',
  templateUrl: './create-program-review-configuration.component.html',
  styleUrls: ['./create-program-review-configuration.component.scss']
})

export class CreateProgramReviewConfigurationComponent {

  //Accordion
  activeIndex: number | null = null;

  toggle(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  isActive(index: number): boolean {
    return this.activeIndex === index;
  }

  //image upload
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

  //checkbox
  showContentData: boolean = false;

  onCheckboxChangeData(event: Event) {
    this.showContentData = (event.target as HTMLInputElement).checked;
  }

  constructor(
    private router:Router,
    ){
    
  }

  back(){
    this.router.navigateByUrl("/program-configuration/create-program/signup-codes")
   }

  home(){
    this.router.navigateByUrl("/program-configuration/create-program/configuration")
   }
}
