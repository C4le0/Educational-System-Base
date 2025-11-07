# Documentación del Proyecto CodeLatin-7

## Índice
1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Backend Django REST Framework](#backend-django-rest-framework)
3. [Frontend Angular](#frontend-angular)
4. [API REST Endpoints](#api-rest-endpoints)
5. [Servicios Angular](#servicios-angular)
6. [Componentes](#componentes)
7. [Configuración](#configuración)
8. [Manejo de Errores](#manejo-de-errores)
9. [Cambios Recientes](#cambios-recientes)

---

## Estructura del Proyecto

```
CodeLatin-7/
├── server/                 # Backend Django
│   ├── core/              # Configuración principal de Django
│   │   ├── settings.py   # Configuración (CORS, REST Framework, etc.)
│   │   └── urls.py        # URLs principales
│   ├── school/            # App principal
│   │   ├── models.py     # Modelos de base de datos
│   │   ├── serializers.py # Serializers para API REST
│   │   ├── views.py      # ViewSets para API
│   │   ├── urls.py        # URLs de la API
│   │   ├── admin.py       # Configuración del admin
│   │   └── exceptions.py  # Exception handler personalizado
│   ├── manage.py          # Script de gestión de Django
│   └── requirements.txt   # Dependencias Python
└── client/                 # Frontend Angular
    └── src/
        ├── app/
        │   ├── components/ # Componentes Angular
        │   ├── services/  # Servicios HTTP
        │   └── models/    # Interfaces TypeScript
        └── environments/  # Configuración de entornos
```

---

## Backend Django REST Framework

### Modelos de Base de Datos

#### Alumno (Estudiante)
```python
class Alumno(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    matricula = models.CharField(max_length=20, unique=True)  # Único
    fecha_nacimiento = models.DateField(blank=True, null=True)
    correo = models.EmailField(blank=True, null=True)
    grado = models.ForeignKey(Grado, on_delete=models.SET_NULL, null=True)
```

**Campos importantes:**
- `matricula`: Campo único que se genera automáticamente si no se proporciona
- `grado`: Relación opcional con el modelo Grado

#### Grado
```python
class Grado(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True, null=True)
    institucion = models.ForeignKey(Institucion, on_delete=models.CASCADE)
```

#### Personal
```python
class Personal(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    cedula = models.CharField(max_length=20, unique=True)
    cargo = models.CharField(max_length=20, choices=CARGO_CHOICES)
    fecha_ingreso = models.DateField()
    estado = models.BooleanField(default=True)
    email = models.EmailField(blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    institucion = models.ForeignKey(Institucion, on_delete=models.CASCADE, null=True, blank=True)
```

### Serializers

#### AlumnoSerializer
El serializer maneja el mapeo entre los campos del frontend y el modelo de Django:

**Campos de lectura (read_only):**
- `cedula`: Retorna el valor de `matricula` (para compatibilidad con frontend)
- `grado_nombre`: Nombre del grado asociado
- `gradoEstudioId`: ID del grado asociado
- `fechaNacimiento`: Mapeo de `fecha_nacimiento`
- `email`: Mapeo de `correo`

**Mapeo de campos:**
- `cedula` (frontend) → `matricula` (backend)
- `fechaNacimiento` (frontend) → `fecha_nacimiento` (backend)
- `email` (frontend) → `correo` (backend)
- `gradoEstudioId` (frontend) → `grado` (backend)

**Métodos especiales:**
- `to_internal_value()`: Mapea campos del frontend antes de la validación
- `create()`: Genera matrícula automáticamente si no se proporciona

**Ejemplo de generación de matrícula:**
```python
# Si no se proporciona matrícula, se genera automáticamente
# Formato: EST-{primeras 3 letras del nombre}-{primeras 3 letras del apellido}
# Ejemplo: EST-JUA-PER para Juan Pérez
```

### ViewSets

#### AlumnoViewSet
- **URLs:** `/api/estudiantes/` y `/api/alumnos/`
- **Permisos:** `AllowAny` (desarrollo)
- **Filtros disponibles:**
  - `?grado={id}`: Filtrar por grado
  - `?institucion={id}`: Filtrar por institución
  - `?search={termino}`: Buscar por nombre, apellido o matrícula

### Exception Handler Personalizado

**Ubicación:** `server/school/exceptions.py`

Maneja errores y los convierte a formato JSON:

1. **Errores de Integridad (IntegrityError):**
   - Detecta errores de matrícula duplicada
   - Devuelve mensaje claro: "Ya existe un estudiante con esta cédula/matrícula"

2. **Errores de Validación:**
   - Devuelve detalles específicos de validación
   - Formato: `{error: 'Error de validación', detail: {...}}`

3. **Errores Generales:**
   - Convierte errores no manejados a JSON
   - Incluye tipo de error y detalles

---

## Frontend Angular

### Servicios

#### EstudiantesService
**Ubicación:** `client/src/app/services/estudiantes.ts`

**URL Base:** `http://localhost:8000/api/estudiantes/`

**Métodos:**
- `getEstudiantes()`: Obtiene todos los estudiantes (maneja paginación)
- `getEstudiante(id)`: Obtiene un estudiante por ID
- `createEstudiante(estudiante)`: Crea un nuevo estudiante
- `updateEstudiante(id, estudiante)`: Actualiza un estudiante
- `deleteEstudiante(id)`: Elimina un estudiante

**Manejo de Paginación:**
```typescript
// La API devuelve datos paginados
// Formato: {results: Estudiante[], count: number, next: string, previous: string}
// El servicio extrae automáticamente el array 'results'
```

#### GradosService
**Ubicación:** `client/src/app/services/grados.ts`

**URL Base:** `http://localhost:8000/api/grados/`

**Métodos:**
- `getGrados()`: Obtiene todos los grados (maneja paginación)
- `getGrado(id)`: Obtiene un grado por ID

**Interfaz Grado:**
```typescript
interface Grado {
  id: number;
  nombre: string;
  descripcion?: string;
  institucion?: number;
  institucion_nombre?: string;
}
```

#### PersonalService
**Ubicación:** `client/src/app/services/personal.ts`

**URL Base:** `http://localhost:8000/api/personal/`

**Métodos:**
- `getAll()`: Obtiene todo el personal (maneja paginación)
- `getById(id)`: Obtiene personal por ID
- `create(personal)`: Crea nuevo personal
- `update(id, personal)`: Actualiza personal
- `delete(id)`: Elimina personal

### Componentes

#### EstudiantesComponent
**Ubicación:** `client/src/app/components/estudiantes/estudiantes.ts`

**Funcionalidades:**
1. **Listar estudiantes:** Muestra todos los estudiantes en una tabla
2. **Crear estudiante:** Formulario para crear nuevos estudiantes
3. **Eliminar estudiante:** Elimina estudiantes con confirmación
4. **Cargar grados:** Carga grados disponibles para el dropdown

**Campos del formulario:**
- **Requeridos:** Nombre, Apellido, Cédula
- **Opcionales:** Email, Fecha de Nacimiento, Grado de Estudio

**Dropdown de Grados:**
- Muestra nombres de grados en lugar de IDs
- Opción "Sin grado (opcional)" para crear estudiantes sin grado
- Muestra nombre de institución si está disponible

**Manejo de datos:**
- Convierte `fechaNacimiento` a formato ISO (YYYY-MM-DD)
- Solo envía `gradoEstudioId` si es mayor que 0
- Valida campos requeridos antes de enviar

---

## API REST Endpoints

### Base URL
```
http://localhost:8000/api/
```

### Endpoints Disponibles

#### Estudiantes
- `GET /api/estudiantes/` - Lista todos los estudiantes (paginado)
- `GET /api/estudiantes/{id}/` - Obtiene un estudiante por ID
- `POST /api/estudiantes/` - Crea un nuevo estudiante
- `PUT /api/estudiantes/{id}/` - Actualiza un estudiante
- `DELETE /api/estudiantes/{id}/` - Elimina un estudiante

**Filtros:**
- `GET /api/estudiantes/?grado={id}` - Filtrar por grado
- `GET /api/estudiantes/?institucion={id}` - Filtrar por institución
- `GET /api/estudiantes/?search={termino}` - Buscar por nombre, apellido o matrícula

#### Grados
- `GET /api/grados/` - Lista todos los grados (paginado)
- `GET /api/grados/{id}/` - Obtiene un grado por ID

#### Personal
- `GET /api/personal/` - Lista todo el personal (paginado)
- `GET /api/personal/{id}/` - Obtiene personal por ID
- `POST /api/personal/` - Crea nuevo personal
- `PUT /api/personal/{id}/` - Actualiza personal
- `DELETE /api/personal/{id}/` - Elimina personal

### Formato de Respuesta

#### Respuesta Paginada
```json
{
  "count": 10,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "nombre": "Juan",
      "apellido": "Pérez",
      "cedula": "12345678",
      "gradoEstudioId": 1,
      "grado_nombre": "1er Grado",
      ...
    }
  ]
}
```

#### Respuesta de Error
```json
{
  "error": "Error de validación",
  "detail": {
    "matricula": ["Ya existe un estudiante con esta cédula/matrícula."]
  },
  "status_code": 400
}
```

---

## Configuración

### Django Settings

#### CORS (Cross-Origin Resource Sharing)
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",
    "http://127.0.0.1:4200",
]
CORS_ALLOW_ALL_ORIGINS = True  # Solo para desarrollo
CORS_ALLOW_CREDENTIALS = True
```

#### REST Framework
```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',  # Solo desarrollo
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'EXCEPTION_HANDLER': 'school.exceptions.custom_exception_handler',
}
```

#### CSRF
```python
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:4200',
    'http://127.0.0.1:4200',
]
```

### Angular Environment

**Development:** `client/src/environments/environment.development.ts`
```typescript
export const environment = {
    production: false,
    apiUrl: 'http://localhost:8000/api'
};
```

---

## Manejo de Errores

### Backend

1. **Errores de Validación (400):**
   - Devuelve detalles específicos por campo
   - Formato JSON estructurado

2. **Errores de Integridad (400):**
   - Detecta matrículas duplicadas
   - Mensaje claro: "Ya existe un estudiante con esta cédula/matrícula"

3. **Errores Internos (500):**
   - Convierte a JSON en lugar de HTML
   - Incluye tipo de error y detalles

### Frontend

1. **Detección de HTML:**
   - Si el error viene como HTML, extrae el mensaje
   - Muestra mensaje claro al usuario

2. **Errores de Validación:**
   - Extrae errores por campo
   - Muestra mensajes específicos

3. **Errores de Red:**
   - Detecta errores de conexión (status 0)
   - Mensaje: "No se puede conectar al servidor"

---

## Cambios Recientes

### 1. Dropdown de Grados (Reemplazo de Input Numérico)

**Problema anterior:**
- El usuario tenía que ingresar el ID del grado manualmente
- No sabía qué IDs existían
- Errores si el ID no existía

**Solución implementada:**
- Dropdown que muestra nombres de grados
- Carga automática de grados disponibles
- Opción "Sin grado (opcional)"
- Muestra nombre de institución

**Archivos modificados:**
- `client/src/app/services/grados.ts` - Nuevo servicio
- `client/src/app/components/estudiantes/estudiantes.ts` - Carga de grados
- `client/src/app/components/estudiantes/estudiantes.html` - Dropdown

### 2. Manejo de Paginación

**Problema anterior:**
- La API devuelve datos paginados pero el frontend esperaba arrays directos
- Los estudiantes no aparecían en la tabla

**Solución implementada:**
- Todos los servicios extraen el array `results` de la respuesta paginada
- Uso del operador `map` de RxJS

**Archivos modificados:**
- `client/src/app/services/estudiantes.ts`
- `client/src/app/services/grados.ts`
- `client/src/app/services/personal.ts`

### 3. URLs Absolutas

**Problema anterior:**
- Las URLs relativas eran interceptadas por el router de Angular
- Redirecciones a `/login` en lugar de llegar a la API

**Solución implementada:**
- URLs absolutas en todos los servicios
- Formato: `http://localhost:8000/api/{recurso}/`

**Archivos modificados:**
- `client/src/app/services/estudiantes.ts`
- `client/src/app/services/grados.ts`
- `client/src/app/services/personal.ts`

### 4. Exception Handler Personalizado

**Problema anterior:**
- Errores devueltos como HTML
- Mensajes de error poco claros

**Solución implementada:**
- Exception handler que convierte todos los errores a JSON
- Mensajes claros y específicos
- Detección de errores de integridad

**Archivos creados/modificados:**
- `server/school/exceptions.py` - Nuevo archivo
- `server/core/settings.py` - Configuración del handler

### 5. Mapeo de Campos Frontend-Backend

**Problema anterior:**
- Inconsistencia entre nombres de campos
- Frontend usaba `cedula`, backend `matricula`

**Solución implementada:**
- Serializer mapea automáticamente los campos
- `to_internal_value()` maneja la conversión
- Transparente para el frontend

**Archivos modificados:**
- `server/school/serializers.py`

---

## Guía de Uso

### Crear un Estudiante

1. Ir a "Gestión de Estudiantes"
2. Clic en "+ Nuevo Estudiante"
3. Completar campos requeridos:
   - Nombre
   - Apellido
   - Cédula
4. Opcionalmente:
   - Email
   - Fecha de Nacimiento
   - Grado de Estudio (seleccionar del dropdown)
5. Clic en "Guardar"

**Notas:**
- La matrícula se genera automáticamente si no se proporciona
- El grado es opcional
- La cédula debe ser única

### Ver Estudiantes

Los estudiantes aparecen automáticamente en la tabla al cargar la página.

### Eliminar un Estudiante

1. Clic en el botón de eliminar (icono de basura)
2. Confirmar la eliminación

---

## Troubleshooting

### Los estudiantes no aparecen en la tabla

1. Verificar que el servidor Django esté corriendo: `http://localhost:8000`
2. Abrir la consola del navegador (F12)
3. Buscar errores en la consola
4. Verificar que la respuesta de la API tenga el formato correcto

### Error "Ya existe un estudiante con esta cédula"

- La cédula debe ser única
- Usar una cédula diferente
- O editar el estudiante existente

### Error al cargar grados

1. Verificar que el servidor Django esté corriendo
2. Verificar que existan grados en la base de datos
3. Revisar la consola del navegador para ver el error específico

### Redirección a /login

- Asegurarse de usar URLs absolutas en los servicios
- Verificar que `environment.apiUrl` esté configurado correctamente

---

## Dependencias

### Backend (requirements.txt)
```
Django>=5.2.7
djangorestframework>=3.16.0
django-cors-headers>=4.9.0
```

### Frontend
- Angular Material
- RxJS
- HttpClient

---

## Próximos Pasos Sugeridos

1. **Autenticación:** Implementar login y protección de rutas
2. **Validación Frontend:** Validación en tiempo real de formularios
3. **Edición de Estudiantes:** Implementar funcionalidad de edición
4. **Búsqueda y Filtros:** Mejorar búsqueda en la tabla
5. **Paginación Frontend:** Implementar paginación en la tabla
6. **Mensajes de Éxito:** Reemplazar alerts por notificaciones Material

---

## Contacto y Soporte

Para más información o problemas, revisar:
- Logs del servidor Django en la terminal
- Consola del navegador (F12) para errores del frontend
- Documentación de Django REST Framework: https://www.django-rest-framework.org/
- Documentación de Angular: https://angular.io/docs

