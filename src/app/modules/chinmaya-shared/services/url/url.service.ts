import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  organzationURL={
    fetchAllOrgnaztion:"organization/fetchChaptersList"
  }

  registrationURL={
    fetchAllPrograms:"registration/fetchProgramsByChapter"
  } 
}
