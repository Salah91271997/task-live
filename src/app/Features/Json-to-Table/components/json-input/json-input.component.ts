import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { JsonData } from '../../interfaces/json-to-table';
import { JsonToTableService } from '../../services/json-to-table.service';

@Component({
  selector: 'app-json-input',
  templateUrl: './json-input.component.html',
  styleUrls: ['./json-input.component.scss'],
})
export class JsonInputComponent {
  jsonFormGroup: FormGroup = new FormGroup({});
  jsonErrorMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private jsonToTableService: JsonToTableService
  ) {}

  ngOnInit() {
    this.jsonFormGroup = this.fb.group({
      jsonData: ['', [Validators.required]],
    });
  }
  onPaste(event: any) {
    const clipboardData = event.clipboardData;
    if (clipboardData) {
      const pastedText = clipboardData.getData('text');
      this.parseAndStoreJsonData(pastedText);
    }
  }

  onChange(event: any) {
    const inputValue = event.target.value;
    this.parseAndStoreJsonData(inputValue);
  }

  private parseAndStoreJsonData(jsonText: string) {
    try {
      const jsonData: JsonData[] = JSON.parse(jsonText);
      this.jsonToTableService.storeJsonData([]);
      this.jsonToTableService.storeJsonData(jsonData);
      this.jsonErrorMessage = '';
    } catch (error) {
      this.jsonErrorMessage = 'Invalid JSON';
      this.jsonToTableService.storeJsonData([]);
    }
  }
}
