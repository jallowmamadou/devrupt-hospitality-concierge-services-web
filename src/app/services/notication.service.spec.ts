import { TestBed } from '@angular/core/testing';

import { NoticationService } from './notication.service';

describe('NoticationService', () => {
  let service: NoticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
