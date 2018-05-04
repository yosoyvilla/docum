import { TestBed, inject } from '@angular/core/testing';

import { DocumsService } from './docums.service';

describe('DocumsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumsService]
    });
  });

  it('should be created', inject([DocumsService], (service: DocumsService) => {
    expect(service).toBeTruthy();
  }));
});
