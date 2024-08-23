import { Component, OnInit } from '@angular/core';
import { QuicksiteService } from './quicksite.service';
import { Pipe } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div *ngIf="embedUrl">
      <iframe [src]="embedUrl | safeUrl" width="100%" height="600px"></iframe>
    </div>
  `,
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  embedUrl: string | undefined;
  constructor(private QuicksiteService: QuicksiteService) { }
  ngOnInit(): void {
    const dashboardId = 'your-dashboard-id'; // Replace with your dashboard ID
    const awsAccountId = 'your-aws-account-id'; // Replace with your AWS account ID
    const userArn = 'arn:aws:iam::xxxxxxxxxxxx:user/jyothik'; // Replace with the IAM user ARN
    this.QuicksiteService.getEmbedUrl(dashboardId, awsAccountId, userArn).subscribe(url => {
      this.embedUrl = url;
    });
  }
}