import { Component,OnInit } from '@angular/core';
import { MoodService, MoodEntryDto } from '../../services/mood.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-tracker',
  templateUrl: './user-tracker.component.html',
  styleUrls: ['./user-tracker.component.scss']
})
export class UserTrackerComponent {
  moodOptions = ['Not good at all', 'A bit “meh”', 'Pretty good', 'Feeling great'];
  selectedMood = '';
  noteText = '';
  errorMessage = '';
  successMessage = '';
  isAdmin = false;

  constructor(private moodService: MoodService, private authService: AuthService) {}
  ngOnInit() {
      this.authService.isAdmin().subscribe({
        next: (data) => this.isAdmin = data,
        error: (err) => console.error('Failed to load admin status', err)
      });
    }

  submitMood() {
    this.errorMessage = '';
    this.successMessage = '';

    const payload: MoodEntryDto = { mood: this.selectedMood, note: this.noteText };

    this.moodService.addMood(payload).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'An error occurred while tracking your mood.';
      }
    });
  }
}
