import { Injectable } from '@angular/core';
import { HttpService, Options } from '../https-service/http-service';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class StatusUpdateService {

  constructor(
    private httpService: HttpService,
    private urlService: UrlService
  ) { }
}
