import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MoodService, MoodEntryDto } from './mood.service';

describe('MoodService', () => {
  let service: MoodService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoodService]
    });

    service = TestBed.inject(MoodService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send mood entry to API', () => {
    const payload: MoodEntryDto = { mood: 'Happy', note: 'Unit testing' };

    service.addMood(payload).subscribe(response => {
      expect(response).toEqual({ message: 'Mood recorded successfully!' });
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush({ message: 'Mood recorded successfully!' });
  });

  it('should fetch admin logs from API', () => {
    const mockLogs = [{ id: 1, mood: 'Happy' }, { id: 2, mood: 'Sad' }];

    service.getAdminLogs().subscribe(logs => {
      expect(logs).toEqual(mockLogs);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/admin-logs`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLogs);
  });
});
