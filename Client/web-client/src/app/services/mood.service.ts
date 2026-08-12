import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface MoodEntryDto {
  mood: string;
  note?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoodService {
  private apiUrl = `${environment.apiUrl}/api/mood`;

  constructor(private http: HttpClient) { }

  addMood(entry: MoodEntryDto): Observable<any> {
    return this.http.post(this.apiUrl, entry);
  }

  getAdminLogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin-logs`);
  }
}
