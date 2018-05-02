import { TestBed, async, inject } from '@angular/core/testing';

import { OnlyloggedinusersGuard } from './onlyloggedinusers.guard';

describe('OnlyloggedinusersGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlyloggedinusersGuard]
    });
  });

  it('should ...', inject([OnlyloggedinusersGuard], (guard: OnlyloggedinusersGuard) => {
    expect(guard).toBeTruthy();
  }));
});
