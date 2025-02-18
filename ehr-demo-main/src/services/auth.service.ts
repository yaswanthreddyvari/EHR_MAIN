// services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // login(email: string, password: string): Observable<any> {
    
  //   return this.http.post(`${this.apiUrl}/login`, { email, password });
  // }

  // getUserEmail(): string {
  //   // Replace with your actual logic to get the user's email
  //   return 'user@example.com';
  // }

  // // Example method to handle logout
  // logout(): void {
  //   // Clear user session or token
  //   localStorage.removeItem('authToken'); // Example
  // }


  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.success) {
          // Store user email and token in local storage
          localStorage.setItem('userEmail', response.data.email);
          localStorage.setItem('authToken', response.data.token);
        }
      })
    );
  }

  getUserEmail(): string {
    // Get the user's email from local storage
    return localStorage.getItem('userEmail') || '';
  }

  // Example method to handle logout
  logout(): void {
    // Clear user session or token
    localStorage.removeItem('authToken'); // Example
    localStorage.removeItem('userEmail'); // Clear the email as well
  }
}