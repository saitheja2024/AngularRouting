import { Component } from '@angular/core';

@Component({
  selector: 'app-create-program-program-details',
  templateUrl: './create-program-program-details.component.html',
  styleUrls: ['./create-program-program-details.component.scss']
})

export class CreateProgramProgramDetailsComponent {
  constructor () { }

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

  showContent1: boolean = false;
  showContent2: boolean = false;
  showContent3: boolean = false;
  showContent4: boolean = false;
  showContent5: boolean = false;
  showContent6: boolean = false;

  onCheckboxChange1(event: Event) {
    this.showContent1 = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChange2(event: Event) {
    this.showContent2 = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChange3(event: Event) {
    this.showContent3 = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChange4(event: Event) {
    this.showContent4 = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChange5(event: Event) {
    this.showContent5 = (event.target as HTMLInputElement).checked;
  }

  onCheckboxChange6(event: Event) {
    this.showContent6 = (event.target as HTMLInputElement).checked;
  }
}
