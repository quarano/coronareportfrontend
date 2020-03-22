import { ContactEntryComponent } from './contact-entry/contact-entry.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from './contact-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { ContactPersonsResolver } from '../resolvers/contact-persons.resolver';

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule,
    AngularMaterialModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    PortalModule,
    ScrollingModule
  ],
  declarations: [ContactComponent, ContactEntryComponent],
  providers: [ContactPersonsResolver]
})
export class ContactModule { }
