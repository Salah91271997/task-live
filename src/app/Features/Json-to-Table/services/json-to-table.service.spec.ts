import { TestBed } from '@angular/core/testing';

import { JsonToTableService } from './json-to-table.service';

describe('JsonToTableService', () => {
  let service: JsonToTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonToTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
