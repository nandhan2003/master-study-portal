import { TestBed } from '@angular/core/testing';

import { AddmaterialService } from './addmaterial.service';

describe('AddmaterialService', () => {
  let service: AddmaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddmaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
