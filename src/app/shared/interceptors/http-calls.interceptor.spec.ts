import { TestBed } from '@angular/core/testing';

import { CheckTokenValidityInterceptor } from './check-token-validity-interceptor.service';

describe('CheckTokenValidityInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CheckTokenValidityInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CheckTokenValidityInterceptor = TestBed.inject(CheckTokenValidityInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
