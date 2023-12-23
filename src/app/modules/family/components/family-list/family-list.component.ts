import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyService } from 'src/app/modules/chinmaya-shared/services/family/family.service';

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.scss']
})
export class FamilyListomponent {

  familyList: any;

  constructor(
    private familyService: FamilyService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.familyList = this.familyService.getFamilyList();
  }

  showFamilyList(familyList: any) {
    this.familyList = familyList;
  }

  showFamilyMemberList(family: any) {
    this.familyService.setSelectedFamily(family);
    this.router.navigateByUrl("/family/familyMemberList/true");
  }

}
