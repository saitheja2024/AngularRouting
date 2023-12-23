import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FamilySearch } from 'src/app/modules/chinmaya-shared/interfaces/family-interfaces/family-search';
import { FamilyService } from 'src/app/modules/chinmaya-shared/services/family/family.service';

@Component({
  selector: 'app-search-families',
  templateUrl: './search-families.component.html',
  styleUrls: ['./search-families.component.scss']
})
export class SearchFamiliesComponent {


  @Output() familyList= new EventEmitter<any>();
  searchForm: any;



  constructor(
    private familyService: FamilyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.prepareSearchForm();
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
      programCode: ['']
    });
  }




async onSearchSubmit() {
  let searchParams:FamilySearch=this.searchForm.value;
  let familyList = await this.familyService.searchFamilies(searchParams);

  this.familyList.emit(familyList);

}

}


