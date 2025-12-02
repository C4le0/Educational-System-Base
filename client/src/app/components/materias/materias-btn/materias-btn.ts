import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MateriasService } from '../../../services/materias';
import { GradosService, Grado } from '../../../services/grados';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-materias-btn',
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
  templateUrl: './materias-btn.html',
  styleUrls: ['./materias-btn.html']
})
export class MateriasBtnComponent implements OnInit {
  form!: FormGroup;
  grados: Grado[] = [];

  constructor(
    private fb: FormBuilder,
    private materiasService: MateriasService,
    private gradosService: GradosService,
    public dialogRef: MatDialogRef<MateriasBtnComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      gradoEstudioId: ['', Validators.required]
    });

    this.loadGrados();
  }

  loadGrados(): void {
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

  guardar(): void {
    if (this.form.invalid) return;
    
    const materiaData: any = {
      nombre: this.form.value.nombre.trim(),
      grado: this.form.value.gradoEstudioId
    };

    if (this.form.value.descripcion && this.form.value.descripcion.trim()) {
      materiaData.descripcion = this.form.value.descripcion.trim();
    }

    this.materiasService.createMateria(materiaData).subscribe({
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

  get gradoEstudioId() {
    return this.form.get('gradoEstudioId');
  }
}

