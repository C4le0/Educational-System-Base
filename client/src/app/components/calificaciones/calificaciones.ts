import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Calificacion } from '../../models/calificacion.interface';

@Component({
  selector: 'app-calificaciones',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule
  ],
  templateUrl: './calificaciones.html',
  styleUrl: './calificaciones.scss'
})
export class CalificacionesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'estudiante', 'materia', 'periodo', 'nota', 'acciones'];
  calificaciones: Calificacion[] = [];

  ngOnInit() {
    this.loadCalificaciones();
  }

  loadCalificaciones() {
    // Lista vacía - sin datos dummy
    this.calificaciones = [];
  }

  agregarCalificacion() {
    console.log('Agregar nueva calificación');
  }

  editarCalificacion(calificacion: Calificacion) {
    console.log('Editar calificación:', calificacion);
  }

  eliminarCalificacion(calificacion: Calificacion) {
    console.log('Eliminar calificación:', calificacion);
  }

  getNotaClass(nota: number): string {
    if (nota >= 18) return 'nota-excelente';
    if (nota >= 16) return 'nota-buena';
    if (nota >= 13) return 'nota-regular';
    return 'nota-deficiente';
  }
}
