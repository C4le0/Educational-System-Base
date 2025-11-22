# Guía de Bases de Datos para Django

## Estado Actual

El proyecto usa **SQLite** (base de datos por defecto de Django).

**Configuración actual:**
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

---

## Opciones de Bases de Datos

### 1. ✅ SQLite (Actual - Desarrollo)

**Ventajas:**
- No requiere instalación adicional
- Archivo único (`db.sqlite3`)
- Perfecto para desarrollo y proyectos pequeños
- No requiere servidor de base de datos
- Fácil de respaldar

**Desventajas:**
- No recomendado para producción con mucho tráfico
- Limitaciones en concurrencia

**Cuándo usarla:** Desarrollo local, proyectos pequeños, prototipos

---

### 2. 🐘 PostgreSQL (Recomendado para Producción)

**Ventajas:**
- Robusto y confiable
- Excelente rendimiento
- Soporta características avanzadas (JSON, arrays, etc.)
- Buen manejo de concurrencia
- Open source y gratuito

**Desventajas:**
- Requiere instalación y configuración
- Necesita servidor de base de datos

**Instalación:**

1. Instalar PostgreSQL desde https://www.postgresql.org/download/
2. Instalar adaptador Python: `pip install psycopg2-binary`
3. Crear base de datos:
   ```sql
   CREATE DATABASE codelatin_db;
   CREATE USER codelatin_user WITH PASSWORD 'tu_password';
   GRANT ALL PRIVILEGES ON DATABASE codelatin_db TO codelatin_user;
   ```
4. Configurar en Django:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'codelatin_db',
           'USER': 'codelatin_user',
           'PASSWORD': 'tu_password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```
5. Actualizar requirements.txt: `psycopg2-binary>=2.9.0`
6. Ejecutar migraciones: `python manage.py migrate`

---

### 3. 🐬 MySQL / MariaDB

**Ventajas:**
- Muy popular y ampliamente usado
- Buen rendimiento
- Fácil de usar

**Instalación:**

1. Instalar MySQL/MariaDB desde https://dev.mysql.com/downloads/
2. Instalar adaptador: `pip install mysqlclient`
3. Crear base de datos:
   ```sql
   CREATE DATABASE codelatin_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'codelatin_user'@'localhost' IDENTIFIED BY 'tu_password';
   GRANT ALL PRIVILEGES ON codelatin_db.* TO 'codelatin_user'@'localhost';
   ```
4. Configurar en Django:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.mysql',
           'NAME': 'codelatin_db',
           'USER': 'codelatin_user',
           'PASSWORD': 'tu_password',
           'HOST': 'localhost',
           'PORT': '3306',
           'OPTIONS': {'charset': 'utf8mb4'},
       }
   }
   ```

---

### 4. 🪟 Microsoft SQL Server

**Ventajas:**
- Integración con ecosistema Microsoft
- Buen rendimiento

**Desventajas:**
- Requiere licencia (versión Express gratuita disponible)
- Más complejo de configurar

**Instalación:**

1. Instalar SQL Server Express (gratuito)
2. Instalar adaptador: `pip install mssql-django`
3. Configurar en Django:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'mssql',
           'NAME': 'codelatin_db',
           'USER': 'codelatin_user',
           'PASSWORD': 'tu_password',
           'HOST': 'localhost',
           'PORT': '1433',
       }
   }
   ```

---

## Comparación Rápida

| Base de Datos | Desarrollo | Producción | Complejidad | Rendimiento |
|--------------|------------|------------|-------------|-------------|
| **SQLite** | ✅ Excelente | ⚠️ Limitado | ⭐ Muy Fácil | ⭐⭐ Básico |
| **PostgreSQL** | ✅ Excelente | ✅ Excelente | ⭐⭐ Fácil | ⭐⭐⭐⭐ Muy Bueno |
| **MySQL** | ✅ Bueno | ✅ Bueno | ⭐⭐ Fácil | ⭐⭐⭐ Bueno |
| **SQL Server** | ⚠️ Medio | ✅ Bueno | ⭐⭐⭐ Medio | ⭐⭐⭐ Bueno |

---

## Recomendación

- **Desarrollo:** SQLite (ya está configurada)
- **Producción:** PostgreSQL (mejor opción para Django)

---

## Migración de SQLite a PostgreSQL

### Paso 1: Instalar PostgreSQL y psycopg2
```bash
pip install psycopg2-binary
```

### Paso 2: Crear la base de datos
```sql
CREATE DATABASE codelatin_db;
CREATE USER codelatin_user WITH PASSWORD 'tu_password';
GRANT ALL PRIVILEGES ON DATABASE codelatin_db TO codelatin_user;
```

### Paso 3: Actualizar settings.py
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'codelatin_db',
        'USER': 'codelatin_user',
        'PASSWORD': 'tu_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### Paso 4: Ejecutar migraciones
```bash
python manage.py migrate
```

### Paso 5: Migrar datos (opcional)
```bash
# Exportar datos de SQLite
python manage.py dumpdata > datos.json

# Cambiar a PostgreSQL en settings.py
# Ejecutar migraciones
python manage.py migrate

# Importar datos
python manage.py loaddata datos.json
```

---

## Variables de Entorno (Recomendado)

Para mayor seguridad, usar variables de entorno:

### Instalar python-decouple:
```bash
pip install python-decouple
```

### Crear archivo .env:
```env
DB_ENGINE=django.db.backends.postgresql
DB_NAME=codelatin_db
DB_USER=codelatin_user
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
```

### Actualizar settings.py:
```python
from decouple import config

DATABASES = {
    'default': {
        'ENGINE': config('DB_ENGINE', default='django.db.backends.sqlite3'),
        'NAME': config('DB_NAME', default=BASE_DIR / 'db.sqlite3'),
        'USER': config('DB_USER', default=''),
        'PASSWORD': config('DB_PASSWORD', default=''),
        'HOST': config('DB_HOST', default=''),
        'PORT': config('DB_PORT', default=''),
    }
}
```

---

## Bases de Datos en la Nube

### Opciones Populares:
1. **Heroku Postgres** (Heroku)
2. **AWS RDS** (Amazon)
3. **Google Cloud SQL** (Google)
4. **Azure Database** (Microsoft)
5. **ElephantSQL** (PostgreSQL gratuito)
6. **Supabase** (PostgreSQL con características adicionales)

### Ejemplo con ElephantSQL (PostgreSQL Gratuito):
1. Crear cuenta en https://www.elephantsql.com/
2. Crear instancia gratuita
3. Obtener URL de conexión
4. Configurar en Django:
```python
import dj_database_url

DATABASES = {
    'default': dj_database_url.config(
        default='postgresql://usuario:password@host:puerto/nombre_db'
    )
}
```

---

## Resumen

- **Desarrollo:** Mantén SQLite (ya funciona)
- **Producción:** Considera PostgreSQL cuando vayas a producción

### Si quieres cambiar ahora:
1. **PostgreSQL** - La mejor opción general
2. **MySQL** - Si ya lo conoces o tienes instalado
3. **SQLite** - Si quieres simplicidad (ya está configurada)
