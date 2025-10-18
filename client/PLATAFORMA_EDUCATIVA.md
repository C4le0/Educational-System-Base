# Plataforma Educativa - Sistema de Gestión Escolar

## 📋 Descripción
Sistema completo de gestión educativa desarrollado con Angular 20, que permite administrar estudiantes, personal, materias, calificaciones y más.

## 🏗️ Estructura del Proyecto

### 📁 Modelos (Interfaces)
- **`estudiante.interface.ts`** - Modelo para estudiantes
- **`personal.interface.ts`** - Modelo para personal (Docentes, Administrativos, Obreros)
- **`usuario.interface.ts`** - Modelo para usuarios y autenticación
- **`grado-estudio.interface.ts`** - Modelo para grados de estudio
- **`grado-estudio-relacion.interface.ts`** - Relaciones entre grados y personal/estudiantes
- **`materia.interface.ts`** - Modelo para materias
- **`institucion.interface.ts`** - Modelo para datos de la institución
- **`calificacion.interface.ts`** - Modelo para calificaciones
- **`periodo.interface.ts`** - Modelo para períodos académicos

### 🔧 Servicios
- **`auth.ts`** - Servicio de autenticación y autorización
- **`estudiantes.ts`** - Gestión de estudiantes
- **`personal.ts`** - Gestión del personal
- **`usuarios.ts`** - Gestión de usuarios
- **`grado-estudio.ts`** - Gestión de grados de estudio
- **`materias.ts`** - Gestión de materias
- **`institucion.ts`** - Gestión de datos institucionales
- **`calificaciones.ts`** - Gestión de calificaciones
- **`periodos.ts`** - Gestión de períodos académicos

### 🎨 Componentes
- **`auth/login/`** - Componente de inicio de sesión
- **`dashboard/`** - Dashboard principal con navegación
- **`estudiantes/`** - Gestión de estudiantes
- **`personal/`** - Gestión del personal
- **`grado-estudio/`** - Gestión de grados
- **`materias/`** - Gestión de materias
- **`institucion/`** - Gestión institucional
- **`calificaciones/`** - Gestión de calificaciones
- **`periodos/`** - Gestión de períodos

### 🛡️ Guards
- **`auth-guard.ts`** - Protección de rutas que requieren autenticación

## 🔐 Sistema de Autenticación

### Roles de Usuario
- **Administrador** - Acceso completo al sistema
- **Docente** - Acceso a estudiantes, materias y calificaciones
- **Estudiante** - Acceso limitado a sus datos
- **Personal** - Acceso según su cargo específico

### Funcionalidades de Autenticación
- Login con validación de credenciales
- Redirección automática según rol
- Protección de rutas con guards
- Gestión de sesiones
- Logout seguro

## 📊 Características Principales

### 🎓 Gestión de Estudiantes
- Registro completo de datos personales
- Información del representante
- Asignación a grados de estudio
- Historial académico

### 👥 Gestión de Personal
- Personal unificado con columna de cargo
- Docentes, Administrativos y Obreros
- Información de contacto y laboral
- Estados activo/inactivo

### 📚 Gestión Académica
- Grados de estudio con secciones
- Materias por grado
- Períodos académicos
- Sistema de calificaciones por períodos

### 🏢 Gestión Institucional
- Datos completos de la institución
- Misión y visión
- Información de contacto
- Director y representación legal

## 🚀 Tecnologías Utilizadas

- **Angular 20** - Framework principal
- **Angular Material** - Componentes UI
- **TypeScript** - Lenguaje de programación
- **SCSS** - Estilos
- **RxJS** - Programación reactiva
- **Angular Router** - Navegación
- **Angular Forms** - Formularios reactivos

## 📱 Características de UI/UX

- **Diseño Responsivo** - Adaptable a todos los dispositivos
- **Material Design** - Interfaz moderna y consistente
- **Navegación Intuitiva** - Dashboard con acceso rápido
- **Formularios Validados** - Validación en tiempo real
- **Feedback Visual** - Estados de carga y mensajes de error
- **Tema Personalizado** - Colores y estilos coherentes

## 🔄 Flujo de Trabajo

1. **Login** - Usuario inicia sesión con credenciales
2. **Dashboard** - Acceso a funciones según rol
3. **Gestión** - CRUD completo para todas las entidades
4. **Reportes** - Visualización de datos y estadísticas
5. **Logout** - Cierre seguro de sesión

## 📈 Próximas Funcionalidades

- [ ] Reportes y estadísticas avanzadas
- [ ] Notificaciones en tiempo real
- [ ] Exportación de datos
- [ ] Integración con sistemas externos
- [ ] Módulo de comunicaciones
- [ ] Gestión de horarios
- [ ] Sistema de asistencias

## 🛠️ Instalación y Uso

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Construir para producción
npm run build
```

## 📝 Notas de Desarrollo

- El sistema está diseñado para ser escalable y mantenible
- Todas las interfaces están tipadas con TypeScript
- Los servicios están preparados para integración con APIs REST
- El sistema de autenticación es robusto y seguro
- La UI es completamente responsive y accesible

---

**Desarrollado con ❤️ usando Angular 20**
