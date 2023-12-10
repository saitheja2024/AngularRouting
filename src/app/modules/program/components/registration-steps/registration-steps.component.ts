import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailModalComponent } from 'src/app/modules/chinmaya-shared/modals/email/email.modal.component';

@Component({
  selector: 'app-registration-steps',
  templateUrl: './registration-steps.component.html',
  styleUrls: ['./registration-steps.component.scss']
})
export class RegistrationStepsComponent {

 
  constructor(private modalService: NgbModal){
    
  }


  async openEmailModal(){
    const modalRef = await this.modalService.open(EmailModalComponent);
  }

}
