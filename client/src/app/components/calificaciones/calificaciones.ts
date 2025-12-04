import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CalificacionesService } from '../../services/calificaciones';
import { CalificacionesBtnComponent } from './calificaciones-btn/calificaciones-btn';
import { Calificacion } from '../../models/calificacion.interface';

@Component({
  selector: 'app-calificaciones',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule
  ],
  templateUrl: './calificaciones.html',
  styleUrl: './calificaciones.scss'
})
export class CalificacionesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'estudiante', 'materia', 'periodo', 'nota', 'acciones'];
  calificaciones: any[] = [];

  constructor(
    private calificacionesService: CalificacionesService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadCalificaciones();
  }

  loadCalificaciones() {
    this.calificacionesService.getCalificaciones().subscribe({
      next: (data) => {
        this.calificaciones = data;
      },
      error: (error) => {
        console.error('Error al cargar calificaciones:', error);
        this.calificaciones = [];
      }
    });
  }

  agregarCalificacion() {
    const ref = this.dialog.open(CalificacionesBtnComponent, {
      width: '500px'
    });

    ref.afterClosed().subscribe((nuevo: Calificacion) => {
      if (nuevo) this.loadCalificaciones();
    });
  }

  editarCalificacion(calificacion: Calificacion) {
    console.log('Editar calificación:', calificacion);
    alert('Funcionalidad de edición próximamente');
  }

  eliminarCalificacion(calificacion: Calificacion) {
    if (confirm(`¿Está seguro de eliminar esta calificación?`)) {
      this.calificacionesService.deleteCalificacion(calificacion.id).subscribe({
        next: () => {
          this.loadCalificaciones();
          alert('Calificación eliminada exitosamente');
        },
        error: (error) => {
          console.error('Error al eliminar calificación:', error);
          alert('Error al eliminar calificación');
        }
      });
    }
  }

  getNotaClass(nota: number): string {
    if (nota >= 18) return 'nota-excelente';
    if (nota >= 16) return 'nota-buena';
    if (nota >= 13) return 'nota-regular';
    return 'nota-deficiente';
  }
}
