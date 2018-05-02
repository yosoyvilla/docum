import { TestBed, async, inject } from '@angular/core/testing';

import { AlwaysauthGuard } from './alwaysauth.guard';

describe('AlwaysauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlwaysauthGuard]
    });
  });

  it('should ...', inject([AlwaysauthGuard], (guard: AlwaysauthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
