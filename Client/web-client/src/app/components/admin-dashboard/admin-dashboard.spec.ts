import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AdminDashboard } from './admin-dashboard';
import { MoodService } from '../../services/mood.service';

describe('AdminDashboard', () => {
  let component: AdminDashboard;
  let fixture: ComponentFixture<AdminDashboard>;
  let moodServiceSpy: jasmine.SpyObj<MoodService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MoodService', ['getAdminLogs']);

    await TestBed.configureTestingModule({
      declarations: [AdminDashboard],
      providers: [{ provide: MoodService, useValue: spy }]
    }).compileComponents();

    moodServiceSpy = TestBed.inject(MoodService) as jasmine.SpyObj<MoodService>;
    fixture = TestBed.createComponent(AdminDashboard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize admin logs from service', () => {
    const logs = [{ id: 1, mood: 'Happy', ipAddress: '127.0.0.1', createdAt: new Date(), note: 'Good' }];
    moodServiceSpy.getAdminLogs.and.returnValue(of(logs));

    component.ngOnInit();

    expect(moodServiceSpy.getAdminLogs).toHaveBeenCalled();
    expect(component.adminLogs).toEqual(logs);
  });
});
