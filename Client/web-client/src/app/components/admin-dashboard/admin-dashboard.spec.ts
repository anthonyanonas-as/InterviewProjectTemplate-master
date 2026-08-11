import { Component, OnInit } from '@angular/core';
import { MoodService } from '../../services/mood.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  adminLogs: any[] = [];

  constructor(private moodService: MoodService) {}

  ngOnInit() {
    this.moodService.getAdminLogs().subscribe({
      next: (data) => this.adminLogs = data,
      error: (err) => console.error('Failed to load admin logs', err)
    });
  }
}
