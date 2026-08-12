import { Component, OnInit } from '@angular/core';
import { MoodService } from '../../services/mood.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard {
  adminLogs: any[] = [];

  constructor(private moodService: MoodService) {}

  ngOnInit() {
    this.moodService.getAdminLogs().subscribe({
      next: (data) => this.adminLogs = data,
      error: (err) => console.error('Failed to load admin logs', err)
    });
  }

}
