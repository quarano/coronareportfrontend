import {SnackbarService} from './services/snackbar.service';
import {AngularMaterialModule} from './angular-material/angular-material.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WelcomeComponent} from './welcome/welcome.component';
import {AppRoutingModule} from './app-routing.module';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DiaryModule} from './diary/diary.module';
import {NotFoundComponent} from './not-found/not-found.component';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {WelcomeModule} from './welcome/welcome.module';
import { ContactModule } from './contact/contact.module';
import {AuthInterceptor} from './interceptors/auth-interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
    FormsModule,
    HttpClientModule,
    DiaryModule,
    WelcomeModule,
    ContactModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    SnackbarService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
