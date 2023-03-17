import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-email-template',
  templateUrl: './create-email-template.component.html',
  styleUrls: ['./create-email-template.component.scss']
})
export class CreateEmailTemplateComponent implements OnInit {
  registrationStatuses=["PENDING","PROCESSING","ACCEPTED","WITHDRAWN","CANCELLED","INVALID_DOC","NOSHOW","ATTENDED","WAITLISTED","MBRUPDATE","ONHOLD","REGRET","AT_CAPACITY"];
  paymentStatuses=["IN_PROGRESS","PAID","BALANCE_DUE","PARTIAL_PAYMENT","REFUNG","NO-DUES","SPCL_CONSIDERATION","PRE_AUTH SUCCESS","PRE_AUTH FAILED"]
  existingTemplates=["Pending_Pre_Auth_Success"];
  constructor(private fb:FormBuilder){}
  ngOnInit(): void {}

  form=this.fb.group({
    programCode:['',[Validators.required]],
    registrationStatus:['', [Validators.required]],
    paymentStatus:['',[Validators.required]],
    existingTemplate:['',[Validators.required]],
    emailTemplateName:['',[Validators.required]],
    subject:['',[Validators.required]],
    senderEmail:['',[Validators.required]],
    body:['',[Validators.required]]
  })

  createEmailTemplate(){
    console.log(this.form.value);
  }
}
