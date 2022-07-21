import { TestBed } from '@angular/core/testing';

import { StudymaterialsService } from './studymaterials.service';

describe('StudymaterialsService', () => {
  let service: StudymaterialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudymaterialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
