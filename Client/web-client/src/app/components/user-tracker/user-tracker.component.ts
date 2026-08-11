import { Component } from '@angular/core';
import { MoodService, MoodEntryDto } from '../../services/mood.service';

@Component({
  selector: 'app-user-tracker',
  templateUrl: './user-tracker.component.html'
})
export class UserTrackerComponent {
  moodOptions = ['Not good at all', 'A bit “meh”', 'Pretty good', 'Feeling great'];
  selectedMood = '';
  noteText = '';
  errorMessage = '';
  successMessage = '';

  constructor(private moodService: MoodService) {}

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
