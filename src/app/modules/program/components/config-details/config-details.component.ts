import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PageInfoService, PageLink } from 'src/app/_metronic/layout/core/page-info.service';
import { ProgramService } from 'src/app/modules/chinmaya-shared/services/program/program.service';
import { ReportsService } from 'src/app/modules/chinmaya-shared/services/reports/reports.service';
// import { PageInfoService, PageLink } from '../../../core/page-info.service';

@Component({
  selector: 'app-config-details',
  templateUrl: './config-details.component.html',
  styleUrls: ['./config-details.component.scss']
})
export class ConfigDetailsComponent {
  configDetailsForm: any;
  chapterList: any;
  programList: any;
  programYears: any;


  constructor
  (
    private fb:FormBuilder,
    private programService:ProgramService,
    private reportService:ReportsService
  )
  {

  }


  async ngOnInit(){
    this.initConfigDetailsForm();
    this.chapterList = await this.programService.fetchChapterList();
    
  }

  async onChapterSelection(ev:any){
    let orgCode=ev.target.value;
    this.programList = await this.programService.fetchAllPrograms(orgCode);
  }

  async onProgramSelection(ev:any){
    let programCode=ev.target.value;
    this.programYears = await this.reportService.fetchProgramYears(programCode);
  }

 




  initConfigDetailsForm(){
    this.configDetailsForm = this.fb.group({
      programCode: [''],
      regStartDateTime: [''],
      regEndDateTime: [''],
      organizationcode: [''],
      signUpCode: [''],
      newProgramCode: [''],
      newRegStartDateTime: [''],
      newRegEndDateTime: [''],
      newStartDateTime: [''],
      newEndDateTime: [''],
    });
  }
}
