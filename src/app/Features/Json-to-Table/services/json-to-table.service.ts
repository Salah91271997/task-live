import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JsonData } from '../interfaces/json-to-table';

@Injectable({
  providedIn: 'root',
})
export class JsonToTableService {
  private jsonDataSubject = new BehaviorSubject<JsonData[]>([]);
  jsonData$: Observable<JsonData[]> = this.jsonDataSubject.asObservable();

  storeJsonData(jsonData: JsonData[]) {
    this.jsonDataSubject.next(jsonData);
    console.log('JSON data stored:', this.jsonDataSubject.value);
  }
}
