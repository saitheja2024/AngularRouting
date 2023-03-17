import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})



export class UserComponent implements OnInit{
  chapters=["Chinmama Mission","Chinmaya Somnath, Chantilly, VA","Chinmayam, Silver Spring, MD","Frederic Chapter, Frederic, MD"];
  programCodes=["All"];
  signupCodes=["All"];
  data:any=localStorage.getItem("TableArray");
  rowArray=JSON.parse(this.data)||[0];
  count=0;
  constructor(private fb:FormBuilder){};
  ngOnInit(): void {
    
  };

  form=this.fb.group({
    chapter:['',[Validators.required]],
    email:['',[Validators.required]],
    firstName:['',[Validators.required]],
    lastName:['',[Validators.required]],
    programCode:['',[Validators.required]],
    signupCode:['',[Validators.required]]
  });

searchButton(){
  console.log(this.form.value);
}
addTableRow(){
  this.addRowNumber();
}
addRowNumber(){
  this.count++;
  this.rowArray.push(this.count);  
  localStorage.setItem("TableArray", JSON.stringify(this.rowArray));
  console.log(this.rowArray);
}

deleteRow(index:number){
  if(this.rowArray.length===1){
    alert("can't remove only one row is there!");
    return false;
  }else{
      this.rowArray.splice(index, 1);  
      localStorage.setItem("TableArray", JSON.stringify(this.rowArray));
      return true;  
  }  
  }
}
