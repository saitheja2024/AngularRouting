import { Component } from '@angular/core';
import { KEYS, StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';
import { ClassRegistrationService } from '../../chinmaya-shared/services/program-registration/classregistration.service';
import { RouteChangeCall } from '../../chinmaya-shared/services/program-registration/routechange.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';

@Component({
  selector: 'app-programregistration',
  templateUrl: './programregistration.component.html',
  styleUrls: ['./programregistration.component.scss']
})
export class ProgramregistrationComponent {
  selectedProgram:any;
  selectedChapter:any;
  programRegistrationList:any[]=[];
  currentTabIndexVal:any;
  programConfigurationFields:any;
  currentTab:any;
  familyFlag:any;
  selectedAcademicYear: any;
  selectedChapterCode: any;
  loggedInUser: any;
  selectedFamily:any;
  currentUserData:any;
  subscription:any;
  routeURL:any={
    'Registration':'registration',
    'Additional Details':'additionaldetails',
    'Health Information':'healthinformation',
    'Time Slots signup':'timeslot-signup',
    'Review':'review',
    'Consent':'constant',
    'Payment':'payment',
  }
  urlCheck:string="/programregistration/registration";
  constructor(private store:StoreService, private classRegiService:ClassRegistrationService, 
    private UrlCall:RouteChangeCall, private route:Router){
    this.subscription = this.UrlCall.getData().subscribe(item => {
      this.RedirectionCall(item)
    });

    this.route.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
      }

      if (event instanceof NavigationEnd) {
          if( event.url==this.urlCheck) { this.fetchFamilyFlag(); }
      }

      if (event instanceof NavigationError) {
          
      }
  });
  }

  ngOnInit(){
    this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.selectedProgram = this.store.getValue(KEYS.program);
    this.selectedFamily = this.store.getValue(KEYS.selectedFamily);
    this.currentUserData = this.classRegiService.getLoggedInUser();

   // this.selectedAcademicYear = this.store.getValue(KEYS.academicYear);
    //this.selectedChapterCode = this.store.getValue(KEYS.chapter);
    this.selectedProgram = this.store.getValue(KEYS.program);  
    this.fetchFamilyFlag();
  }

  async fetchFamilyFlag(){
      let body ={
        familyId: this.selectedFamily.familyId,
        programCode: this.selectedProgram.code,
        chapterCode: this.selectedChapterCode,
        paymentFlag:false
      };
     let res = await this.classRegiService.fetchSaveProgramConfigurationFields(body);
    
      this.familyFlag=res;
      this.programConfigurationFields = res;
      this.prepareTabs();
    
    
   }
  
  prepareTabs(){
    this.programRegistrationList=[];
    this.currentTabIndexVal=0;
    this.currentTab = "Registration";
    this.programRegistrationList.push("Registration");
    if(this.programConfigurationFields.showProfileFieldsFlag && this.programConfigurationFields.showProfileFieldsFlag==1){
      this.programRegistrationList.push("Additional Details");
    }
  
    if(this.programConfigurationFields.healthInfoFlag && this.programConfigurationFields.healthInfoFlag==1){
     this.programRegistrationList.push("Health Information");
    }
    
    if(this.programConfigurationFields.volunteerSignupFlag && this.programConfigurationFields.volunteerSignupFlag==1){
      this.programRegistrationList.push("Time Slots signup");
    }
    this.programRegistrationList.push("Review");
    this.programRegistrationList.push("Consent");
    this.programRegistrationList.push("Payment");
   this.groupmenuArray();
  }
  
  programGroupMenu:any=[]
  groupmenuArray(){
    this.programGroupMenu=[];
    const arr :any = this.programRegistrationList;
    var group:any = [];
    let n =3;
  for (var i:any = 0, end = arr.length / n; i < end; ++i){
    group.push(arr.slice(i * n, (i + 1) * n));
  //return group;
  }
  this.programGroupMenu = group;
  
   }  

   getProgramClass(program:any){
    if(program==this.currentTab){
      return 'btncolor';
    }

    return 'btn-secondary';
  }

  RedirectionCall(ev:any){
    sessionStorage.removeItem('fetchupdateResponse');
    if(ev!=''){
      let URL:any='';
      if(ev.Event=='SaveNext'){
        let index=this.programRegistrationList.indexOf(ev.currenttab)+1;
        this.currentTabIndexVal = index;
        if(index>this.programRegistrationList.length){
          index=this.programRegistrationList.length;
        }
        
        this.currentTab=this.programRegistrationList[index];
         URL = this.routeURL[this.currentTab];
      }else if(ev.Event=='current'){
        this.currentTab = ev.currenttab;
      }else{
        let index=this.programRegistrationList.indexOf(this.currentTab)-1;
        this.currentTabIndexVal = index;
        if(index==-1){
        index=0
        }
        this.currentTab=this.programRegistrationList[index];
        URL = this.routeURL[this.currentTab];
      }
    
     this.getProgramClass(this.currentTab);
     this.route.navigate(['/programregistration/'+URL]);
    }
   }

}


