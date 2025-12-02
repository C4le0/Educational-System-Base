import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GradosService, Grado } from '../../services/grados';
import { GradoEstudioBtnComponent } from './grado-estudio-btn/grado-estudio-btn';

@Component({
  selector: 'app-grado-estudio',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule
  ],
  templateUrl: './grado-estudio.html',
  styleUrl: './grado-estudio.scss'
})
export class GradoEstudioComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'institucion', 'acciones'];
  grados: Grado[] = [];

  constructor(
    private gradosService: GradosService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadGrados();
  }

  loadGrados() {
    this.gradosService.getGrados().subscribe({
      next: (data) => {
        this.grados = data;
      },
      error: (error) => {
        console.error('Error al cargar grados:', error);
        this.grados = [];
      }
    });
  }

  agregarGrado() {
    const ref = this.dialog.open(GradoEstudioBtnComponent, {
      width: '500px'
    });

    ref.afterClosed().subscribe((nuevo: Grado) => {
      if (nuevo) this.loadGrados();
    });
  }

  editarGrado(grado: Grado) {
    console.log('Editar grado:', grado);
    // TODO: Implementar modal/dialog para editar grado
    alert('Funcionalidad de edición próximamente');
  }

  eliminarGrado(grado: Grado) {
    if (confirm(`¿Está seguro de eliminar el grado "${grado.nombre}"?`)) {
      this.gradosService.deleteGrado(grado.id).subscribe({
        next: () => {
          this.loadGrados();
          alert('Grado eliminado exitosamente');
        },
        error: (error) => {
          console.error('Error al eliminar grado:', error);
          alert('Error al eliminar grado');
        }
      });
    }
  }
}
