import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
// #fake-start#
import { FakeAPIService } from './_fake/fake-api.service';
import { ChinmayaSharedModule } from './modules/chinmaya-shared/chinmaya-shared.module';
import { SpinnerInterceptor } from './modules/chinmaya-shared/interceptors/SpinnerInterceptor/spinner.interceptor';
//import { RegistrationProcessingComponent } from './configuration/registration-processing/registration-processing.component';
  

// #fake-end#



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    ChinmayaSharedModule,
    ClipboardModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
