import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../models/estudiante.interface';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  private apiUrl = 'http://localhost:3000/api/estudiantes';

  constructor(private http: HttpClient) { }

  // Obtener todos los estudiantes
  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl);
  }

  // Obtener estudiante por ID
  getEstudiante(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo estudiante
  createEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.apiUrl, estudiante);
  }

  // Actualizar estudiante
  updateEstudiante(id: number, estudiante: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.apiUrl}/${id}`, estudiante);
  }

  // Eliminar estudiante
  deleteEstudiante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener estudiantes por grado de estudio
  getEstudiantesByGrado(gradoId: number): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/grado/${gradoId}`);
  }

  // Obtener estudiantes por período
  getEstudiantesByPeriodo(periodo: string, año: number): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/periodo/${periodo}/${año}`);
  }

  // Buscar estudiantes por nombre o cédula
  searchEstudiantes(termino: string): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/search?q=${termino}`);
  }
}
