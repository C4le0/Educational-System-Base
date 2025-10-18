import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personal } from '../models/personal.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  private apiUrl = `${environment.apiUrl}/personal`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.apiUrl);
  }

  getById(id: number): Observable<Personal> {
    return this.http.get<Personal>(`${this.apiUrl}/${id}`);
  }

  create(personal: Personal): Observable<Personal> {
    return this.http.post<Personal>(this.apiUrl, personal);
  }

  update(id: number, personal: Personal): Observable<Personal> {
    return this.http.put<Personal>(`${this.apiUrl}/${id}`, personal);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
