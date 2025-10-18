import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Materia } from '../../models/materia.interface';

@Component({
  selector: 'app-materias',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule
  ],
  templateUrl: './materias.html',
  styleUrl: './materias.scss'
})
export class MateriasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'grado', 'docente', 'estado', 'acciones'];
  materias: Materia[] = [];

  ngOnInit() {
    this.loadMaterias();
  }

  loadMaterias() {
    // Lista vacía - sin datos dummy
    this.materias = [];
  }

  agregarMateria() {
    console.log('Agregar nueva materia');
  }

  editarMateria(materia: Materia) {
    console.log('Editar materia:', materia);
  }

  eliminarMateria(materia: Materia) {
    console.log('Eliminar materia:', materia);
  }
}
