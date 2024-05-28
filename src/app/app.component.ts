import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationService } from './modules/i18n';
// language list
import { locale as enLang } from './modules/i18n/vocabs/en';
import { locale as chLang } from './modules/i18n/vocabs/ch';
import { locale as esLang } from './modules/i18n/vocabs/es';
import { locale as jpLang } from './modules/i18n/vocabs/jp';
import { locale as deLang } from './modules/i18n/vocabs/de';
import { locale as frLang } from './modules/i18n/vocabs/fr';
import { ThemeModeService } from './_metronic/partials/layout/theme-mode-switcher/theme-mode.service';
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
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
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

  async ngOnInit() {
    this.modeService.init();
    console.log(window.location.href);
    let currentURL = window.location.href;

    // Following condition is used if user landing from member registration portal. 
    if (currentURL.includes('?')) {
      const url = new URL(currentURL);

      // Get the value of the 'key' parameter
       const key = url.searchParams.get('key');

      // Get the value of the 'value' parameter
      const value = url.searchParams.get('value');
      let userAuth:any = { username: key, password: value };
      sessionStorage.setItem('userCred',JSON.stringify(userAuth));
      const user = await this.authService.login({ username: key, password: value });
      this.router.navigateByUrl("");
      return;
    }

    let  route= "/registration-processing";
    if(!this.authService.getLoggedInUser()){
      route="/auth";
    }
    this.router.navigateByUrl(route);
  }
}
