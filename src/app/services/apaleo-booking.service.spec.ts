import { TestBed } from '@angular/core/testing';

import { ApaleoBookingService } from './apaleo-booking.service';

describe('ApaleoBookingService', () => {
  let service: ApaleoBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApaleoBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
