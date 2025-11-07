import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Estudiante } from '../../models/estudiante.interface';
import { EstudiantesService } from '../../services/estudiantes';
import { GradosService, Grado } from '../../services/grados';

@Component({
  selector: 'app-estudiantes',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './estudiantes.html',
  styleUrl: './estudiantes.scss'
})
export class EstudiantesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'cedula', 'grado', 'estado', 'acciones'];
  estudiantes: Estudiante[] = [];
  grados: Grado[] = [];
  mostrarFormulario: boolean = false;
  nuevoEstudiante: Estudiante = {
    id: 0,
    nombre: '',
    apellido: '',
    cedula: '',
    fechaNacimiento: new Date(),
    direccion: '',
    telefono: '',
    email: '',
    nombreRepresentante: '',
    telefonoRepresentante: '',
    gradoEstudioId: 0,
    año: new Date().getFullYear(),
    periodo: '',
    estado: true,
    fechaIngreso: new Date()
  };

  constructor(
    private estudiantesService: EstudiantesService,
    private gradosService: GradosService
  ) {}

  ngOnInit() {
    this.loadEstudiantes();
    this.loadGrados();
  }

  loadGrados() {
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

  loadEstudiantes() {
    console.log('Cargando estudiantes...');
    this.estudiantesService.getEstudiantes().subscribe({
      next: (data) => {
        console.log('Estudiantes cargados:', data);
        console.log('Tipo de datos:', typeof data, Array.isArray(data));
        // Asegurar que siempre sea un array
        this.estudiantes = Array.isArray(data) ? data : [];
        console.log('Estudiantes asignados a la tabla:', this.estudiantes);
        console.log('Cantidad de estudiantes:', this.estudiantes.length);
      },
      error: (error) => {
        console.error('Error al cargar estudiantes:', error);
        console.error('Error completo:', JSON.stringify(error, null, 2));
        // Asegurar que siempre sea un array incluso si hay error
        this.estudiantes = [];
      }
    });
  }

  agregarEstudiante() {
    this.mostrarFormulario = true;
    this.nuevoEstudiante = {
      id: 0,
      nombre: '',
      apellido: '',
      cedula: '',
      fechaNacimiento: new Date(),
      direccion: '',
      telefono: '',
      email: '',
      nombreRepresentante: '',
      telefonoRepresentante: '',
      gradoEstudioId: 0,
      año: new Date().getFullYear(),
      periodo: '',
      estado: true,
      fechaIngreso: new Date()
    };
  }

  guardarEstudiante() {
    if (!this.nuevoEstudiante.nombre || !this.nuevoEstudiante.apellido || !this.nuevoEstudiante.cedula) {
      alert('Por favor complete los campos requeridos: Nombre, Apellido y Cédula');
      return;
    }

    // Preparar datos para enviar (solo campos necesarios)
    const estudianteData: any = {
      nombre: this.nuevoEstudiante.nombre.trim(),
      apellido: this.nuevoEstudiante.apellido.trim(),
      cedula: this.nuevoEstudiante.cedula.trim()
    };

    // Agregar email solo si tiene valor
    if (this.nuevoEstudiante.email && this.nuevoEstudiante.email.trim()) {
      estudianteData.email = this.nuevoEstudiante.email.trim();
    }

    // Convertir fecha de nacimiento a formato ISO si existe
    if (this.nuevoEstudiante.fechaNacimiento) {
      const fecha = new Date(this.nuevoEstudiante.fechaNacimiento);
      if (!isNaN(fecha.getTime())) {
        estudianteData.fechaNacimiento = fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      }
    }

    // Agregar gradoEstudioId solo si tiene valor válido (mayor que 0)
    if (this.nuevoEstudiante.gradoEstudioId && this.nuevoEstudiante.gradoEstudioId > 0) {
      estudianteData.gradoEstudioId = this.nuevoEstudiante.gradoEstudioId;
    }
    // Si es 0, no se envía (el estudiante se creará sin grado)

    console.log('Datos a enviar:', estudianteData);

    this.estudiantesService.createEstudiante(estudianteData as Estudiante).subscribe({
      next: (response) => {
        console.log('Estudiante creado exitosamente:', response);
        this.mostrarFormulario = false;
        // Recargar la lista de estudiantes
        this.loadEstudiantes();
        alert('Estudiante creado exitosamente');
      },
      error: (error) => {
        console.error('Error completo al crear estudiante:', error);
        console.error('Error.error:', error.error);
        console.error('Error.error.detail:', error.error?.detail);
        
        let errorMessage = 'Error desconocido';
        
        if (error.status === 0) {
          errorMessage = 'No se puede conectar al servidor. Verifica que el servidor Django esté corriendo en http://localhost:8000';
        } else if (error.error) {
          // Si el error es un string HTML, intentar extraer el mensaje
          if (typeof error.error === 'string') {
            // Detectar si es HTML
            if (error.error.trim().startsWith('<!DOCTYPE') || error.error.trim().startsWith('<html')) {
              // Intentar extraer el título del error del HTML
              const titleMatch = error.error.match(/<title>(.*?)<\/title>/i);
              if (titleMatch) {
                errorMessage = `Error del servidor: ${titleMatch[1]}`;
              } else {
                // Intentar extraer el mensaje de error del body
                const bodyMatch = error.error.match(/<body[^>]*>(.*?)<\/body>/is);
                if (bodyMatch) {
                  const bodyText = bodyMatch[1].replace(/<[^>]+>/g, ' ').trim();
                  errorMessage = `Error del servidor: ${bodyText.substring(0, 200)}`;
                } else {
                  errorMessage = 'Error del servidor. Revisa la consola del navegador para más detalles.';
                }
              }
            } else {
              errorMessage = error.error;
            }
          } else if (typeof error.error === 'object') {
            // Si es un objeto, intentar extraer el mensaje de error
            if (error.error.detail) {
              // Si detail es un objeto con errores de validación, formatearlos
              if (typeof error.error.detail === 'object' && error.error.detail !== null) {
                const detailKeys = Object.keys(error.error.detail);
                if (detailKeys.length > 0) {
                  // Formatear errores de validación de manera legible
                  const validationErrors = detailKeys.map(key => {
                    const value = error.error.detail[key];
                    if (Array.isArray(value)) {
                      // Si el error es sobre un grado que no existe, mostrar mensaje más claro
                      const errorText = value.join(', ');
                      if (key === 'grado' && errorText.includes('does not exist')) {
                        return `Grado: El ID del grado no existe en la base de datos. Puedes crear el estudiante sin grado o usar un ID válido.`;
                      }
                      // Si el error es sobre matrícula duplicada, mostrar mensaje más claro
                      if (key === 'matricula' && (errorText.includes('Ya existe') || errorText.includes('duplicada'))) {
                        return `Matrícula: Ya existe un estudiante con esta cédula/matrícula. Por favor, usa una cédula diferente.`;
                      }
                      return `${key}: ${errorText}`;
                    } else if (typeof value === 'object') {
                      return `${key}: ${JSON.stringify(value)}`;
                    }
                    return `${key}: ${value}`;
                  });
                  errorMessage = `Errores de validación:\n${validationErrors.join('\n')}`;
                } else {
                  errorMessage = JSON.stringify(error.error.detail);
                }
              } else {
                errorMessage = error.error.detail;
              }
            } else if (error.error.error) {
              errorMessage = typeof error.error.error === 'string' ? error.error.error : JSON.stringify(error.error.error);
            } else if (error.error.non_field_errors) {
              errorMessage = Array.isArray(error.error.non_field_errors) 
                ? error.error.non_field_errors.join(', ')
                : error.error.non_field_errors;
            } else {
              // Si es un objeto con campos de error, mostrar los errores de validación
              const errorKeys = Object.keys(error.error);
              if (errorKeys.length > 0) {
                const validationErrors = errorKeys.map(key => {
                  const value = error.error[key];
                  if (Array.isArray(value)) {
                    return `${key}: ${value.join(', ')}`;
                  }
                  return `${key}: ${value}`;
                });
                errorMessage = validationErrors.join('; ');
              } else {
                errorMessage = JSON.stringify(error.error);
              }
            }
          }
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        alert('Error al crear estudiante:\n\n' + errorMessage);
      }
    });
  }

  cancelarFormulario() {
    this.mostrarFormulario = false;
  }

  editarEstudiante(estudiante: Estudiante) {
    console.log('Editar estudiante:', estudiante);
    // TODO: Implementar modal/dialog para editar estudiante
  }

  eliminarEstudiante(estudiante: Estudiante) {
    if (confirm(`¿Está seguro de eliminar a ${estudiante.nombre} ${estudiante.apellido}?`)) {
      this.estudiantesService.deleteEstudiante(estudiante.id).subscribe({
        next: () => {
          this.loadEstudiantes();
        },
        error: (error) => {
          console.error('Error al eliminar estudiante:', error);
        }
      });
    }
  }
}
