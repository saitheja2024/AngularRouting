import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'email-modal',
    templateUrl: './email.modal.html'
  })
  export class EmailModalComponent {

    constructor(private modalService: NgbModal){
    
    }
  

    async closeEmailModal(){
      const modalRef = await this.modalService.dismissAll();
    }

  }