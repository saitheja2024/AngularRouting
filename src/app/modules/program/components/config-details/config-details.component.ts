import { Component } from '@angular/core';
import { PageInfoService, PageLink } from 'src/app/_metronic/layout/core/page-info.service';
// import { PageInfoService, PageLink } from '../../../core/page-info.service';

@Component({
  selector: 'app-config-details',
  templateUrl: './config-details.component.html',
  styleUrls: ['./config-details.component.scss']
})
export class ConfigDetailsComponent {

  // links: Array<PageLink> = [{
  //   title: 'Main title',
  //   path: '/',
  //   isActive: false,
  // }, {
  //   title: 'Second title',
  //   path: '/',
  //   isActive: false,
  // }];
  
  // constructor(private pageInfo: PageInfoService) {
  //   pageInfo.updateTitle('Page title');
  //   pageInfo.updateBreadcrumbs(this.links);
  // }

}
