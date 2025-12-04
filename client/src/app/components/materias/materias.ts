import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MateriasService } from '../../services/materias';
import { MateriasBtnComponent } from './materias-btn/materias-btn';
import { Materia } from '../../models/materia.interface';

@Component({
  selector: 'app-materias',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule
  ],
  templateUrl: './materias.html',
  styleUrl: './materias.scss'
})
export class MateriasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'grado', 'acciones'];
  materias: any[] = [];

  constructor(
    private materiasService: MateriasService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadMaterias();
  }

  loadMaterias() {
    this.materiasService.getMaterias().subscribe({
      next: (data) => {
        this.materias = data;
      },
      error: (error) => {
        console.error('Error al cargar materias:', error);
        this.materias = [];
      }
    });
  }

  agregarMateria() {
    const ref = this.dialog.open(MateriasBtnComponent, {
      width: '500px'
    });

    ref.afterClosed().subscribe((nuevo: Materia) => {
      if (nuevo) this.loadMaterias();
    });
  }

  editarMateria(materia: Materia) {
    console.log('Editar materia:', materia);
    alert('Funcionalidad de edición próximamente');
  }

  eliminarMateria(materia: Materia) {
    if (confirm(`¿Está seguro de eliminar la materia "${materia.nombre}"?`)) {
      this.materiasService.deleteMateria(materia.id).subscribe({
        next: () => {
          this.loadMaterias();
          alert('Materia eliminada exitosamente');
        },
        error: (error) => {
          console.error('Error al eliminar materia:', error);
          alert('Error al eliminar materia');
        }
      });
    }
  }
}
