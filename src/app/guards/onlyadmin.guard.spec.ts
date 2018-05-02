import { TestBed, async, inject } from '@angular/core/testing';

import { OnlyAdminGuard } from './onlynonadmin.guard';

describe('OnlyAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlyAdminGuard]
    });
  });

  it('should ...', inject([OnlyAdminGuard], (guard: OnlyAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
