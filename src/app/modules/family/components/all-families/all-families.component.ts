import { Component } from '@angular/core';
import { FamilyService } from 'src/app/modules/chinmaya-shared/services/family/family.service';

@Component({
  selector: 'app-all-families',
  templateUrl: './all-families.component.html',
  styleUrls: ['./all-families.component.scss']
})
export class AllFamiliesComponent {

  familyList: any;

  showFamilyList(familyList:any){
    this.familyList=familyList;
  }

}