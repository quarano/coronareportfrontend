import { SubSink } from 'subsink';
import { SnackbarService } from './../../services/snackbar.service';
import { Subscription } from 'rxjs';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DiaryEntryDto } from 'src/app/models/diary-entry';
import { ActivatedRoute } from '@angular/router';
import { SymptomDto } from 'src/app/models/symptom';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSelectChange } from '@angular/material/select';
import { ContactPersonDto } from 'src/app/models/contact-person';

export interface Tile {
  text: string;
  cols: number;
  rows: number;
  color: string;
}

@Component({
  selector: 'app-contact-entry',
  templateUrl: './contact-entry.component.html',
  styleUrls: ['./contact-entry.component.scss']
})
export class ContactEntryComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  contactPerson: ContactPersonDto;
  private subs = new SubSink();

  tiles: Tile[] = [
    { text: '', cols: 1, rows: 1, color: 'white' },
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  get isNew() {
    return (!this.contactPerson.id);
  }

  ngOnInit() {
    this.subs.add(this.route.data.subscribe(data => {
      this.contactPerson = data.contactPerson;
    }));
  }

}
