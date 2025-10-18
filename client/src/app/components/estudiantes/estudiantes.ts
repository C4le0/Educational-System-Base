import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Estudiante } from '../../models/estudiante.interface';

@Component({
  selector: 'app-estudiantes',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule
  ],
  templateUrl: './estudiantes.html',
  styleUrl: './estudiantes.scss'
})
export class EstudiantesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'cedula', 'grado', 'estado', 'acciones'];
  estudiantes: Estudiante[] = [];

  ngOnInit() {
    this.loadEstudiantes();
  }

  loadEstudiantes() {
    // Lista vacía - sin datos dummy
    this.estudiantes = [];
  }

  agregarEstudiante() {
    console.log('Agregar nuevo estudiante');
  }

  editarEstudiante(estudiante: Estudiante) {
    console.log('Editar estudiante:', estudiante);
  }

  eliminarEstudiante(estudiante: Estudiante) {
    console.log('Eliminar estudiante:', estudiante);
  }
}
