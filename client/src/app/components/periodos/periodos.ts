import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Periodo } from '../../models/periodo.interface';

@Component({
  selector: 'app-periodos',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule
  ],
  templateUrl: './periodos.html',
  styleUrl: './periodos.scss'
})
export class PeriodosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'año', 'fechaInicio', 'fechaFin', 'estado', 'acciones'];
  periodos: Periodo[] = [];

  ngOnInit() {
    this.loadPeriodos();
  }

  loadPeriodos() {
    // Lista vacía - sin datos dummy
    this.periodos = [];
  }

  agregarPeriodo() {
    console.log('Agregar nuevo período');
  }

  editarPeriodo(periodo: Periodo) {
    console.log('Editar período:', periodo);
  }

  eliminarPeriodo(periodo: Periodo) {
    console.log('Eliminar período:', periodo);
  }
}
