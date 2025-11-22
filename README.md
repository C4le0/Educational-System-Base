# CodeLatin-7 - Plataforma Educativa

Sistema de gestión educativa desarrollado con Django REST Framework (Backend) y Angular (Frontend).

## 🚀 Inicio Rápido

### Opción 1: Con Docker (Recomendado)

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd CodeLatin-7
   ```

2. **Ejecutar con Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Verificar que funciona**
   - Abre: http://localhost:8000/api/

¡Listo! El backend está corriendo. 🎉

### Opción 2: Sin Docker (Localmente)

1. **Instalar dependencias**
   ```bash
   cd server
   python -m venv venv
   venv\Scripts\activate  # Windows
   # source venv/bin/activate  # Linux/Mac
   pip install -r requirements.txt
   ```

2. **Ejecutar migraciones**
   ```bash
   python manage.py migrate
   ```

3. **Iniciar el servidor**
   ```bash
   python manage.py runserver
   ```

El servidor estará disponible en: http://localhost:8000

### Documentación Completa

Para instrucciones detalladas, solución de problemas y más información, consulta:
- **[DOCKER.md](DOCKER.md)** - 📦 Documentación completa de Docker (construcción, ejecución, configuración, troubleshooting)
- **[server/COMO_EJECUTAR.md](server/COMO_EJECUTAR.md)** - Guía completa de cómo ejecutar Django
- **[DOCUMENTACION.md](DOCUMENTACION.md)** - Documentación técnica del proyecto

## 📋 Requisitos

**Con Docker:**
- Docker Desktop (Windows/Mac) o Docker Engine (Linux)
- Docker Compose (incluido con Docker Desktop)
- Git

**Sin Docker:**
- Python 3.11 o superior
- pip (gestor de paquetes de Python)
- Git

## 🛠️ Comandos Útiles

```bash
# Iniciar el servidor
docker-compose up

# Iniciar en segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f backend

# Detener el servidor
docker-compose down

# Crear superusuario (admin)
docker-compose exec backend python manage.py createsuperuser
```

## 📁 Estructura del Proyecto

```
CodeLatin-7/
├── server/          # Backend Django REST Framework
├── client/          # Frontend Angular
├── docker-compose.yml
├── DOCKER.md        # Documentación completa de Docker
└── DOCUMENTACION.md # Documentación técnica
```

## 🔗 Enlaces

- **Backend API**: http://localhost:8000/api/
- **Admin Django**: http://localhost:8000/admin/

## 📚 Más Información

Consulta la [documentación completa](DOCUMENTACION.md) para:
- Estructura de la API
- Modelos de datos
- Endpoints disponibles
- Configuración avanzada

