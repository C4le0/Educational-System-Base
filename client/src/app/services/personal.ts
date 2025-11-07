import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Personal } from '../models/personal.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  // Usar URL absoluta para evitar problemas con el router de Angular
  private apiUrl = 'http://localhost:8000/api/personal/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Personal[]> {
    // La API devuelve datos paginados, necesitamos extraer el array 'results'
    return this.http.get<{results: Personal[], count: number, next: string | null, previous: string | null}>(this.apiUrl)
      .pipe(
        map(response => response.results || [])
      );
  }

  getById(id: number): Observable<Personal> {
    return this.http.get<Personal>(`${this.apiUrl}${id}/`);
  }

  create(personal: Personal): Observable<Personal> {
    return this.http.post<Personal>(this.apiUrl, personal);
  }

  update(id: number, personal: Personal): Observable<Personal> {
    return this.http.put<Personal>(`${this.apiUrl}${id}/`, personal);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
