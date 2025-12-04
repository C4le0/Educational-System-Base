import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CalificacionesService } from '../../../services/calificaciones';
import { EstudiantesService } from '../../../services/estudiantes';
import { MateriasService } from '../../../services/materias';
import { PeriodosService } from '../../../services/periodos';
import { Estudiante } from '../../../models/estudiante.interface';
import { Materia } from '../../../models/materia.interface';
import { Periodo } from '../../../models/periodo.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calificaciones-btn',
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
  templateUrl: './calificaciones-btn.html',
  styleUrls: ['./calificaciones-btn.html']
})
export class CalificacionesBtnComponent implements OnInit {
  form!: FormGroup;
  estudiantes: Estudiante[] = [];
  materias: Materia[] = [];
  periodos: Periodo[] = [];

  constructor(
    private fb: FormBuilder,
    private calificacionesService: CalificacionesService,
    private estudiantesService: EstudiantesService,
    private materiasService: MateriasService,
    private periodosService: PeriodosService,
    public dialogRef: MatDialogRef<CalificacionesBtnComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      estudianteId: ['', Validators.required],
      materiaId: ['', Validators.required],
      periodoId: ['', Validators.required],
      nota: ['', [Validators.required, Validators.min(0), Validators.max(20)]]
    });

    this.loadEstudiantes();
    this.loadMaterias();
    this.loadPeriodos();
  }

  loadEstudiantes(): void {
    this.estudiantesService.getEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
      },
      error: (error) => {
        console.error('Error al cargar estudiantes:', error);
        this.estudiantes = [];
      }
    });
  }

  loadMaterias(): void {
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

  loadPeriodos(): void {
    this.periodosService.getPeriodos().subscribe({
      next: (data) => {
        this.periodos = data;
      },
      error: (error) => {
        console.error('Error al cargar períodos:', error);
        this.periodos = [];
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) return;
    
    const calificacionData: any = {
      estudianteId: this.form.value.estudianteId,
      materiaId: this.form.value.materiaId,
      periodoId: this.form.value.periodoId,
      nota: this.form.value.nota
    };

    this.calificacionesService.createCalificacion(calificacionData).subscribe({
      next: (res) => this.dialogRef.close(res),
      error: (err) => alert('Error al crear: ' + JSON.stringify(err.error))
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  get estudianteId() {
    return this.form.get('estudianteId');
  }

  get materiaId() {
    return this.form.get('materiaId');
  }

  get periodoId() {
    return this.form.get('periodoId');
  }

  get nota() {
    return this.form.get('nota');
  }
}

