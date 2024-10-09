import { Component, OnInit } from '@angular/core';
import { DynamicReportService } from '../dynamicReport.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';
import { ConnectableObservable } from 'rxjs';


@Component({
  selector: 'app-dynamic-report',
  templateUrl: './dynamic-report.component.html',
  styleUrls: ['./dynamic-report.component.scss'],
})
export class DynamicReportComponent implements OnInit {
  categoryList: any;
  categoryListId: number;
  subCategory: boolean = false;
  subCategoryListId: number = 0;
  ReportListByCategoryAndSubCategory: any;
  selectedReport: any = null;
  showDiv1: boolean = false;
  activeButtonId: number | null = null;
  reportListId: any;
  isTimeoutExpires: boolean = false;
  // timesetting for downloading the reports
  timeDuration = 1 * 1000;
  // timeDuration =   2 * 60* 60 * 60 *1000;
  timeoutEnd: Date;
  currentTime: Date = new Date();
  activeContentIndex: number = -1;
  activeContentIndex2: number = -1;
  subCategoryList: any;
  reportFilterList: any;
  sheduleSelectedDate: Date = new Date();
  isActive: boolean = false;
  divWidth: string = '100%';
  displayDiv: boolean = false;
  displayDiv1: boolean = false;
  displayDiv2: boolean = false;
  displayDiv3: boolean = false;
  displayDiv4: boolean = false;
  displayDiv5: boolean = false;
  displayDiv6: boolean = false;
  displayDiv7: boolean = false;
  chapterList: any;
  programCodeList: any;
  signUpCodeList: any;
  chapter: string;
  programcode: string;
  signupcode: string;
  chapterCode: any;
  classInput: any;
  subClassInput: any;
  sessionInput: any;
  others: any;
  classCode: any;
  subClassCode: any;
  sessionCode: any;
  // for saving selecetd dropdwon option
  classcode: any;
  subclasscode: any;
  sessioncode: any;
  signupCategory: any;
  isChecked: any;
  chapterListSelecetd: any = [];
  programListSelected: any = [];
  programListSelected2: any[] = [];
  signupListSelected: any[] = [];
  classListSelected: any[] = [];
  classListSelected2: any[] = [];
  subclassSelected: any[] = [];
  subclassListSelected2: any[] = [];
  sessionSelected: any[] = [];
  sessionListSelected2: any[] = [];
  reportId: any;
  reportName: any;
  saveReportSchedule: any;
  programCodePairs: { key: string; value: any }[] = [];
  signUpCodePairs: { key: string; value: any }[] = [];
  classCodePairs: { key: string; value: any }[] = [];
  subclassCodePairs: { key: string; value: any }[] = [];
  sessionCodePairs: { key: string; value: any }[] = [];

  selectedTime: any;
  // familyReportName:any;
  hasDotError: boolean = false;
  editreport: boolean = false;
  myForm: FormGroup;
  form: FormGroup;
  familyReportName: string = '';
  familyReportNameError: boolean = false;
  scheduleDate: any = new Date();
  scheduleDateforedit: any = new Date();
  datevalidation: boolean = false;
  filterList: { key: string; value: any }[] = [];
  loggedinUser: any;
  modifiedBy: number;
  reportsSheduled: any;
  editReportShedule: any;
  scheduleType: any;
  activeReportIndex: number | null = null;
  editActiveReportIndex: number;
  ReportListByCategoryAndSubCategoryAll:any;

// for filtering Declarations below
  chapterlistmain: any;
  searchTerm:string='';
  filteredChapterList:any;

  programCodeMain:any;
  searchTermProgramCode:string='';
  filteredProgramCode:any;

  signUpCodeMain:any;
  searchTermSignUpCode:string='';
  filteredSignUpCode:any;

  classCodeMain:any;
  searchTermClassCode:string='';
  filteredClassCode:any;

  subClassMain:any;
  searchTermSubClassCode:string='';
  filteredSubClassCode:any;

  sessionCodeMain:any;
  searchTermSessionCode:string='';
  filteredSessionCode:any;

  constructor(
    private dynamicReports: DynamicReportService,
    private fb: FormBuilder,
    private storeService: StoreService
  ) {
    this.myForm = this.fb.group({
      dateTime: ['', Validators.required],
    });
    this.form = this.fb.group({
      scheduleDate: ['', Validators.required],
    });
  }

  markAsTouched() {
    this.scheduleDate.markAsTouched();
    this.datevalidation = true;
  }

  validateFamilyReportName(value: string): void {
    this.familyReportNameError = !value || value.includes('.');

    // Remove dots from the input value
    this.familyReportName = value.replace(/\./g, '');
  }
  scheduleList: { key: string; value: any }[] = [
    { key: 'daily', value: 'Daily' },
    { key: 'weekly', value: 'Weekly' },
    { key: 'monthly', value: 'Monthly' },
  ];
  buttonscolors: string[] = [
    '#F79646',
    '#55c2da',
    '#77933C',
    '#984807',
    '#948A54',
    '#002060',
    '#8064A2',
    '#0070C0',
  ];

  ngOnInit() {
    this.fetchCategoryList();
    this.fetchChapterLists();
    // this.filteredChapterList=[...this.chapterList];
    // this.filteredChapterList = [...this.chapterList];
    this.filteredChapterList = this.chapterlistmain
    // console.log("this is called by store services");
    this.loggedinUser = this.storeService.getStore();

    this.modifiedBy = this.loggedinUser.loggedInUser.personID;
  }
  //  for time based download button enable
  setTimeout() {
    const now = new Date();
    this.timeoutEnd = new Date(now.getTime() + this.timeDuration);
  }

  isTimeoutExpired(): boolean {
    let timeOut = new Date() > this.timeoutEnd;

    return timeOut;
  }
  // For fetching category List

  async fetchCategoryList() {
    try {
      this.categoryList = await this.dynamicReports.fetchCategoryList();
    } catch (error) {
      console.error('Error while fetching data: ', error);
    }
  }

  // for fetching sub category list based on category
  async fetchSubCategoryList(parameters: any) {
    if (this.displayDiv) {
      this.displayDiv = !this.displayDiv;
    }
    this.divWidth = '100%';

    if (!this.displayDiv) {
      this.displayDiv = this.displayDiv;
    }
    this.categoryListId = parameters;
    this.subCategory = false;
    try {
      let param = {
        id: parameters,
      };
      this.subCategoryList = await this.dynamicReports.fetchSubCategoryList(
        param
      );
      // if the subcategory list is null then directly calls to reportlist by making subcategory as = 0;
      if (this.subCategoryList.length === 0) {
        this.subCategoryListId = 0;
        this.fetchReportListByCategoryAndSubCategory();
        if (!this.displayDiv) {
          this.divWidth = '50%';
          this.displayDiv = !this.displayDiv;
        } else {
          this.displayDiv = this.displayDiv;
        }
      }
      this.subCategory = true;
      this.isActive = true;
    } catch (error) {
      console.error('Error while fetching data: ', error);
    }
  }

  // getting button colors dynamically
  getButtonColor(index: number): string {
    return this.buttonscolors[index % this.buttonscolors.length];
  }
  ReportsList(parameters: any) {
    if (this.displayDiv) {
      this.displayDiv = !this.displayDiv;
    } else {
      this.displayDiv = this.displayDiv;
    }
    this.subCategoryListId = parameters;
    this.setTimeout();
    // calling the fetchReportListByCategoryAndSubCategory
    this.fetchReportListByCategoryAndSubCategory();

    // Toggle width between 200px and 400px (or any value you like)
    this.divWidth = this.divWidth === '100%' ? '50%' : '100%';
    this.displayDiv = !this.displayDiv;
    this.displayDiv1 = !this.displayDiv1;
    this.displayDiv2 = !this.displayDiv2;
    this.displayDiv3 = !this.displayDiv3;
  }

  // fetchReportListByCategoryAndSubCategory

  async fetchReportListByCategoryAndSubCategory() {
    // this.activeContentIndex=0
    if (this.displayDiv1) {
      this.displayDiv1 = !this.displayDiv1;
    }
    try {
      let parameters;
      if (this.subCategoryListId === null) {
        parameters = {
          categoryId: this.categoryListId,
          subCategoryId: 0,
        };
      } else {
        parameters = {
          categoryId: this.categoryListId,
          subCategoryId: this.subCategoryListId,
          // this.subCategoryListId
        };
      }
      this.ReportListByCategoryAndSubCategory =
        await this.dynamicReports.fetchReportListByCategoryAndSubCategory(
          parameters
        );
        const jsonArrays = this.ReportListByCategoryAndSubCategory.split('][');
        const combinedArray = jsonArrays.map((json: string) => JSON.parse(json.replace(/^\[|\]$/g, ''))).flat();


        const resultString = (combinedArray);
        console.log(resultString);
        this.ReportListByCategoryAndSubCategoryAll=this.ReportListByCategoryAndSubCategoryAll+
        resultString;



        this.ReportListByCategoryAndSubCategoryAll=this.ReportListByCategoryAndSubCategoryAll+JSON.stringify
        (this.ReportListByCategoryAndSubCategory);
        console.log(this.ReportListByCategoryAndSubCategoryAll);
      //   for(let item of this.ReportListByCategoryAndSubCategory)
      //   console.log("the report list is :"+item);
      // // console.log(JSON.stringify(this.ReportListByCategoryAndSubCategory));
      // console.log(this.ReportListByCategoryAndSubCategoryAll);
      // this.ReportListByCategoryAndSubCategory = this.rll;
      // for (let item of this.ReportListByCategoryAndSubCategory) {
      //   this.reportName = item.reportName;
      //   this.reportId = item.reportId;
      //   console.log(
      //     'the report id is :' +
      //       this.reportId +
      //       ' and the report name is :' +
      //       this.reportName
      //   );
      // }
      // this.fetchReportFilterListByReportId(this.reportListId)
    } catch (error) {
      console.error('Error while fetching data: ', error);
    }
  }
  // for fetching reportShedule to display the sheduled Reports Table


  assigningReportIdandName(reportId:any,reportName:any){
    this.reportId=reportId;
    this.reportName=reportName;
     if(this.displayDiv6){
    this.displayDiv6=!this.displayDiv6
  }
  }

  async fetchReportFilterListByReportId(parameter: any) {
    console.log("the report id is: "+parameter);
    if (this.displayDiv7) {
      this.displayDiv7 = false;
    }
    this.displayDiv6 = false;
    try {
      let param = {
        id: parameter,
      };
      this.reportFilterList =
        await this.dynamicReports.fetchReportFilterListByReportId(param);
    } catch (error) {
      console.error('Error while fetching data: ', error);
    }
  }


  async fetchReportShedule(reportid:any,reportname:any) {
    this.activeContentIndex = -1;

    if (this.displayDiv7) {
      this.displayDiv7 = false;
    }
    if (this.activeContentIndex) {
      this.activeContentIndex = -1;
    }

    if (this.displayDiv6) {
      this.displayDiv6 = false;
    } else {
      this.displayDiv6 = true;
    }
    try {
      let param = {
        reportId: reportid,
        reportName: reportname,
        categoryId: this.categoryListId,
        subCategoryId: 0,
        startDate: '2024-02-22T09:35:09.820633-04:00',
        endDate: '2025-10-30T06:30:00-04:01',
      };
      this.reportsSheduled = await this.dynamicReports.fetchReportShedules(
        param
      );
      // if the subcategory list is null then directly calls to reportlist by making subcategory as = 0;
    } catch (error) {
      console.error('Error while fetching data: ', error);
    }
  }

  async editfetchedReportListById(parameter: number) {
    // console.log("this is inside the edit fetched report list.: "+parameter);
    this.scheduleDateforedit = new Date();
    this.displayDiv7 = true;
    this.editreport = true;
    if (this.displayDiv6) {
      this.displayDiv6 = false;
    }

    try {
      let param = {
        id: parameter,
      };
      this.editReportShedule = await this.dynamicReports.edirReportShedules(
        param
      );
      this.sheduleSelectedDate = this.editReportShedule.scheduleDate;

      // Parse the date string into a Date object
      const date = new Date(this.sheduleSelectedDate);

      // Extract day, month, and year
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const year = date.getFullYear();
      // Get UTC hours and minutes
      const utcHours = date.getUTCHours();
      const utcMinutes = date.getUTCMinutes();

      // Adjust for the offset (this assumes the offset is known to be -4)
      const adjustedHours = utcHours - 4; // Adjust for UTC-4
      const formattedHours = String((adjustedHours + 24) % 24).padStart(2, '0'); // Wrap around for 24-hour format
      const formattedMinutes = String(utcMinutes).padStart(2, '0');

      // Combine for the input field
      const formattedDate = `${day}/${month}/${year}`;
      const formattedTime = `${formattedHours}:${formattedMinutes}`;

      // Set the formatted schedule date for editing
      this.scheduleDateforedit = `${year}-${month}-${day}T${formattedHours}:${formattedMinutes}`;

      // Logging the results for debugging
      //   console.log(`Formatted Date: ${formattedDate}`);
      //   console.log(`Formatted Time: ${formattedTime}`);
      //   console.log(`Schedule Date for Edit: ${this.scheduleDateforedit}`);

      // // Output the formatted date and time
      // console.log("Formatted Date:", formattedDate);
      // console.log("Formatted Time:", formattedTime);
      //   // this.scheduleDateforedit = this.sheduleSelectedDate.toISOString().slice(0, 16)
      //   console.log("the time is: "+ this.scheduleDateforedit)
      // this.scheduleDateforedit = this.sheduleSelectedDate.toISOString().slice(0, 16)
      // console.log("the time is: "+this.scheduleDateforedit);

    } catch (error) {
      console.error('Error while fetching data: ', error);
    }
  }

Content2(parameters:number){
  this.activeContentIndex2 = -1;
  if (this.activeContentIndex2 === parameters) {
    this.activeContentIndex2 = -1;
  } else {
    // this.sheduleSelectedDate = null;
    this.activeContentIndex2 = parameters;
  }
  console.log('the parameters of index is ' + parameters);
}

  Content(parameter: number) {
    this.activeContentIndex = -1;

    if (this.activeContentIndex === parameter) {
      this.activeContentIndex = -1;
    } else {
      // this.sheduleSelectedDate = null;
      this.activeContentIndex = parameter;
    }
    console.log('the parameters of index is ' + parameter);

    switch (parameter) {
      case 0:
        this.displayDiv1 = !this.displayDiv1;
        break;
      case 1:
        this.displayDiv1 = !this.displayDiv1;
        break;
      case 2:
        this.displayDiv1 = !this.displayDiv1;
        break;
      default:
        // console.log('This is inside switch and the value is default');
        this.displayDiv1 = !this.displayDiv1;
        break;
    }
  }

  Content4() {
    this.displayDiv4 = !this.displayDiv4; // Toggle the display state
  }

  setActiveButton(buttonId: number): void {
    // this.activeButtonId = buttonId;
    if (this.activeButtonId === buttonId) {
      // If the same button is clicked again, toggle off
      this.activeButtonId = null; // or -1 if you prefer
    } else {
      // Otherwise, set the new active button
      this.activeButtonId = buttonId;
    }
  }
  handleButtonClick(buttonId: number): void {
    this.fetchSubCategoryList(buttonId); // Fetch subcategory list
    this.Content4(); // Perform other action
    this.setActiveButton(buttonId); // Toggle button state
  if(this.displayDiv6){
    this.displayDiv6=!this.displayDiv6
  }
  }
  parameter: any = 0;

  // This method sets the value of 'parameter' based on the button clicked
  setParameter(value: any): void {
    this.parameter = value;
  }

  reportSheduledfunction() {
    this.isTimeoutExpires = true;
  }

  async fetchChapterLists() {
    try {
      const data = await this.dynamicReports.fetchChapterLists();

      // Check if data is an object
      if (data && typeof data === 'object') {
        this.chapterList = data;
        const csv = this.chapterList;// Initialize chapterList as an empty array
        this.chapterlistmain=csv;
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            // Push key-value pair as an object into the chapterList array
            // this.chapterList.push({ key, value: data[key] });
          }
        }
      } else {
        console.error('Fetched data is not an object:', data);
      }
    } catch (error) {
      console.error('Error while fetching data: ', error);
    }
  }

  // chat gpt code both program and signup codes

  async fetchProgramCode(chapterCode: string, isChecked: boolean) {
    // Initialize or reset the program list
    // if (isChecked) {
      // If the checkbox is checked, add the chapterCode to the list
      console.log("Comes to fetch prgram code function");
      if (!this.chapterListSelecetd.includes(chapterCode)) {
        console.log("Comes to fetch prgram code if loop");
        this.chapterListSelecetd.push(chapterCode);
        this.filterList.push({ key: 'ChapterCode', value: chapterCode });
        // console.log('chapterListSelecetd checked: ' + this.chapterListSelecetd);
      }
    else {
      // If the checkbox is unchecked, remove the chapterCode from the list
      // this.chapterListSelecetd = this.chapterListSelecetd.filter(
      //   (code: string) => code !== chapterCode
      // );
      console.log("Comes to fetch prgram code else loop");

      let index = this.chapterListSelecetd.indexOf(chapterCode);
      if(index !== -1){
        // if(this.chapterListSelecetd.length > 0){
        this.chapterListSelecetd.splice(index,1);
        // }else{
        //   this.chapterListSelecetd = []
        // }
      }


      let index2 =     this.filterList.findIndex(item => item.key === 'ChapterCode' && item.value === chapterCode);
      console.log("the index number is: "+index2);
      if(index2!==-8){
        console.log("before deleting the filter list :"+JSON.stringify(this.filterList));
        this.filterList.splice(index2,1);
        console.log("After deleting the filter list :"+JSON.stringify(this.filterList));
      }
    console.log("the index2 index is number: "+index2);
      // this.filterList = this.filterList.filter(
      //   // (key:string, value:string) => {key = "chapter List", value !== chapterCode}
      // )
    }
  // }

    // Reset the program list
    this.programListSelected = [];
    try {
      // Loop through the list of selected chapters
      for (let item of this.chapterListSelecetd) {
        const parameter = { code: item, programCategory: '' };
        this.programCodeList = await this.dynamicReports.fetchProgramCode(
          parameter
        );
        const programcodel = this.programCodeList;
        this.programCodeMain=programcodel;
        this.programCodeList.forEach((program: any) => {
          if (!this.programListSelected.includes(program)) {
            this.programListSelected.push(program);
            const programcodel = this.programListSelected;
            this.programCodeMain=programcodel;
            console.log("this.programCodeMain"+JSON.stringify(this.programCodeMain));
            this.filteredProgramCode = [...this.programCodeMain];
            this.programCodePairs.push({
              key: item,
              value: program.description,
            });
          }
        });
      }

      // Check if any signUpCode matches the program.description
      this.signupListSelected.forEach((signup: any) => {
        const matchingKey = this.programCodePairs.find(
          (kv) => kv.value === signup.signUpCode
        );
        if (matchingKey) {
          console.log('Matching Key for SignUpCode:', matchingKey.key);
        }
      });
    } catch (error) {
      console.error('Error while fetching data: ', error);
    }
  }

  async fetchSignupCode(signupCode: string, isChecked: boolean) {
    // if (isChecked) {
      // If the checkbox is checked, add the signupCode to the list
      console.log("this is comes to signup code");
      if (!this.programListSelected2.includes(signupCode)) {
        this.programListSelected2.push(signupCode);
        this.filterList.push({ key: 'ProgramCode', value: signupCode });

        for(let i of this.filterList){
          console.log("the pushed item is: "+JSON.stringify(i))
        }
      }
    else {
      // If the checkbox is unchecked, remove the signupCode from the list
      console.log("comes to else of dsignup code");
      this.programListSelected2 = this.programListSelected2.filter(
        (code: string) => code !== signupCode
      );
      let index = this.programListSelected2.indexOf(signupCode);
      if(index !== -1){
        // if(this.chapterListSelecetd.length > 0){
        this.programListSelected2.splice(index,1);
    }
    // this.filterList.findIndex(item => item.key === 'ProgramCode' && item.value === signupCode);
    let index2 =     this.filterList.findIndex(item => item.key === 'ProgramCode' && item.value === signupCode);
    console.log("the index number is: "+index2);
    if(index2!==-8){
      console.log("before deleting the filter list :"+JSON.stringify(this.filterList));
      this.filterList.splice(index2,1);
      console.log("After deleting the filter list :"+JSON.stringify(this.filterList));
    }
  console.log("the index2 index is number: "+index2)
  }
// }
    try {
      // for (let item of this.programListSelected2) {
      const parameter = { programCode: signupCode };

       this.signUpCodeList = await this.dynamicReports.fetchSignUpCode(
        parameter
      );
      const signupl=this.signUpCodeList;
      this.signUpCodeMain=signupl;
      this.signUpCodeList.forEach((program: any) => {
        this.signUpCodePairs.push({
          key: signupCode,
          value: program.signUpCode,
        });
        if (!this.signupListSelected.includes(program)) {
          this.signupListSelected.push(program);
        }
      });
      // }
    } catch (error) {
      console.error('Error while fetching data: ', error);
    }

}
  getprogramcode(parameter: any) {
    console.log(this.signUpCodePairs);
    for (let item of this.signUpCodePairs) {
      if (item.value === parameter) {
        this.programcode = item.key;
      }
    }
  }

  getsignupcode(classic: any) {
    let parameforprogramcode = '';
    for (let item of this.classCodePairs) {
      if (item.value === classic) {
        parameforprogramcode = item.key;

        this.signupcode = item.key;
      }
    }
    this.getprogramcode(parameforprogramcode);
  }

  // getclasscode(parameters);
  getclasscode(parameters: any) {
    let paramforclasscode = '';
    console.log(this.subclassCodePairs);
    for (let item of this.subclassCodePairs) {
      if (parameters === item.value) {
        paramforclasscode = item.key;
        // console.log(
        //   'the key is :' + item.key + ' and the value is ' + item.value
        // );
        this.classcode = item.key;
      }
    }
    this.getsignupcode(paramforclasscode);
  }

  async fetchClassCode(parameters: any, isChecked: boolean) {
    this.getprogramcode(parameters);
    // if (isChecked) {
      // If the checkbox is checked, add the signupCode to the list
      if (!this.classListSelected.includes(parameters)) {
        this.classListSelected.push(parameters);
        this.filterList.push({ key: 'SignupCode', value: parameters });
      }
     else {
      // If the checkbox is unchecked, remove the signupCode from the list
      this.classListSelected = this.classListSelected.filter(
        (code: string) => code !== parameters
      );
      // let index2 = this.filterList.indexOf({key:'SignupCode', value:parameters});
      // this.filterList.findIndex(item => item.key === 'SignupCode' && item.value === parameters);


      let index2 = this.filterList.findIndex(item => item.key === 'SignupCode' && item.value === parameters);

      console.log("the index number is: "+index2);
      if(index2!==-8){
        console.log("before deleting the filter list :"+JSON.stringify(this.filterList));
        this.filterList.splice(index2,1);
        console.log("After deleting the filter list :"+JSON.stringify(this.filterList));
      }

    }
  // }
    this.signupcode = parameters;

    try {
      const parameter = {
        programCode: this.programcode,
        chapterCode: 'string',
        signupCodeCategory: 0,
        signupCode: this.signupcode,
        classCode: 'string',
        subClassCode: 'string',
      };

      this.classCode = await this.dynamicReports.fetchClassCode(parameter);
      const classCodel=this.classCode;
      this.classCodeMain=classCodel;

      this.classCode.forEach((program: any) => {
        if (!this.classListSelected2.includes(program)) {
          this.classListSelected2.push(program);
          const classCodel=this.classListSelected2;
          this.classCodeMain=classCodel;
          this.classCodePairs.push({
            key: this.signupcode,
            value: program.description,
          });
        }
      });
    } catch (error) {
      console.error('Error while fetching the data: ' + error);
    }
  }

  async fetchSubClassCode(parameters: any, isChecked: boolean) {
    this.getsignupcode(parameters);
    // if (isChecked) {
      if (!this.subclassSelected.includes(parameters)) {
        this.subclassSelected.push(parameters);
        this.filterList.push({ key: 'classCode', value: parameters });
      }
   else {
      this.subclassSelected = this.subclassSelected.filter(
        (code: string) => code !== parameters
      );

      let index2 =      this.filterList.findIndex(item => item.key === 'classCode' && item.value === parameters);

      if(index2!==-8){
        console.log("before deleting the filter list :"+JSON.stringify(this.filterList));
        this.filterList.splice(index2,1);
        console.log("After deleting the filter list :"+JSON.stringify(this.filterList));
      }


    }
  // }
    this.classcode = parameters;
    try {
      const parameter = {
        programCode: this.programcode,
        signupCode: this.signupcode,
        classCode: this.classcode,
        schoolGradeCode: 'string',
      };
      this.subClassCode = await this.dynamicReports.fetchSubClassCode(
        parameter
      );
      const subClassl=this.subClassCode;
      this.subClassMain = subClassl;
      this.subClassCode.forEach((program: any) => {
        if (!this.subclassListSelected2.includes(program)) {
          this.subclassListSelected2.push(program);
          this.subclassCodePairs.push({
            key: this.classcode,
            value: program.description,
          });
        }
      });
    } catch (error) {
      console.log('Error while fetching the Data : ' + error);
    }
  }

  async fetchSessionCode(parameters: any, isChecked: boolean) {
    console.log('teh fetch session got parameter si :' + parameters);
    this.getclasscode(parameters);
    // if (isChecked) {
      if (!this.sessionSelected.includes(parameters)) {
        this.sessionSelected.push(parameters);
        this.filterList.push({ key: 'subclassCode', value: parameters });
      }
    else {
      this.sessionSelected = this.sessionSelected.filter(
        (code: string) => code !== parameters
      );
      let index = this.sessionSelected.indexOf(parameters);
      if(index !== -1){
        // if(this.chapterListSelecetd.length > 0){
        this.sessionSelected.splice(index,1);
      }
      // this.filterList.findIndex(item => item.key === 'subclassCode' && item.value === parameters);
      let index2 = this.filterList.findIndex(item => item.key === 'subclassCode' && item.value === parameters);
      if(index2!==-8){
        console.log("before deleting the filter list :"+JSON.stringify(this.filterList));
        this.filterList.splice(index2,1);
        console.log("After deleting the filter list :"+JSON.stringify(this.filterList));
      }
    }
    this.subclasscode = parameters;

    try {
      const parameter = {
        programCode: this.programcode,
        familyId: 0,
        personId: this.modifiedBy,
        signupCode: this.signupcode,
      };
      this.sessionCode = await this.dynamicReports.fetchSessionCode(parameter);
      const sessionCodel =this.sessionCode;
      this.sessionCodeMain=sessionCodel;
      this.sessionCode.forEach((program: any) => {
        this.sessionCodePairs.push({
          key: this.subclasscode,
          value: program.description,
        });
        if (!this.sessionListSelected2.includes(program)) {
          this.sessionListSelected2.push(program);
        }
      });
    } catch (error) {
      console.log('Error while fetching the session Code : ' + error);
    }
  }

  async fetchedsessionCheckBoxes(parameters: any, isChecked: boolean) {

    // if (isChecked) {
      if (!this.sessionSelected.includes(parameters)) {
        this.sessionSelected.push(parameters);
        this.filterList.push({ key: 'SessionCode', value: parameters });
      }
    else {
      this.sessionSelected = this.sessionSelected.filter(
        (code: string) => code !== parameters
      );
      // this.filterList.findIndex(item => item.key === 'SessionCode' && item.value === parameters);
      let index2 = this.filterList.findIndex(item => item.key === 'SessionCode' && item.value === parameters);

      if(index2!==-8){
        console.log("before deleting the filter list :"+JSON.stringify(this.filterList));
        this.filterList.splice(index2,1);
        console.log("After deleting the filter list :"+JSON.stringify(this.filterList));
      }

    }
  }
  isDropdownOpenforSchedule = false;
  isDropdownOpen = false;
  isDropdownOpenforprogram = false;
  isDropdownOpenforsignup = false;
  isDropdownOpenforclass = false;
  isDropdownOpenforsubclass = false;
  isDropdownOpenforsession = false;
  selectedProgramCode: string | null = null;
  onCheckboxChangesss(event: any, key: string) {
    if (event.target.checked) {
      // Add the key to the array
      this.scheduleType = key;
      this.isDropdownOpenforSchedule = false;
      // this.isDropdownOpenforSchedule=!this.isDropdownOpenforSchedule
      // this.scheduleType.push(key);
    } else {
      // Remove the key from the array
      const index = this.scheduleType.indexOf(key);
      if (index > -1) {
        this.scheduleType.splice(index, 1);
      }
    }
  }

  toggleDropdownforScheduleType() {
    this.isDropdownOpenforSchedule = !this.isDropdownOpenforSchedule;
  }
  toggleDropdown() {

    const term = this.searchTerm.toLowerCase();
    this.filteredChapterList = this.chapterlistmain;
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpenforprogram === true) {
      this.isDropdownOpenforprogram = !this.isDropdownOpenforprogram;
    }
  }
  toggleDropdownforprogram() {
    this.filteredProgramCode = [...this.programCodeMain];
    this.isDropdownOpenforprogram = !this.isDropdownOpenforprogram;

    if (this.isDropdownOpen === true) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
    // this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpenforsignup === true) {
      this.isDropdownOpenforsignup = !this.isDropdownOpenforsignup;
    }
  }

  toggleDropdownforsignup() {
    this.filteredSignUpCode = this.signupListSelected
    this.isDropdownOpenforsignup = !this.isDropdownOpenforsignup;
    this.isDropdownOpenforprogram = !this.isDropdownOpenforprogram;
  }

  toggleDropdownforclass() {
     this.filteredClassCode = this.classListSelected2
    this.isDropdownOpenforclass = !this.isDropdownOpenforclass;
    this.isDropdownOpenforsignup = !this.isDropdownOpenforsignup;
  }

  toggleDropdownforsubclass() {
    this.filteredSubClassCode = this.subclassListSelected2
    this.isDropdownOpenforsubclass = !this.isDropdownOpenforsubclass;
    this.isDropdownOpenforclass = !this.isDropdownOpenforclass;
  }

  toggleDropdownforsession() {
    this.filteredSessionCode = this.sessionListSelected2
    this.isDropdownOpenforsession = !this.isDropdownOpenforsession;
    if (this.isDropdownOpenforsession === true) {
      this.isDropdownOpenforsubclass = !this.isDropdownOpenforsubclass;
    }
  }
  onCheckboxChange(chapterCode: string, event: any) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox) {
      this.fetchProgramCode(chapterCode, checkbox.checked);
    }
  }

  onCheckboxChangeforSignup(chapterCode: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox) {
      this.fetchSignupCode(chapterCode, checkbox.checked);
    }
  }

  onCheckboxChangeforclass(chapterCode: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox) {
      this.fetchClassCode(chapterCode, checkbox.checked);
    }
  }

  onCheckboxChangeforSubClass(chapterCode: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox) {
      this.fetchSubClassCode(chapterCode, checkbox.checked);
    }
  }

  onCheckboxChangeforSession(chapterCode: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox) {
      this.fetchSessionCode(chapterCode, checkbox.checked);
    }
  }

  onCheckboxChangeforSessionCheckboxes(chapterCode: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox) {
      this.fetchedsessionCheckBoxes(chapterCode, checkbox.checked);
    }
  }

  onProgramCodeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedProgramCode = selectElement.value;
  }
  toggleScheduledReports(index: number) {
    this.activeReportIndex = index;

}


toggleEditScheduleReports(index:number){
  this.editActiveReportIndex = index;
}

  async saveReportShedule() {
    let scheduleDateString: any = '';
    this.sheduleSelectedDate = this.sheduleSelectedDate;
    scheduleDateString = this.sheduleSelectedDate;
if(this.scheduleDate){

}
    let filterArray = this.filterList.map((item) => ({
      fieldName: item.key,
      fieldValue: item.value,
    }));

    for(let i of filterArray){
console.log("the each element is : "+JSON.stringify(i)+ " And the value is :"+JSON.stringify(i.fieldValue));

    }
    try {
      let param = {
        id: 0,
        reportId: this.reportId,
        reportName: this.reportName,
        filterList: filterArray,
        excelFileName: `${this.familyReportName}.csv`,
        scheduleDate: `${scheduleDateString}:00.000Z`,
        modifiedBy: this.modifiedBy,
        scheduleType: this.scheduleType,
        scheduleStatus: 'Active',
        reportPath: '',
      };
      this.saveReportSchedule = await this.dynamicReports.saveReportShedules(
        param
      );
    } catch (error) {
      console.error('Error while fetching data: ', error);
    }
  }
  //
  async saveReportShedules(parameter: any) {
    this.editReportShedule.csvFileName;

    try {
      let param = {
        id: this.editReportShedule.id,
        reportId: this.editReportShedule.reportId,
        reportName: this.editReportShedule.reportName,
        filterList: [
          {
            fieldName: '',
            fieldValue: '',
          },
        ],
        excelFileName: `${this.familyReportName}.csv`,
        scheduleDate: `${parameter}:00.000Z`,
        modifiedBy: 0,
        scheduleType: '',
        scheduleStatus: 'Active',
        reportPath: '',
      };
      this.saveReportSchedule = await this.dynamicReports.saveReportShedules(
        param
      );
    } catch (error) {
      console.error('Error while fetching data: ', error);
    }
  }
  // before checking that needs to call the save Api list
  savereportscheduleError: boolean = false;
  checkBeforeSaving() {
    if (
      this.familyReportName &&
      this.familyReportNameError === false &&
      this.chapterList.some(
        (chapters: { selected: any }) => chapters.selected
      ) &&
      this.scheduleType.length > 0 &&
      this.scheduleDate
    ) {
      this.savereportscheduleError = false;
this.saveReportShedule();

    } else {
      this.savereportscheduleError = true;
    }
  }
  updatereportscheduleError: boolean = false;
  checkBeforeUpdatingtheRoleList(scheduleDateforedit: any) {
    if (this.familyReportName && this.familyReportNameError === false) {
      this.familyReportNameError = false;
      if (this.scheduleDate) {
        this.updatereportscheduleError = false;
        this.saveReportShedules(scheduleDateforedit);
      } else {
        this.updatereportscheduleError = true;
      }
    } else {
      this.familyReportNameError = true;
    }
  }
/*

filterChapters() {
    const chapterListstored = this.chapterList;
    this.filteredChapterList = [...this.chapterList];
    const chapterListstored2 = this.filteredChapterList
    console.log("the chapterlist is "+JSON.stringify(chapterListstored));
    const term = this.searchTerm.toLowerCase();

    console.log("thesearched term is: "+term);
    console.log("thesearched term length is: "+term.length);
    this.filteredChapterList = this.chapterList.filter((chapter:any) =>
      chapter.description.toLowerCase().includes(term)
    );
    console.log(this.filteredChapterList);
    console.log("the lengthn of the filtered list :"+this.filteredChapterList.length)
    // const chapterListDtored = this.chapterList;
    //  if(this.filteredChapterList.length>0){
    if(term.length===0){
    // this.chapterList=chapterListstored;
    // this.filteredChapterList = [...this.chapterList];
    this.chapterList=this.chapterlistmain;
    }
    else if(term.length>0){
      this.chapterList=this.filteredChapterList;
    }
  }



*/






  // filteredChapterList=[...this.chapterList];
  // this.filteredChapterList = [...this.chapterList];
  // this.filteredChapterList = this.chapterlistmain;
  filterChapters() {
    // this.filteredChapterList = this.chapterlistmain;
    const term = this.searchTerm.toLowerCase();
    // console.log("The searched term is: " + term);
    // console.log("The searched term length is: " + term.length);
    // this.filteredChapterList = [...this.chapterList];
    // Filter based on the search term
    if (term.length === 0) {
      // If no search term, reset to the original chapter list
        // this.chapterList=chapterListstored;
      this.filteredChapterList = [...this.chapterList];
      // this.chapterList=this.filteredChapterList// Ensure we show all items
    } else {
      // Filter the chapter list based on the search term
      this.filteredChapterList = this.chapterList.filter((chapter: any) =>
        chapter.description.toLowerCase().includes(term)
      );
      // this.chapterList=this.filteredChapterList;
    }

  //   console.log("Filtered list: ", this.filteredChapterList);
  //   console.log("The length of the filtered list: " + this.filteredChapterList.length);
  }
//  filtered programCode
  filterProgramCode() {
    // this.filteredProgramCode = [...this.programListSelected];
    const term = this.searchTermProgramCode.toLowerCase();
       console.log("The searched term is: " + term);
    console.log("The searched term length is: " + term.length);
    if (term.length === 0) {
      this.filteredProgramCode = [...this.programListSelected];
      console.log(this.filterProgramCode);
    } else {
      this.filteredProgramCode = this.programListSelected.filter((program: any) =>
        program.description.toLowerCase().includes(term)
      );
    }

  }
// filltered signupCode

filterSignUpCode() {
  // this.filteredProgramCode = [...this.programListSelected];
  const term = this.searchTermSignUpCode.toLowerCase();
  if (term.length === 0) {
    this.filteredSignUpCode = [...this.signupListSelected];
    console.log(this.filterProgramCode);
  } else {
    this.filteredSignUpCode = this.signupListSelected.filter((program: any) =>
      program.description.toLowerCase().includes(term)
    );
  }
}

// filtered class code
filterClassCode() {
  // this.filteredProgramCode = [...this.programListSelected];
  const term = this.searchTermClassCode.toLowerCase();
  //    console.log("The searched term is: " + term);
  // console.log("The searched term length is: " + term.length);
  if (term.length === 0) {
    this.filteredClassCode = [...this.classListSelected2];
    console.log(this.filterProgramCode);
  } else {
    this.filteredClassCode = this.classListSelected2.filter((program: any) =>
      program.description.toLowerCase().includes(term)
    );
  }
}
// filtered Sub class

filterSubClassCode() {
  // this.filteredProgramCode = [...this.programListSelected];
  const term = this.searchTermSubClassCode.toLowerCase();
     console.log("The searched term is: " + term);
  console.log("The searched term length is: " + term.length);
  if (term.length === 0) {
    this.filteredSubClassCode = [...this.subclassListSelected2];
    console.log(this.filterProgramCode);
  } else {
    this.filteredSubClassCode = this.subclassListSelected2.filter((program: any) =>
      program.description.toLowerCase().includes(term)
    );
  }
}
filterSessionCode(){
  const term = this.searchTermSessionCode.toLowerCase();
     console.log("The searched term is: " + term);
  console.log("The searched term length is: " + term.length);
  if (term.length === 0) {
    this.filteredSessionCode = [...this.sessionListSelected2];
    console.log(this.filterProgramCode);
  } else {
    this.filteredSessionCode = this.sessionListSelected2.filter((program: any) =>
      program.description.toLowerCase().includes(term)
    );
  }
}
}
