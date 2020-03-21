import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DiaryEntry } from 'src/app/models/diary-entry';

@Component({
  selector: 'app-diary-entry',
  templateUrl: './diary-entry.component.html',
  styleUrls: ['./diary-entry.component.css']
})
export class DiaryEntryComponent implements OnInit {
  formGroup: FormGroup;
  diaryEntry: DiaryEntry;

  get isNew(): boolean {
    return this.diaryEntry?.id == null;
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group(
      {
        bodyTemperature: new FormControl(this.diaryEntry.bodyTemperature, Validators.required),
      }
    );
  }

  onSubmit() {

  }
}
