import { Component, Inject, inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-selection-family-details',
  templateUrl: './selection-family-details.component.html',
  styleUrls: ['./selection-family-details.component.scss']
})
export class SelectionFamilyDetailsComponent {
  readonly dialogRef = inject(MatDialogRef<SelectionFamilyDetailsComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data:any){}

  async closeModal(){
    this.dialogRef.close();
  }
}
