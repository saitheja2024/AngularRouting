import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-program-reg-steps-email',
  templateUrl: './create-program-reg-steps-email.component.html',
  styleUrls: ['./create-program-reg-steps-email.component.scss']
})

export class CreateProgramRegStepsEmailComponent {
  constructor(private modalService: NgbModal){
  
  }

  async closeModal(){
    const modalRef = await this.modalService.dismissAll();
  }
}
