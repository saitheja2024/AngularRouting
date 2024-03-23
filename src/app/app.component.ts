import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TranslationService} from './modules/i18n';
// language list
import {locale as enLang} from './modules/i18n/vocabs/en';
import {locale as chLang} from './modules/i18n/vocabs/ch';
import {locale as esLang} from './modules/i18n/vocabs/es';
import {locale as jpLang} from './modules/i18n/vocabs/jp';
import {locale as deLang} from './modules/i18n/vocabs/de';
import {locale as frLang} from './modules/i18n/vocabs/fr';
import {ThemeModeService} from './_metronic/partials/layout/theme-mode-switcher/theme-mode.service';
import { SpinnerService } from './modules/chinmaya-shared/services/spinner/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './modules/auth';

@Component({
  // tslint:disable-next-line:component-selector
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private translationService: TranslationService,
    private modeService: ThemeModeService,
    public spinnerService: SpinnerService,
    private activatedRoute:ActivatedRoute,
    private authService:AuthService,
    private router:Router
  ) {
    // register translations
    this.translationService.loadTranslations(
      enLang,
      chLang,
      esLang,
      jpLang,
      deLang,
      frLang
    );
  }

   ngOnInit() {
    this.modeService.init();
    this.activatedRoute.queryParams.subscribe(async (params:any) => {
      let userName = params["key"];
      console.log(userName);
      if(!userName){
        this.router.navigateByUrl("/auth");
        console.log("returning to login page");
        return;
      }
      const user = await this.authService.login({username:userName,password:"123456"});
      this.router.navigateByUrl("")
    });
  }
}
