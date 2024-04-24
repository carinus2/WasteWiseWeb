import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { jwtDecode} from 'jwt-decode';
import { RegularUser } from '../models/RegularUserDto';
import { RegistrationUserDto } from '../models/RegistrationUserDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(user: RegularUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  signUp(user: Omit<RegistrationUserDto, 'id'>): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'text' });
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    console.log(decoded);
    return decoded.exp < Date.now() / 1000;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  getUserEmailFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.sub;
    }
    return null;
  }
}
