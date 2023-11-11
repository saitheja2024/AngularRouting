import { Component } from '@angular/core';
import { PageInfoService, PageLink } from 'src/app/_metronic/layout/core/page-info.service';
import { ProgramService } from 'src/app/modules/chinmaya-shared/services/program/program.service';
// import { PageInfoService, PageLink } from '../../../core/page-info.service';

@Component({
  selector: 'app-config-details',
  templateUrl: './config-details.component.html',
  styleUrls: ['./config-details.component.scss']
})
export class ConfigDetailsComponent {
  chapterList: any;

  constructor(private programService:ProgramService){

  }

  async ngOnInit(){
    this.chapterList = await this.programService.fetchChapterList();
  }

}
