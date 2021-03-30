import { TestBed } from '@angular/core/testing';
import { ReservationResolver } from './reservation.resolver';

describe('ReservationService', () => {
  let service: ReservationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
