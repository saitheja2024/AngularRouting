import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/modules/chinmaya-shared/services/alert/alert.service';
import { FamilyService } from 'src/app/modules/chinmaya-shared/services/family/family.service';
import { ProgramRegistrationService } from 'src/app/modules/chinmaya-shared/services/program-registration/program-registration.service';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';

@Component({
  selector: 'app-program-dashboard',
  templateUrl: './program-dashboard.component.html',
  styleUrls: ['./program-dashboard.component.scss']
})
export class ProgramDashboardComponent {
  selectedFamily: any;
  dashboardMenu: any;

  constructor(private familyService:FamilyService,
    private programRegistrationService:ProgramRegistrationService,
    private store:StoreService,
    private router:Router,
    private alertService:AlertService
  ){}

  async ngOnInit(){
    this.selectedFamily = this.familyService.getSelectedFamily();
    let selectedChapterCode = this.store.getValue(KEYS.chapter);
    let param ={
      familyId:this.selectedFamily.familyId,
      code:selectedChapterCode
    }
    this.dashboardMenu = await this.programRegistrationService.fetchDashboardProgramCodes(param);
  }


  async validateCertification(selectedProgram:any){

    let selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.programRegistrationService.setSelectedProgram(selectedProgram);
    let params = {
        familyId: this.selectedFamily.familyId,
        programCode: selectedProgram.programCode,
        chapterCode: selectedChapterCode,
        paymentFlag: false
    }

    let certificateIsValid = await this.programRegistrationService.validateCertification(params);
    this.alertService.showSuccessAlert("certificate is " +certificateIsValid);
    if(!certificateIsValid){
      this.router.navigateByUrl("programregistration/certify-member");
    }
    else{
      this.router.navigateByUrl("programregistration/family-reg-workflow");
      
    }

  }

}
