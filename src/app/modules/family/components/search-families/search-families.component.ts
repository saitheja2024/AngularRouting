import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { data } from 'jquery';
import { FamilySearchInterface } from 'src/app/modules/chinmaya-shared/interfaces/family-interfaces/family-search';
import { FamilyService } from 'src/app/modules/chinmaya-shared/services/family/family.service';
import { MasterService } from 'src/app/modules/chinmaya-shared/services/master/master.service';
import { ProgramService } from 'src/app/modules/chinmaya-shared/services/program/program.service';
import { AuthService } from 'src/app/modules/auth';
import Swal from 'sweetalert2';

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
  loggedInUser:any;


  constructor( 
    private familyService: FamilyService,
    private fb: FormBuilder,
    private programService: ProgramService,
    private masterService: MasterService,
    private authService:AuthService
  ) { }




  async ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUser()
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
      programCode: ['']
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
    };
    if(this.searchForm.value.familyID!='' || this.searchForm.value.firstName!=''  || this.searchForm.value.lastName!='' || this.searchForm.value.homePhone!='' || this.searchForm.value.email!='' || this.searchForm.value.registrantType!='' || this.searchForm.value.chapter!=''){
      let searchParams: FamilySearchInterface = this.searchForm.value;
      param.requestFamilySearch = searchParams;
      this.familyService.setSearchCriteria(param);
     

      this.familyList.emit("searchFamily");
    }else{
      Swal.fire({
        // position: 'top-end',
         icon: 'error',
         title:'Required any one of the search criteria.',
         showConfirmButton: true,
         //timer: 1500
       });
    }
    

  }

}