import { Component,OnInit} from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  show!:boolean;
  data:any=localStorage.getItem("TableArray");
  rowArray=JSON.parse(this.data)||[0];
  count=0;
  constructor(){}
  ngOnInit(): void {
    this.show=false;
  }
  isVisible(){
    this.show=!this.show;
  }

  createNewRole(){
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
