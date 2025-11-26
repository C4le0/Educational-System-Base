# Backend Django - CodeLatin-7

Backend desarrollado con Django REST Framework.

## 🚀 Ejecución con Docker

Desde la raíz del proyecto:

```bash
docker-compose up --build
```

## 📁 Estructura

```
server/
├── core/           # Configuración Django
├── school/         # Aplicación principal
├── scripts/        # Scripts de utilidad
├── manage.py       # Script de gestión Django
└── requirements.txt # Dependencias Python
```

## 🔧 Comandos Django

```bash
# Ejecutar migraciones
docker-compose exec backend python manage.py migrate

# Crear superusuario
docker-compose exec backend python manage.py createsuperuser

# Acceder a shell Django
docker-compose exec backend python manage.py shell
```
