import { TestBed, inject } from '@angular/core/testing';

import { FirebaseBDDService } from './firebase-bdd.service';

describe('FirebaseBDDService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseBDDService]
    });
  });

  it('should be created', inject([FirebaseBDDService], (service: FirebaseBDDService) => {
    expect(service).toBeTruthy();
  }));
});
