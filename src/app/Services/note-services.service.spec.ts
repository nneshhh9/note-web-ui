import { TestBed } from '@angular/core/testing';

import { NoteServicesService } from './note-services.service';

describe('NoteServicesService', () => {
  let service: NoteServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
