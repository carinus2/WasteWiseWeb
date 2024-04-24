import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RegistrationUserDto } from '../models/RegistrationUserDto';
import { EditUserDto } from '../models/EditUserDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/regular-users';

  constructor(private http: HttpClient) { }

  editUser(id: number, user: EditUserDto): Observable<EditUserDto> {
    return this.http.put<EditUserDto>(`${this.apiUrl}/${id}`, user);
  }
}
