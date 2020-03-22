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
export class ContactEntryComponent implements OnInit {
  formGroup: FormGroup;

  tiles: Tile[] = [
    {text: '', cols: 1, rows: 1, color: 'white'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
