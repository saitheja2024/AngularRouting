import { Component } from '@angular/core';
// import {reactiveformsModule}
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
// import {ReactiveFormModule} from '@angular/forms';
@Component({
  selector: 'app-content',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  enterArray:string='';
  checkingSecurly:any;
  Array2:string[]=['Apple', 'Boll', 'Cat', 'Dog', 'Elephant','Fish','Goat','Hen'];

  // console.log(this.Array2);
functioncheck(parameter:string){
console.log("the function was clicked and the parameter is: "+parameter);
//   for(let item=0;item<this.Array2.length;item++){
//     this.checkingSecurly = this.Array2.filter(((found:any)=>{
// if(found[item].includes(parameter)){
//   console.log("already included in Array");
//   console.log("the included Array is"+this.Array2)
// }else{
//   console.log("pushing into Array 2");
//   this.Array2.push(parameter);
//   console.log("the pushhed Array is"+this.Array2)
// }

//     }))
//   }
// for (let i = 0; i < this.Array2.length; i++) {
  if (this.Array2.includes(parameter)) {
    console.log("Already included in Array");
    console.log("the index of parameter is: "+this.Array2.indexOf(parameter));
    let index = this.Array2.indexOf(parameter);
    if (index !== -1) {
      this.Array2.splice(index, 1);
      console.log("removed element array"+this.Array2); // Remove 1 element at the found index
    }
    // this.Array2.pop(parameter);
    return;  // Exit the function if the parameter is already included
  }
// }
// If the parameter is not found, add it to the Array
console.log("Pushing into Array2");
this.Array2.push(parameter);
console.log("Added array"+this.Array2);
}
}
