import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GradosService } from '../../../services/grados';
import { InstitucionService } from '../../../services/institucion';
import { Institucion } from '../../../models/institucion.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grado-estudio-btn',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './grado-estudio-btn.html',
  styleUrls: ['./grado-estudio-btn.html']
})
export class GradoEstudioBtnComponent implements OnInit {
  form!: FormGroup;
  instituciones: Institucion[] = [];

  constructor(
    private fb: FormBuilder,
    private gradosService: GradosService,
    private institucionService: InstitucionService,
    public dialogRef: MatDialogRef<GradoEstudioBtnComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      institucion: ['', Validators.required]
    });

    this.loadInstituciones();
  }

  loadInstituciones(): void {
    this.institucionService.getInstituciones().subscribe({
      next: (data) => {
        this.instituciones = data;
      },
      error: (error) => {
        console.error('Error al cargar instituciones:', error);
        this.instituciones = [];
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) return;
    
    const gradoData: any = {
      nombre: this.form.value.nombre.trim(),
      institucion: this.form.value.institucion
    };

    if (this.form.value.descripcion && this.form.value.descripcion.trim()) {
      gradoData.descripcion = this.form.value.descripcion.trim();
    }

    this.gradosService.createGrado(gradoData).subscribe({
      next: (res) => this.dialogRef.close(res),
      error: (err) => alert('Error al crear: ' + JSON.stringify(err.error))
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get institucion() {
    return this.form.get('institucion');
  }
}

