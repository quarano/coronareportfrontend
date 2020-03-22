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
  selector: 'app-diary-entry',
  templateUrl: './diary-entry.component.html',
  styleUrls: ['./diary-entry.component.scss']
})
export class DiaryEntryComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  diaryEntry: DiaryEntry;
  nonCharacteristicSymptoms: Symptom[] = [];
  characteristicSymptoms: Symptom[] = [];
  today = new Date();
  apiSubscription: Subscription;

  get isNew(): boolean {
    return this.diaryEntry?.id == null;
  }

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private snackbarService: SnackbarService) { }

  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }

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
    if (this.formGroup.valid) {
      Object.assign(this.diaryEntry, this.formGroup.value);
      if (this.isNew) {
        this.createEntry();
      } else {
        this.modifyEntry();
      }
    }
  }

  createEntry() {
    this.apiSubscription = this.apiService
      .createDiaryEntry(this.diaryEntry)
      .subscribe(_ => this.snackbarService.success('Tagebuch-Eintrag erfolgreich angelegt'));
  }

  modifyEntry() {
    this.apiSubscription = this.apiService
      .modifyDiaryEntry(this.diaryEntry)
      .subscribe(_ => this.snackbarService.success('Tagebuch-Eintrag erfolgreich aktualisiert'));
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
    this.formGroup.markAsDirty();
  }
}
