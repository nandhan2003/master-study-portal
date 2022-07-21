import { TestBed } from '@angular/core/testing';

import { AddquestionService } from './addquestion.service';

describe('AddquestionService', () => {
  let service: AddquestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddquestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
