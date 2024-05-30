import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CabDto } from '../models/CabDto';
import { CollectorDto } from '../models/CollectorDto';

@Injectable({
  providedIn: 'root'
})
export class CabService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  editCab(id: number, cab: CabDto): Observable<CabDto> {
    return this.http.put<CabDto>(`${this.apiUrl}/cabs/${id}`, cab);
  }

  deleteCab(id: number){
    return this.http.delete<CabDto>(`${this.apiUrl}/cabs/${id}`);
  }

  getCabs(): Observable<CabDto[]> {
    return this.http.get<CabDto[]>(`${this.apiUrl}/cabs`);
  }

  getCollectors(): Observable<CollectorDto[]> {
    return this.http.get<CollectorDto[]>(`${this.apiUrl}/collectors`);
  }

}
