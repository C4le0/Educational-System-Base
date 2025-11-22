# Cómo Ejecutar Django

Esta guía explica las diferentes formas de ejecutar el servidor Django.

## 🐳 Opción 1: Con Docker (Recomendado)

### Ejecutar con Docker Compose

Desde la **raíz del proyecto**:

```bash
docker-compose up --build
```

O en segundo plano:

```bash
docker-compose up -d
```

El servidor estará disponible en: **http://localhost:8000**

### Ejecutar con Docker directamente

```bash
cd server
docker build -t codelatin-backend .
docker run -d -p 8000:8000 -v $(pwd):/app codelatin-backend
```

---

## 💻 Opción 2: Sin Docker (Localmente)

### Requisitos Previos

1. **Python 3.11 o superior** instalado
2. **Virtual environment** (recomendado)

### Pasos de Instalación

#### 1. Crear y activar un entorno virtual

**Windows:**
```bash
cd server
python -m venv venv
venv\Scripts\activate
```

**Linux/Mac:**
```bash
cd server
python3 -m venv venv
source venv/bin/activate
```

#### 2. Instalar dependencias

```bash
pip install -r requirements.txt
```

#### 3. Ejecutar migraciones

```bash
python manage.py migrate
```

#### 4. Iniciar el servidor

```bash
python manage.py runserver
```

O en un puerto específico:

```bash
python manage.py runserver 8000
```

El servidor estará disponible en: **http://localhost:8000**

---

## 📋 Comandos Útiles de Django

### Verificar que todo está bien

```bash
python manage.py check
```

### Crear un superusuario (admin)

```bash
python manage.py createsuperuser
```

Luego accede a: http://localhost:8000/admin/

### Ejecutar migraciones

```bash
# Crear migraciones (si modificaste modelos)
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate
```

### Acceder a la shell de Django

```bash
python manage.py shell
```

### Ver todas las URLs disponibles

```bash
python manage.py show_urls
```

---

## 🔧 Comandos con Docker

### Ver logs del servidor

```bash
docker-compose logs -f backend
```

### Ejecutar comandos Django dentro del contenedor

```bash
# Crear superusuario
docker-compose exec backend python manage.py createsuperuser

# Ejecutar migraciones
docker-compose exec backend python manage.py migrate

# Acceder a la shell
docker-compose exec backend python manage.py shell

# Verificar configuración
docker-compose exec backend python manage.py check
```

### Detener el servidor

```bash
docker-compose down
```

---

## 🌐 Acceder al Servidor

Una vez que el servidor esté corriendo:

- **API REST**: http://localhost:8000/api/
- **Admin Django**: http://localhost:8000/admin/
- **Endpoints disponibles**:
  - `/api/estudiantes/` - Gestión de estudiantes
  - `/api/grados/` - Grados de estudio
  - `/api/personal/` - Personal administrativo
  - `/api/instituciones/` - Instituciones
  - `/api/materias/` - Materias
  - Y más...

---

## ⚠️ Solución de Problemas

### Error: "ModuleNotFoundError: No module named 'django'"

**Solución**: Asegúrate de haber activado el entorno virtual y haber instalado las dependencias:
```bash
pip install -r requirements.txt
```

### Error: "Port 8000 is already in use"

**Solución**: Usa otro puerto:
```bash
python manage.py runserver 8080
```

### Error: "No such file or directory: 'manage.py'"

**Solución**: Asegúrate de estar en la carpeta `server/`:
```bash
cd server
python manage.py runserver
```

### Error: "Database is locked" (SQLite)

**Solución**: Cierra otras conexiones a la base de datos o reinicia el servidor.

### Con Docker: "Cannot connect to the Docker daemon"

**Solución**: Asegúrate de que Docker Desktop esté corriendo.

---

## 🚀 Desarrollo vs Producción

### Desarrollo

```bash
# Con DEBUG=True (por defecto)
python manage.py runserver
```

### Producción

Para producción, usa un servidor WSGI como **Gunicorn**:

```bash
pip install gunicorn
gunicorn core.wsgi:application --bind 0.0.0.0:8000
```

O con Docker, actualiza el `Dockerfile` para usar Gunicorn en lugar de `runserver`.

---

## 📝 Resumen Rápido

**Con Docker:**
```bash
docker-compose up
```

**Sin Docker:**
```bash
cd server
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

¡Listo! Tu servidor Django debería estar corriendo. 🎉

