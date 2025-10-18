import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Periodo, PeriodoCalificacion } from '../models/periodo.interface';

@Injectable({
  providedIn: 'root'
})
export class PeriodosService {
  private apiUrl = 'http://localhost:3000/api/periodos';

  constructor(private http: HttpClient) { }

  // Obtener todos los períodos
  getPeriodos(): Observable<Periodo[]> {
    return this.http.get<Periodo[]>(this.apiUrl);
  }

  // Obtener período por ID
  getPeriodo(id: number): Observable<Periodo> {
    return this.http.get<Periodo>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo período
  createPeriodo(periodo: Periodo): Observable<Periodo> {
    return this.http.post<Periodo>(this.apiUrl, periodo);
  }

  // Actualizar período
  updatePeriodo(id: number, periodo: Periodo): Observable<Periodo> {
    return this.http.put<Periodo>(`${this.apiUrl}/${id}`, periodo);
  }

  // Eliminar período
  deletePeriodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener período activo
  getPeriodoActivo(): Observable<Periodo> {
    return this.http.get<Periodo>(`${this.apiUrl}/activo`);
  }

  // Obtener períodos por año
  getPeriodosByAño(año: number): Observable<Periodo[]> {
    return this.http.get<Periodo[]>(`${this.apiUrl}/año/${año}`);
  }

  // Activar período
  activarPeriodo(id: number): Observable<Periodo> {
    return this.http.patch<Periodo>(`${this.apiUrl}/${id}/activar`, {});
  }

  // Finalizar período
  finalizarPeriodo(id: number): Observable<Periodo> {
    return this.http.patch<Periodo>(`${this.apiUrl}/${id}/finalizar`, {});
  }
}

@Injectable({
  providedIn: 'root'
})
export class PeriodoCalificacionesService {
  private apiUrl = 'http://localhost:3000/api/periodo-calificaciones';

  constructor(private http: HttpClient) { }

  // Obtener calificaciones por período
  getCalificacionesByPeriodo(periodoId: number): Observable<PeriodoCalificacion[]> {
    return this.http.get<PeriodoCalificacion[]>(`${this.apiUrl}/periodo/${periodoId}`);
  }

  // Obtener calificaciones por estudiante y período
  getCalificacionesByEstudiantePeriodo(estudianteId: number, periodoId: number): Observable<PeriodoCalificacion[]> {
    return this.http.get<PeriodoCalificacion[]>(`${this.apiUrl}/estudiante/${estudianteId}/periodo/${periodoId}`);
  }

  // Crear calificación de período
  createCalificacion(calificacion: PeriodoCalificacion): Observable<PeriodoCalificacion> {
    return this.http.post<PeriodoCalificacion>(this.apiUrl, calificacion);
  }

  // Actualizar calificación de período
  updateCalificacion(id: number, calificacion: PeriodoCalificacion): Observable<PeriodoCalificacion> {
    return this.http.put<PeriodoCalificacion>(`${this.apiUrl}/${id}`, calificacion);
  }

  // Eliminar calificación de período
  deleteCalificacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
