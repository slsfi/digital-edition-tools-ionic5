import { TestBed } from '@angular/core/testing';

import { ManuscriptService } from './manuscript.service';

describe('ManuscriptService', () => {
  let service: ManuscriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManuscriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
