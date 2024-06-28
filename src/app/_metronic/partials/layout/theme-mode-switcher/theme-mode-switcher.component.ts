import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeModeService, ThemeModeType } from './theme-mode.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-theme-mode-switcher',
  templateUrl: './theme-mode-switcher.component.html',
})
export class ThemeModeSwitcherComponent implements OnInit {
  @Input() toggleBtnClass: string = '';
  @Input() toggleBtnIconClass: string = 'svg-icon-2';
  @Input() menuPlacement: string = 'bottom-end';
  @Input() menuTrigger: string = "{default: 'click', lg: 'hover'}";
  mode$: Observable<ThemeModeType>;
  menuMode$: Observable<ThemeModeType>;
  loginUserData:any;
  constructor(private modeService: ThemeModeService, private route:Router) {}

  ngOnInit(): void {
    this.mode$ = this.modeService.mode.asObservable();
    this.menuMode$ = this.modeService.menuMode.asObservable();
    this.loginUserData = JSON.parse(sessionStorage.getItem('profileData') || '');
  }

  switchMode(_mode: ThemeModeType): void {
    this.modeService.switchMode(_mode);
  }


  onLogOutButtonClick(){
    window.location.href = environment.memberRegPortalURL;
    sessionStorage.removeItem('profileData');
   // this.route.navigate(['/auth/login'])
  }
}
