import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth';
import { MasterService } from 'src/app/modules/chinmaya-shared/services/master/master.service';
import { StoreService } from 'src/app/modules/chinmaya-shared/services/store/store.service';
import { Subscription } from 'rxjs';
import { MatTable } from '@angular/material/table';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlertService } from 'src/app/modules/chinmaya-shared/services/alert/alert.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss'],
})
export class StudentAttendanceComponent implements OnInit, OnDestroy {
  selected = 'option2';
  studentCheck: any[] = [];
  selectedClasscode: string = '';
  studentlistdetails: any[] = [];
  studentList: any = {};
  classcode: any[] = [];
  absent: number = 0;
  present: number = 0;
  todayDate: string;
  private subscriptions: Subscription[] = [];
  personid: any;
  parameter2: { personID: any; id?: string } = { personID: null };
  attendanceCheck: any;
  attendancePayload: string;
  studentList2: any;
  currentUserData:any;
  studentHasAttendasuStatus: boolean;
  constructor(
    private masterService: MasterService,
    private store: StoreService,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private alertService:AlertService,
  ) {
    // for getting Current date
    const date = new Date();
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = monthNames[monthIndex];
    const daySuffix = this.getDaySuffix(day);
    this.todayDate = `${month} ${day}${daySuffix}, ${year}`;
  }

  getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  ngOnInit() {
    this.currentUserData = this.authService.getLoggedInUser();

    this.personid = this.currentUserData.personID;
    this.fetchData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  flagtoggleChange:any=false;
  // fetching data of classcode and studentList
  async fetchData() {
    try {
      const parameter = { personID: this.personid };
      this.classcode = await this.masterService.fetchClassCode(parameter);
      if (this.selectedClasscode) {
        this.parameter2 = {
          personID: this.personid,
          id: this.selectedClasscode,
        };
      } else if (this.classcode.length > 0) {
        this.parameter2 = {
          personID: this.personid,
          id: this.classcode[0].code,
        };
      }
      const { studentlist, studentlistdetails } =
      await this.masterService.fetchStudentList(this.parameter2);
      this.studentList = studentlist || {};
      this.studentList2 = studentlist.orders2;
      this.studentlistdetails = studentlistdetails || [];
      this.present = this.presentCount(); 
      this.absent = this.absentCount();

      // Initialize present status for all students
      this.studentlistdetails.forEach((student) => {
        student.present =(student.attendanceStatus=='A')?false :true;
        
      });

      this.studentHasAttendasuStatus=false;
      for(let i=0;i<this.studentlistdetails.length;i++){
        if(this.studentlistdetails[i].attendanceStatus){
          this.studentHasAttendasuStatus=true;
          break;
        }
        
        
      }

      // Fetch status after data is available
      this.fetchstatus();

      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error fetching data:', error);
      this.classcode = [];
      this.studentList = {};
      this.studentlistdetails = [];
      this.present = 0;
      this.absent = 0;
    }
  }
  // when we submit the attendace class below function is executed
  async SubmitAttendance() {


    try {
      const payload = {
        studentAttendanceList: this.studentCheck,
      };

      if (payload.studentAttendanceList.length !== 0) {
        this.attendanceCheck = await this.masterService.postingAttendance(
          payload
        );

        setTimeout(()=>{ this.fetchData()},250);
      } else {
        Swal.fire({

          icon: 'warning',
          title: 'This class is Empty so unable to submit the attendance',
          showConfirmButton: true,
          timer: 2000,
        });
        // this.alertService.showErrorALert("This class is Empty so unable to submit the attendance");
      }
    } catch (error) {
      console.error('Error submitting attendance:', error);
      this.classcode = [];
      this.studentList = {};
      this.studentlistdetails = [];
      this.present = 0;
      this.absent = 0;
    }
  }
  // rendering before submitting the Attendance
  fetchstatus() {
    this.studentCheck = [];
    for (let item1 of this.studentlistdetails) {
      this.studentCheck.push({
        chapterId: item1.chapterCode,
        programCode: this.studentList.programCode,
        signUpCode: this.studentList.signupCode,
        classField: this.studentList.classField,
        subClass: this.studentList.subClass,
        sessionID: this.studentList.sessionAssognment,
        teacherID: this.studentList.teacherPersonId,
        studentPersonID: item1.personID,
        studentFamilyID: item1.familyId,
        attendanceStatus: item1.present ? 'P' : 'A',
        modifiedBy: this.currentUserData.personID,
        dateOfAttendance: new Date().toISOString(),
        registrationId: item1.registrationId,
        attendanceRecordId: (item1.attendanceRecordId)?item1.attendanceRecordId:0,
      });
    }
  }
  //  this onClassChange calls when we change the class
  onClasschange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedClasscode = selectElement.value;

    // fetchData function calls here
    this.fetchData();
    this.cdr.detectChanges();
  }
  // this function calls when we click on attendance toggle button
  toggleAttendance(event: Event, index: number): void {
    const checkbox = event.target as HTMLInputElement;
    this.studentlistdetails[index].present = !checkbox.checked;

    if (this.studentCheck[index].attendanceStatus=='A') {
      this.studentCheck[index].attendanceStatus = 'P';
    } else {
      this.studentCheck[index].attendanceStatus = 'A';
    }
    this.studentHasAttendasuStatus = true;
    if (this.studentCheck[index].attendanceStatus=='P') {
      if(this.absent>0){
        this.absent--;
      }
      this.present++;

    } else {
      this.absent++;
      if(this.present>0){
        this.present--;
      }

    }

    // if(this.present==0){
    //   this.studentHasAttendasuStatus=false;
    // }
  }

  // For tracking of classcode
  trackByCode(index: number, item: any): string {
    return item.code;
  }

  absentCount(){
   let absentData = this.studentlistdetails.filter((item:any) =>{
    return item.attendanceStatus=='A';
   });
   return absentData.length;

  }

  presentCount(){
    let presentData = this.studentlistdetails.filter((item:any) =>{
      return item.attendanceStatus=='P';
     });
     if(presentData.length==0){
      return this.studentlistdetails.length;
     }
     return presentData.length;
  }
}
