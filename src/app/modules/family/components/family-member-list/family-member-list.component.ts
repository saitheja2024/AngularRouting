import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FamilyMemberSearchInterface } from 'src/app/modules/chinmaya-shared/interfaces/family-interfaces/family-search';
import { FamilyService } from 'src/app/modules/chinmaya-shared/services/family/family.service';

@Component({
  selector: 'family-member-list',
  templateUrl: './family-member-list.component.html',
  styleUrls: ['./family-member-list.component.scss']
})
export class FamilyMemberListComponent {
  familyID: any;
  allFamilyMembers: any;

  constructor(
    private route: ActivatedRoute,
    private familyService: FamilyService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      let forceFetch = params['forceFetch'] == 'true' ? true : false;
      let family = this.familyService.getSelectedFamily();
      this.familyID = family.familyId;
      await this.fetchAllFamilyMembers(this.familyID, forceFetch);
    });

  }

  async fetchAllFamilyMembers(familyID: any, forceFetch: any) {
    let searchParams: FamilyMemberSearchInterface = {
      familyId: familyID
    }
    this.allFamilyMembers = await this.familyService.fetchFamilyDetailsByFamilyID(searchParams, forceFetch);


  }


  // showFamilyMemberDetails(selectedFamilyMember: any) {
  //   this.familyService.setSelectedFamilyMember(selectedFamilyMember)
  //   this.router.navigateByUrl("/family/familyMemberDetails");
  // }

}