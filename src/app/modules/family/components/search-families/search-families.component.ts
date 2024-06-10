import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { data } from 'jquery';
import { FamilySearchInterface } from 'src/app/modules/chinmaya-shared/interfaces/family-interfaces/family-search';
import { FamilyService } from 'src/app/modules/chinmaya-shared/services/family/family.service';
import { MasterService } from 'src/app/modules/chinmaya-shared/services/master/master.service';
import { ProgramService } from 'src/app/modules/chinmaya-shared/services/program/program.service';

@Component({
  selector: 'app-search-families',
  templateUrl: './search-families.component.html',
  styleUrls: ['./search-families.component.scss']
})
export class SearchFamiliesComponent {


  @Output() familyList = new EventEmitter<any>();
  searchForm: any;
  chapterList: any;
  personTypeList: any;



  constructor( 
    private familyService: FamilyService,
    private fb: FormBuilder,
    private programService: ProgramService,
    private masterService: MasterService
  ) { }




  async ngOnInit() {
    this.prepareSearchForm();
   // this.onSearchSubmit();
    this.chapterList = await this.programService.fetchChapterList();

    this.personTypeList = await this.masterService.getPersonType();
  }



  prepareSearchForm() {
    this.searchForm = this.fb.group({
      familyID: [''],
      lastName: [''],
      firstName: ['moh'],
      homePhone: [''],
      email: ['', [Validators.email]],
      registrantType: [''],
      chapter: [''],
      programCode: ['']
    });
  }




  async onSearchSubmit() {
    let searchParams: FamilySearchInterface = this.searchForm.value;
    let familyList = await this.familyService.searchFamilies(searchParams);
    this.familyList.emit(familyList);

  }

}