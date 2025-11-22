# Guía de Instalación con Docker

Esta guía te ayudará a instalar y ejecutar el backend del proyecto CodeLatin-7 usando Docker.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Docker Desktop** (Windows/Mac) o **Docker Engine** (Linux)
  - Descarga: https://www.docker.com/products/docker-desktop
- **Docker Compose** (viene incluido con Docker Desktop)
- **Git** (para clonar el repositorio)

## Pasos de Instalación

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd CodeLatin-7
```

### 2. Construir y Ejecutar con Docker Compose

Desde la raíz del proyecto, ejecuta:

```bash
docker-compose up --build
```

Este comando:
- Construye la imagen Docker del backend
- Crea y ejecuta el contenedor
- Ejecuta las migraciones de la base de datos automáticamente
- Inicia el servidor Django en el puerto 8000

### 3. Verificar que Funciona

Abre tu navegador y visita:
- **API Backend**: http://localhost:8000/api/
- **Admin Django**: http://localhost:8000/admin/ (si está configurado)

Deberías ver una respuesta JSON o la interfaz de la API.

## Comandos Útiles

### Ejecutar en Segundo Plano

Para ejecutar el contenedor en segundo plano (detached mode):

```bash
docker-compose up -d
```

### Ver los Logs

```bash
docker-compose logs -f backend
```

### Detener el Servidor

```bash
docker-compose down
```

### Detener y Eliminar Todo (incluyendo volúmenes)

```bash
docker-compose down -v
```

### Reconstruir desde Cero

Si necesitas reconstruir la imagen:

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

## Crear un Superusuario (Admin)

Para acceder al panel de administración de Django:

```bash
docker-compose exec backend python manage.py createsuperuser
```

Sigue las instrucciones para crear el usuario admin.

## Estructura de Archivos

Después de ejecutar Docker, se creará:

```
CodeLatin-7/
├── server/
│   ├── data/              # Base de datos SQLite (se crea automáticamente)
│   │   └── db.sqlite3
│   └── ...
└── docker-compose.yml
```

## Solución de Problemas

### Error: Puerto 8000 ya está en uso

Si el puerto 8000 está ocupado, puedes cambiarlo en `docker-compose.yml`:

```yaml
ports:
  - "8001:8000"  # Cambia 8001 por el puerto que prefieras
```

Luego accede a: http://localhost:8001

### Error: No se puede conectar al servidor

1. Verifica que Docker esté corriendo:
   ```bash
   docker ps
   ```

2. Revisa los logs:
   ```bash
   docker-compose logs backend
   ```

3. Verifica que el contenedor esté corriendo:
   ```bash
   docker-compose ps
   ```

### Error: Permisos en Linux/Mac

Si tienes problemas de permisos con el script `entrypoint.sh`:

```bash
chmod +x server/entrypoint.sh
```

### Limpiar Todo y Empezar de Nuevo

Si algo sale mal y quieres empezar desde cero:

```bash
# Detener y eliminar contenedores, redes y volúmenes
docker-compose down -v

# Eliminar la imagen
docker rmi codelatin-backend

# Reconstruir
docker-compose up --build
```

## Variables de Entorno (Opcional)

Si necesitas configurar variables de entorno, crea un archivo `.env` en la carpeta `server/`:

```env
DEBUG=True
SECRET_KEY=tu-clave-secreta-aqui
ALLOWED_HOSTS=localhost,127.0.0.1
```

Y actualiza `docker-compose.yml` para cargarlo (ver `server/README_DOCKER.md` para más detalles).

## Conectar el Frontend Angular

Una vez que el backend esté corriendo en Docker:

1. El backend está disponible en: `http://localhost:8000/api`
2. Asegúrate de que `client/src/environments/environment.development.ts` tenga:
   ```typescript
   apiUrl: 'http://localhost:8000/api'
   ```
3. Ejecuta el frontend normalmente:
   ```bash
   cd client
   npm install
   npm start
   ```

## Preguntas Frecuentes

**P: ¿Necesito instalar Python o Django localmente?**  
R: No, Docker incluye todo lo necesario.

**P: ¿Dónde se guardan los datos?**  
R: La base de datos SQLite se guarda en `./server/data/db.sqlite3` y persiste entre reinicios.

**P: ¿Puedo editar el código mientras el contenedor está corriendo?**  
R: Sí, el código está montado como volumen, así que los cambios se reflejan automáticamente (puede requerir reiniciar el contenedor).

**P: ¿Cómo actualizo las dependencias?**  
R: Edita `server/requirements.txt`, luego ejecuta:
   ```bash
   docker-compose down
   docker-compose up --build
   ```

## Siguiente Paso

Una vez que el backend esté corriendo, puedes:
- Probar los endpoints de la API
- Conectar el frontend Angular
- Crear un superusuario para acceder al admin

¡Listo! Tu backend debería estar funcionando con Docker. 🐳

