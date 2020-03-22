import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WelcomeComponent} from './welcome.component';
import {WelcomeRoutingModule} from './welcome-routing.module';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { CreateUserComponent } from './create-user/create-user.component';



@NgModule({
  declarations: [
    WelcomeComponent,
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ClipboardModule,
  ]
})
export class WelcomeModule { }
