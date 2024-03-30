import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { LoginInterface } from '../Interfaces/auth-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private route: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<LoginInterface>(environment.apiUrl + '/auth/login', {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // Store token and user details
          localStorage.setItem('token', user.token);
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // Remove token and user details
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    // Redirect to login page
    this.route.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string {
    const user = this.currentUserSubject.getValue();
    return user ? user.role : ''; // Replace with actual role property from API response
  }
}
