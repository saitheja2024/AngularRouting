import { Component } from '@angular/core';
import { PersonList } from 'src/app/modules/chinmaya-shared/services/program-registration/programregistration.interface';
import { StoreService, KEYS } from 'src/app/modules/chinmaya-shared/services/store/store.service';
import { ClassRegistrationService } from 'src/app/modules/chinmaya-shared/services/program-registration/classregistration.service';
@Component({
  selector: 'app-classregistration',
  templateUrl: './classregistration.component.html',
  styleUrls: ['./classregistration.component.scss']
})
export class ClassregistrationComponent {
  
  selectedAcademicYear: any;
  selectedChapterCode: any;
  selectedProgram: any;
  loggedInUser: any;
  selectedFamily:any;
  personList:any;
  selectedMember: any;

 constructor( private store:StoreService, private classRgiSrvice:ClassRegistrationService){}

 async ngOnInit(){
  this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.selectedProgram = this.store.getValue(KEYS.program);
    this.selectedFamily = this.store.getValue(KEYS.selectedFamily);
   // this.loggedInUser = this.emailproService.getLoggedInUser();
   await this.fetchPersonList();
}

  
  async fetchPersonList(){
   
    let param:PersonList = {
      familyId: this.selectedFamily.familyId,
      programCode: this.selectedProgram.code,
      chapterCode: this.selectedChapterCode,
      paymentFlag: false,
      personTypeCheckRequiredFlag: true
    }

     let personData:any = await this.classRgiSrvice.getPersonList(param);
     this.personList = personData?.personProgramList;
  }


  selectedUserData:any;
  onMemberChange(e: any, user:any) {
    //this.blurLayer=true;
    //this.SelectedMemData = e;
    localStorage.setItem('selectMember', JSON.stringify(user));
    //this.getCategoriesList();
   // this.selectCheckBox();
   // console.log(this.formGroup.value);
  }

}
