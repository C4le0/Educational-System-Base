import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Personal } from '../../models/personal.interface';

@Component({
  selector: 'app-personal',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule
  ],
  templateUrl: './personal.html',
  styleUrl: './personal.scss'
})
export class PersonalComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'cedula', 'cargo', 'estado', 'acciones'];
  personal: Personal[] = [];

  ngOnInit() {
    this.loadPersonal();
  }

  loadPersonal() {
    // Lista vacía - sin datos dummy
    this.personal = [];
  }

  agregarPersonal() {
    console.log('Agregar nuevo personal');
  }

  editarPersonal(personal: Personal) {
    console.log('Editar personal:', personal);
  }

  eliminarPersonal(personal: Personal) {
    console.log('Eliminar personal:', personal);
  }
}
