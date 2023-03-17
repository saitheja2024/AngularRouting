import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-email-template',
  templateUrl: './create-email-template.component.html',
  styleUrls: ['./create-email-template.component.scss']
})
export class CreateEmailTemplateComponent implements OnInit {
  registrationStatuses=["PENDING","PROCESSING","ACCEPTED","WITHDRAWN","CANCELLED","INVALID_DOC","NOSHOW","ATTENDED","WAITLISTED","MBRUPDATE","ONHOLD","REGRET","AT_CAPACITY"];
  constructor(private fb:FormBuilder){}
  ngOnInit(): void {}

  form=this.fb.group({
    programCode:['',[Validators.required]],
    registrationStatus:['', [Validators.required]],

  })

  createEmailTemplate(){

  }
}
