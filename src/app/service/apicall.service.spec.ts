import { TestBed } from '@angular/core/testing';

import { APICALLService } from './apicall.service';

describe('APICALLService', () => {
  let service: APICALLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APICALLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
