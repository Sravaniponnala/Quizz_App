import { TestBed } from '@angular/core/testing';

import { QuizzservicesService } from './quizzservices.service';

describe('QuizzservicesService', () => {
  let service: QuizzservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizzservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
