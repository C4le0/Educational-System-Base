import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Institucion } from '../../models/institucion.interface';

@Component({
  selector: 'app-institucion',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  templateUrl: './institucion.html',
  styleUrl: './institucion.scss'
})
export class InstitucionComponent implements OnInit {
  institucion: Institucion | null = null;

  ngOnInit() {
    this.loadInstitucion();
  }

  loadInstitucion() {
    // Sin datos dummy - lista vacía
    this.institucion = null;
  }

  editarInstitucion() {
    console.log('Editar información de la institución');
  }
}
