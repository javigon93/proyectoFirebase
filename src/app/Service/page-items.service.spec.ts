import { TestBed } from '@angular/core/testing';

import { PageItemsService } from './page-items.service';

describe('PageItemsService', () => {
  let service: PageItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
