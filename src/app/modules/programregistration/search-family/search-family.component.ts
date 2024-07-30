import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FamilyService } from '../../chinmaya-shared/services/family/family.service';
import { KEYS, StoreService } from '../../chinmaya-shared/services/store/store.service';
import { MasterService } from '../../chinmaya-shared/services/master/master.service';
import { createEmailValidator, phoneNumberValidator } from 'src/app/Validators/custom-validators';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth';
import { FamilySearchInterface } from '../../chinmaya-shared/interfaces/family-interfaces/family-search';
import { ProgramService } from '../../chinmaya-shared/services/program/program.service';

@Component({
  selector: 'app-search-family',
  templateUrl: './search-family.component.html',
  styleUrls: ['./search-family.component.scss']
})
export class SearchFamilyComponent {
  
  familyList=[]
  searchForm: any;
  chapterList: any;
  personTypeList: any;
  loggedInUser:any;
  selectedProgram: any;
  //@Output() familyList = new EventEmitter<any>();
  selectedChapterCode:any;
  selectedChapter:any;

  constructor( 
    private familyService: FamilyService,
    private fb: FormBuilder,
    private programService: ProgramService,
    private masterService: MasterService,
    private authService:AuthService,
    private store : StoreService
  ) { }


  

  async ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUser();
    this.selectedProgram  = this.store.getValue(KEYS.program);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    let chapter = this.store.getValue(KEYS.chapterDesc);
    this.selectedChapter=chapter[0].description;

    this.store.onProgramUpdate().subscribe(program=>{
      this.selectedProgram=program;
      this.familyList=[];
      this.prepareSearchForm();
    });
    this.prepareSearchForm();
   // this.onSearchSubmit();
   let param = {
    personID: this.loggedInUser.personID
  }
    this.chapterList = await this.programService.fetchChapterList(param);
    
    this.personTypeList = await this.masterService.getPersonType();
  }

  prepareSearchForm() {
    this.searchForm = this.fb.group({
      familyID: [''],
      lastName: [''],
      firstName: [''],
      homePhone: [''],
      email: ['', [Validators.email]],
      registrantType: [''],
      chapter: [''],
      programCode: [this.selectedProgram.code]
    });
  }

  async onSearchSubmit() {
    let param:any ={
      requestPageModel: {
          "page": 0,
          "size": 0,
          "sortFieldName": "",
          "sortOrder": ""
                },
      requestFamilySearch:{

      }
    }
      let searchParams: FamilySearchInterface = this.searchForm.value;
      param.requestFamilySearch = searchParams;
      this.familyList = await this.familyService.searchFamilies(param);

  }

}