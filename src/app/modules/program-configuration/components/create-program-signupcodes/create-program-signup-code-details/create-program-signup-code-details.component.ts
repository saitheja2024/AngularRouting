import { Component } from '@angular/core';

@Component({
  selector: 'app-create-program-signup-code-details',
  templateUrl: './create-program-signup-code-details.component.html',
  styleUrls: ['./create-program-signup-code-details.component.scss']
})
export class CreateProgramSignupCodeDetailsComponent {
  async ngOnInit() {
    let element:any = document.getElementById("add_active_cls");
    element.classList.remove("active");
  }
}
