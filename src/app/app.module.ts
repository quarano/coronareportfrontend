import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {environment} from '../environments/environment';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {provide: 'BACKEND_API_URL', useValue: environment.api.baseUrl},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
