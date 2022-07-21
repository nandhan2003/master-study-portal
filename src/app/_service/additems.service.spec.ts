import { TestBed } from '@angular/core/testing';

import { AdditemsService } from './additems.service';

describe('AdditemsService', () => {
  let service: AdditemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
