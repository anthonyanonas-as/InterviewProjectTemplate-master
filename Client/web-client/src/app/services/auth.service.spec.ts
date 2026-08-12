import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.removeItem('isAdmin');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when localStorage is not set', (done) => {
    localStorage.removeItem('isAdmin');
    service.isAdmin().subscribe(value => {
      expect(value).toBeFalse();
      done();
    });
  });

  it('should return true when localStorage value is true', (done) => {
    localStorage.setItem('isAdmin', 'true');
    service.isAdmin().subscribe(value => {
      expect(value).toBeTrue();
      done();
    });
  });
});
