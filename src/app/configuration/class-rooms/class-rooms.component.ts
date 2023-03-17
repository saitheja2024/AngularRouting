import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-class-rooms',
  templateUrl: './class-rooms.component.html',
  styleUrls: ['./class-rooms.component.scss']
})
export class ClassRoomsComponent implements OnInit{
  data:any=localStorage.getItem("TableArray");
  rowArray=JSON.parse(this.data)||[0];
  count=0;
  organizations=["Chinmaya Mission","Chinmaya Somnath, Chantilly, VA","Chinmayam, Silver Spring, MD","Frediric Chapter, Frederic, MD"];
  constructor(private fb:FormBuilder){}
  ngOnInit(): void {}
  form=this.fb.group({
    classRoomName:[''],
    capacity:[''],
    organization:['']
  })

  get classRoomName(){
    return this.form.controls['classRoomName'];
  }
  get capacity(){
    return this.form.controls['capacity'];
  }
  get organization(){
    return this.form.controls['organization'];
  }
  selectOraganization(){
    console.log(this.organization.value);
  }
  addClassRooms(){
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
