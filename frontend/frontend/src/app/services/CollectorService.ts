import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CollectorDto } from '../models/CollectorDto';

@Injectable({
  providedIn: 'root'
})
export class CollectorService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  editCollector(id: number, collector: CollectorDto): Observable<CollectorDto> {
    return this.http.put<CollectorDto>(`${this.apiUrl}/${id}`, collector);
  }

  deleteCollector(id: number){
    return this.http.delete<CollectorDto>(`${this.apiUrl}/${id}`);
  }

  getCollectors(): Observable<CollectorDto[]> {
    return this.http.get<CollectorDto[]>(`${this.apiUrl}/collectors`);
  }

}
