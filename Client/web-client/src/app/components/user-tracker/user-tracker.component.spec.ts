import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { UserTrackerComponent } from './user-tracker.component';
import { MoodService } from '../../services/mood.service';
import { AuthService } from '../../services/auth.service';

describe('UserTrackerComponent', () => {
  let component: UserTrackerComponent;
  let fixture: ComponentFixture<UserTrackerComponent>;
  let moodServiceSpy: jasmine.SpyObj<MoodService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const moodSpy = jasmine.createSpyObj('MoodService', ['addMood']);
    const authSpy = jasmine.createSpyObj('AuthService', ['isAdmin']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [UserTrackerComponent],
      providers: [
        { provide: MoodService, useValue: moodSpy },
        { provide: AuthService, useValue: authSpy }
      ]
    }).compileComponents();

    moodServiceSpy = TestBed.inject(MoodService) as jasmine.SpyObj<MoodService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authServiceSpy.isAdmin.and.returnValue(of(true));

    fixture = TestBed.createComponent(UserTrackerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isAdmin after init', () => {
    component.ngOnInit();
    expect(component.isAdmin).toBeTrue();
  });

  it('should submit mood and show success message', () => {
    component.selectedMood = 'Feeling great';
    component.noteText = 'Great day!';
    moodServiceSpy.addMood.and.returnValue(of({ message: 'Mood recorded successfully!' }));

    component.submitMood();

    expect(moodServiceSpy.addMood).toHaveBeenCalledWith({ mood: 'Feeling great', note: 'Great day!' });
    expect(component.successMessage).toBe('Mood recorded successfully!');
    expect(component.errorMessage).toBe('');
  });

  it('should show error message when submit fails', () => {
    component.selectedMood = 'Pretty good';
    component.noteText = 'Okay day';
    const errorResponse = { error: { message: 'Unable to save mood' } };
    moodServiceSpy.addMood.and.returnValue(throwError(() => errorResponse));

    component.submitMood();

    expect(moodServiceSpy.addMood).toHaveBeenCalledWith({ mood: 'Pretty good', note: 'Okay day' });
    expect(component.errorMessage).toBe('Unable to save mood');
    expect(component.successMessage).toBe('');
  });

  it('should render admin link when user is admin', () => {
    component.isAdmin = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a[routerlink]')).toBeTruthy();
    expect(compiled.querySelector('a')?.textContent).toContain('Admin Logs');
  });
});
