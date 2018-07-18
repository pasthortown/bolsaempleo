import { TestBed, inject } from '@angular/core/testing';

import { PostulanteService } from './postulante.service';

describe('PostulanteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostulanteService]
    });
  });

  it('should be created', inject([PostulanteService], (service: PostulanteService) => {
    expect(service).toBeTruthy();
  }));
});
