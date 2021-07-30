import { TestBed } from '@angular/core/testing';

import { DatabaseTranslationService } from './database-translation.service';

describe('DatabaseTranslationService', () => {
  let service: DatabaseTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseTranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
