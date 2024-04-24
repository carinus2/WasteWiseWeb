import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationUserDto } from '../models/RegistrationUserDto';

@Injectable({
  providedIn: 'root'
})
export class RegistrationUserService {
  private apiUrl = 'http://localhost:8080/api'; 
  constructor(private http: HttpClient) { }

  getRegistrationUsers(): Observable<RegistrationUserDto[]> {
    return this.http.get<RegistrationUserDto[]>(`${this.apiUrl}/regular-users`);
  }


}
