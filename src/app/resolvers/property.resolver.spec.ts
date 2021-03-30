import { TestBed } from '@angular/core/testing';
import { PropertyResolver } from './property.resolver';

describe('PropertyService', () => {
  let service: PropertyResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
