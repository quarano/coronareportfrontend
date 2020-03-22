import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';


import { SnackbarService } from './../../services/snackbar.service';
import { Subscription } from 'rxjs';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DiaryEntry } from 'src/app/models/diary-entry';
import { ActivatedRoute } from '@angular/router';
import { Symptom } from 'src/app/models/symptom';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSelectChange } from '@angular/material/select';





@Component({
  selector: 'app-contact-entry',
  templateUrl: './contact-entry.component.html',
  styleUrls: ['./contact-entry.component.scss']
})
export class ContactEntryComponent implements OnInit {
  formGroup: FormGroup;

<<<<<<< HEAD
  tiles: Tile[] = [
    {text: '', cols: 1, rows: 1, color: 'white'},

  ];

=======
>>>>>>> f5316e77e77e20bd52d4c2e391e494a16c4de46d

  constructor() { }

  ngOnInit() {
  }

}
