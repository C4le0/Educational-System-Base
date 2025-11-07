import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Personal } from '../../models/personal.interface';
import { PersonalService } from '../../services/personal';

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

  constructor(private personalService: PersonalService) {}

  ngOnInit() {
    this.loadPersonal();
  }

  loadPersonal() {
    this.personalService.getAll().subscribe({
      next: (data) => {
        this.personal = data;
      },
      error: (error) => {
        console.error('Error al cargar personal:', error);
      }
    });
  }

  agregarPersonal() {
    console.log('Agregar nuevo personal');
    // TODO: Implementar modal/dialog para agregar personal
  }

  editarPersonal(personal: Personal) {
    console.log('Editar personal:', personal);
    // TODO: Implementar modal/dialog para editar personal
  }

  eliminarPersonal(personal: Personal) {
    if (confirm(`¿Está seguro de eliminar a ${personal.nombre} ${personal.apellido}?`)) {
      this.personalService.delete(personal.id).subscribe({
        next: () => {
          this.loadPersonal();
        },
        error: (error) => {
          console.error('Error al eliminar personal:', error);
        }
      });
    }
  }
}
