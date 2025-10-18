import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GradoEstudio } from '../../models/grado-estudio.interface';

@Component({
  selector: 'app-grado-estudio',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule
  ],
  templateUrl: './grado-estudio.html',
  styleUrl: './grado-estudio.scss'
})
export class GradoEstudioComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'nivel', 'seccion', 'año', 'estado', 'acciones'];
  grados: GradoEstudio[] = [];

  ngOnInit() {
    this.loadGrados();
  }

  loadGrados() {
    // Lista vacía - sin datos dummy
    this.grados = [];
  }

  agregarGrado() {
    console.log('Agregar nuevo grado');
  }

  editarGrado(grado: GradoEstudio) {
    console.log('Editar grado:', grado);
  }

  eliminarGrado(grado: GradoEstudio) {
    console.log('Eliminar grado:', grado);
  }
}
