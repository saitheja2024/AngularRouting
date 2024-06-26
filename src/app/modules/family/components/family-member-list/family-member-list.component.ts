import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FamilyMemberSearchInterface } from 'src/app/modules/chinmaya-shared/interfaces/family-interfaces/family-search';
import { FamilyService } from 'src/app/modules/chinmaya-shared/services/family/family.service';
import { ProgramService } from 'src/app/modules/chinmaya-shared/services/program/program.service';
import { StoreService, KEYS } from 'src/app/modules/chinmaya-shared/services/store/store.service';
@Component({
  selector: 'family-member-list',
  templateUrl: './family-member-list.component.html',
  styleUrls: ['./family-member-list.component.scss']
})
export class FamilyMemberListComponent {
  familyID: any;
  allFamilyMembers: any;
  selectedChapterCode:any
  primaryContatDetails:any;
  signupURL:any;
  constructor(
    private route: ActivatedRoute,
    private familyService: FamilyService,
    private router: Router,
    private programService:ProgramService,
    private store:StoreService
  ) { }

  async ngOnInit() {
    this.signupURL = 'https://cmwrc.chinmayadc.org/support/arpanam/';

    this.route.params.subscribe(async params => {
      let forceFetch = params['forceFetch'] == 'true' ? true : false;
      let family = this.familyService.getSelectedFamily();
      this.familyID = family.familyId;
      await this.fetchAllFamilyMembers(this.familyID, forceFetch);
    });
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
   await  this.getPrimaryContactUpdatedDetails();
  }

  async fetchAllFamilyMembers(familyID: any, forceFetch: any) {
    let searchParams: FamilyMemberSearchInterface = {
      familyId: familyID
    }
    this.allFamilyMembers = await this.familyService.fetchFamilyDetailsByFamilyID(searchParams, forceFetch);
  }


  showFamilyMemberDetails(selectedFamilyMember: any) {
    this.familyService.setSelectedFamilyMember(selectedFamilyMember)
    this.router.navigateByUrl("/family/familyMemberDetails");
  }

  async getPrimaryContactUpdatedDetails() {
      const body = {
        familyId: this.familyID,
        programCode: "",
        chapterCode: this.selectedChapterCode,
        paymentFlag: false
      }
     let data = await this.programService.getPrimaryContact(body);
     this.primaryContatDetails = data;
  }

  newwindow(){
    window.open(this.signupURL, "_blank");
  }
  

}