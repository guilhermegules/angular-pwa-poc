import { TestBed } from '@angular/core/testing';

import { BaseService } from './base.service';

describe('BaseService', () => {
  let service: BaseService<{ id: string }>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
