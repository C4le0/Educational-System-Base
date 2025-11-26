#!/bin/bash

# Script de entrada para Docker
# Ejecuta migraciones y luego inicia el servidor

set -e

echo "Esperando a que la base de datos esté lista..."
sleep 2

echo "Ejecutando migraciones..."
python manage.py migrate --noinput

echo "Recopilando archivos estáticos (si es necesario)..."
python manage.py collectstatic --noinput || true

echo "Iniciando servidor Django..."
exec python manage.py runserver 0.0.0.0:8000

