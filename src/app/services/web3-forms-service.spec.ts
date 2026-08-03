import { TestBed } from '@angular/core/testing';

import { Web3FormsService } from './web3-forms-service';

describe('Web3FormsService', () => {
  let service: Web3FormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Web3FormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
