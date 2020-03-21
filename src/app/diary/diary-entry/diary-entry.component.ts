import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DiaryEntry } from 'src/app/models/diary-entry';
import { ActivatedRoute } from '@angular/router';
import { Symptom } from 'src/app/models/symptom';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-diary-entry',
  templateUrl: './diary-entry.component.html',
  styleUrls: ['./diary-entry.component.scss']
})
export class DiaryEntryComponent implements OnInit {
  formGroup: FormGroup;
  diaryEntry: DiaryEntry;
  nonCharacteristicSymptoms: Symptom[] = [];
  characteristicSymptoms: Symptom[] = [];

  get isNew(): boolean {
    return this.diaryEntry?.id == null;
  }

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.diaryEntry = data['diaryEntry'];
      this.setSymptoms(data['symptoms']);
    });
    this.buildForm();
  }

  setSymptoms(symptoms: Symptom[]) {
    symptoms.forEach(symptom => {
      if (symptom.isCharacteristic) {
        this.characteristicSymptoms.push(symptom);
      } else {
        this.nonCharacteristicSymptoms.push(symptom);
      }
    });
  }

  buildForm() {
    this.formGroup = this.formBuilder.group(
      {
        bodyTemperature: new FormControl(this.diaryEntry.bodyTemperature, Validators.required),
        characteristicSymptoms: new FormControl(this.diaryEntry.characteristicSymptoms),
        nonCharacteristicSymptoms: new FormControl(this.diaryEntry.nonCharacteristicSymptoms),
        date: new FormControl(this.diaryEntry.date, Validators.required)
      }
    );
  }

  onSubmit() {

  }

  onSlideToggleChanged(event: MatSlideToggleChange, symptomId: string) {
    const control = this.formGroup.controls['characteristicSymptoms'];
    let values = control.value as string[];

    if (event.checked) {
      values.push(symptomId);
    } else {
      values = values.filter(value => value !== symptomId);
    }

    control.setValue(values);
  }
}
