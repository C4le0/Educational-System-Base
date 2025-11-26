# Documentación Técnica - CodeLatin-7

## 📁 Estructura del Proyecto

```
CodeLatin-7/
├── server/          # Backend Django REST Framework
│   ├── core/        # Configuración Django
│   ├── school/      # Aplicación principal
│   └── scripts/     # Scripts de utilidad
├── client/          # Frontend Angular
└── docker-compose.yml
```

## 🔗 Endpoints de la API

**Base URL:** `http://localhost:8000/api/`

### Recursos Disponibles

- **Estudiantes**: `/api/estudiantes/` o `/api/alumnos/`
- **Grados**: `/api/grados/`
- **Instituciones**: `/api/instituciones/`
- **Materias**: `/api/materias/`
- **Personal**: `/api/personal/`
- **Periodos**: `/api/periodos/`
- **Calificaciones**: `/api/calificaciones/`

### Operaciones CRUD

Todos los endpoints soportan:
- `GET /api/{recurso}/` - Listar (paginado)
- `GET /api/{recurso}/{id}/` - Obtener por ID
- `POST /api/{recurso}/` - Crear
- `PUT /api/{recurso}/{id}/` - Actualizar
- `DELETE /api/{recurso}/{id}/` - Eliminar

## 📊 Modelos Principales

- **Estudiante**: nombre, apellido, matricula, correo, grado
- **Grado**: nombre, descripcion, institucion
- **Institucion**: nombre, direccion, telefono
- **Personal**: nombre, apellido, cedula, cargo, institucion
- **Materia**: nombre, descripcion, grado
- **Periodo**: nombre, fecha_inicio, fecha_fin
- **Calificacion**: estudiante, materia, periodo, nota

## ⚙️ Configuración

- **Backend**: Django 5.2+ con Django REST Framework
- **Base de Datos**: SQLite (por defecto)
- **CORS**: Habilitado para desarrollo
- **Paginación**: 20 elementos por página
