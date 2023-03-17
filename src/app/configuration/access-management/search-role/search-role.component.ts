import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-role',
  templateUrl: './search-role.component.html',
  styleUrls: ['./search-role.component.scss']
})
export class SearchRoleComponent implements OnInit{
  organizationCodes=["Chinmama Mission","Chinmaya Somnath, Chantilly, VA","Chinmayam, Silver Spring, MD","Frederic Chapter, Frederic, MD"];
  roles=["Teacher","Prog Reg Coordinator","Core Team","Leadership Team","System Admin","View Program Config","Accounting","Add & Edit Event","View Event Report","Arpanam Admin","ALL"];
  reportFormats=["Excel"];
  constructor(private fb:FormBuilder){}
  ngOnInit(): void {
    
  }
  form = this.fb.group({
    organizationCode:['',[Validators.required]],
    role:['',[Validators.required]],
    familyID:['',[Validators.required]],
    reportFormat:['',[Validators.required]]
  })

  generateReport(){
    console.log(this.form.value);
  }
}