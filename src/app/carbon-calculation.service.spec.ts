import { TestBed } from '@angular/core/testing';

import { CarbonCalculationService } from './carbon-calculation.service';

describe('CarbonCalculationService', () => {
  let service: CarbonCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarbonCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
