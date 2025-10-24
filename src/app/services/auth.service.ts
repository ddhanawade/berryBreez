import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User, AuthResponse, LoginCredentials, RegisterData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const savedUser = localStorage.getItem('berrybreez_user');
    const savedToken = localStorage.getItem('berrybreez_token');
    
    if (savedUser && savedToken) {
      try {
        const user = JSON.parse(savedUser);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        console.error('Error loading user from storage:', error);
        this.logout();
      }
    }
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // Mock login - in real app, this would call an API
    return of({
      user: {
        id: '1',
        email: credentials.email,
        name: 'Demo User',
        phone: '+91 9876543210',
        role: 'customer' as const,
        addresses: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      token: 'mock-jwt-token-' + Date.now()
    }).pipe(
      delay(1000),
      map(response => {
        this.setAuthData(response);
        return response;
      })
    );
  }

  register(data: RegisterData): Observable<AuthResponse> {
    // Mock registration - in real app, this would call an API
    return of({
      user: {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        phone: data.phone,
        role: 'customer' as const,
        addresses: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      token: 'mock-jwt-token-' + Date.now()
    }).pipe(
      delay(1000),
      map(response => {
        this.setAuthData(response);
        return response;
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('berrybreez_user');
    localStorage.removeItem('berrybreez_token');
  }

  private setAuthData(response: AuthResponse): void {
    this.currentUserSubject.next(response.user);
    this.isAuthenticatedSubject.next(true);
    localStorage.setItem('berrybreez_user', JSON.stringify(response.user));
    localStorage.setItem('berrybreez_token', response.token);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('berrybreez_token');
  }

  // Demo login for quick testing
  demoLogin(): Observable<AuthResponse> {
    return this.login({
      email: 'demo@berrybreez.com',
      password: 'demo123'
    });
  }
}
