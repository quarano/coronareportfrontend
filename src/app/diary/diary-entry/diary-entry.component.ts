import { SubSink } from 'subsink';
import { DiaryEntryModifyDto } from './../../models/diary-entry';
import { SnackbarService } from './../../services/snackbar.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DiaryEntryDto } from 'src/app/models/diary-entry';
import { ActivatedRoute, Router } from '@angular/router';
import { SymptomDto } from 'src/app/models/symptom';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-diary-entry',
  templateUrl: './diary-entry.component.html',
  styleUrls: ['./diary-entry.component.scss']
})
export class DiaryEntryComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  diaryEntry: DiaryEntryDto;
  nonCharacteristicSymptoms: SymptomDto[] = [];
  characteristicSymptoms: SymptomDto[] = [];
  today = new Date();
  private subs = new SubSink();

  get isNew(): boolean {
    return this.diaryEntry?.id == null;
  }

  get isReadonly(): boolean {
    return this.diaryEntry.transmittedToHealthDepartment;
  }

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    this.subs.add(this.route.data.subscribe(data => {
      this.diaryEntry = data.diaryEntry;
      this.setSymptoms(data.symptoms);
    }));
    this.buildForm();
  }

  setSymptoms(symptoms: SymptomDto[]) {
    symptoms.forEach(symptom => {
      if (symptom.characteristic) {
        this.characteristicSymptoms.push(symptom);
      } else {
        this.nonCharacteristicSymptoms.push(symptom);
      }
    });
  }

  buildForm() {
    const characteristicSymptomIds = this.diaryEntry.characteristicSymptoms.map(s => s.id);
    this.formGroup = this.formBuilder.group(
      {
        bodyTemperature: new FormControl({ value: this.diaryEntry.bodyTemperature, disabled: this.isReadonly }, Validators.required),
        characteristicSymptoms: new FormControl({ value: characteristicSymptomIds, disabled: this.isReadonly }),
        nonCharacteristicSymptoms: new FormControl({ value: this.diaryEntry.nonCharacteristicSymptoms, disabled: this.isReadonly }),
        dateTime: new FormControl({ value: this.diaryEntry.dateTime, disabled: this.isReadonly }, Validators.required)
      }
    );
  }

  onSubmit() {
    if (this.formGroup.valid && !this.diaryEntry.transmittedToHealthDepartment) {
      const diaryEntryModifyDto: DiaryEntryModifyDto
        = { id: null, bodyTemperature: null, symptoms: [], dateTime: null };
      diaryEntryModifyDto.symptoms = this.characteristicSymptomsControl.value;
      diaryEntryModifyDto.id = this.diaryEntry.id;
      diaryEntryModifyDto.bodyTemperature = this.formGroup.controls.bodyTemperature.value;
      diaryEntryModifyDto.dateTime = this.formGroup.controls.dateTime.value;
      diaryEntryModifyDto.symptoms.push(...this.formGroup.controls.nonCharacteristicSymptoms.value);
      console.log(diaryEntryModifyDto);

      if (this.isNew) {
        this.createEntry(diaryEntryModifyDto);
      } else {
        this.modifyEntry(diaryEntryModifyDto);
      }
    }
  }

  createEntry(diaryEntry: DiaryEntryModifyDto) {
    this.subs.add(this.apiService
      .createDiaryEntry(diaryEntry)
      .subscribe(_ => {
        this.snackbarService.success('Tagebuch-Eintrag erfolgreich angelegt');
        this.router.navigate(['/diary']);
      }));
  }

  modifyEntry(diaryEntry: DiaryEntryModifyDto) {
    this.subs.add(this.apiService
      .modifyDiaryEntry(diaryEntry)
      .subscribe(_ => {
        this.snackbarService.success('Tagebuch-Eintrag erfolgreich aktualisiert');
        this.router.navigate(['/diary']);
      }));
  }

  onSlideToggleChanged(event: MatSlideToggleChange, symptomId: string) {
    const control = this.characteristicSymptomsControl;
    let values = control.value as string[];

    if (event.checked) {
      values.push(symptomId);
    } else {
      values = values.filter(value => value !== symptomId);
    }

    control.setValue(values);
    this.formGroup.markAsDirty();
  }

  get characteristicSymptomsControl() {
    return this.formGroup.controls.characteristicSymptoms;
  }

  isCharacteristicSymptomSelected(symptom: SymptomDto) {
    const selectedValues = this.characteristicSymptomsControl.value as string[];
    return selectedValues.includes(symptom.id);
  }
}
