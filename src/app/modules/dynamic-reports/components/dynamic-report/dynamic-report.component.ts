import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-report',
  templateUrl: './dynamic-report.component.html',
  styleUrls: ['./dynamic-report.component.scss']
})

export class DynamicReportComponent {
  divWidth: string = '100%'; // Initial width
  displayDiv: boolean = false; // Initially hidden
  displayDiv1: boolean = false; // Initially hidden
  displayDiv2: boolean = false; // Initially hidden
  displayDiv3: boolean = false; // Initially hidden
  displayDiv4: boolean = false; // Initially hidden

  ReportsList() {
    // Toggle width between 200px and 400px (or any value you like)
    this.divWidth = this.divWidth === '100%' ? '50%' : '100%';
    this.displayDiv = !this.displayDiv; // Toggle the display state
    this.displayDiv1 = !this.displayDiv1; // Toggle the display state
    this.displayDiv2 = !this.displayDiv2; // Toggle the display state
    this.displayDiv3 = !this.displayDiv3; // Toggle the display state
  }
  
  Content1() {
    this.displayDiv1 = !this.displayDiv1; // Toggle the display state
  }

  Content2() {
    this.displayDiv2 = !this.displayDiv2; // Toggle the display state
  }

  Content3() {
    this.displayDiv3 = !this.displayDiv3; // Toggle the display state
  }

  Content4() {
    this.displayDiv4 = !this.displayDiv4; // Toggle the display state
  }

}
