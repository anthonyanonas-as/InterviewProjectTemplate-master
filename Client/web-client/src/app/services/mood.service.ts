import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MoodEntryDto {
  mood: string;
  note?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoodService {
  // Configured to interact with your explicit port 8080 Docker mapping layout
  private apiUrl = 'http://localhost:8080/api/mood';

  constructor(private http: HttpClient) { }

  addMood(entry: MoodEntryDto): Observable<any> {
    return this.http.post(this.apiUrl, entry);
  }

  getAdminLogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin-logs`);
  }
}
