
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
   isAdmin(): Observable<boolean> {
    const localIsAdmin = localStorage.getItem('isAdmin') || 'false';
    const isAdmin = localIsAdmin === 'true';
    return of(isAdmin);
  }
}
