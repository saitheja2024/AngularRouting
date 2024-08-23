import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuicksiteService {
  private apiUrl = 'http://localhost:4200/getDashboardEmbedUrl'; // Update with your API endpoint
  constructor(private http: HttpClient) { }
  getEmbedUrl(dashboardId: string, awsAccountId: string, userArn: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}?dashboardId=${dashboardId}&awsAccountId=${awsAccountId}&userArn=${userArn}`);
  }
}
