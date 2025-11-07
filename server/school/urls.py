from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'instituciones', views.InstitucionViewSet)
router.register(r'periodos', views.PeriodoViewSet)
router.register(r'grados', views.GradoViewSet)
router.register(r'profesores', views.ProfesorViewSet)
router.register(r'materias', views.MateriaViewSet)
router.register(r'alumnos', views.AlumnoViewSet)
router.register(r'estudiantes', views.AlumnoViewSet, basename='estudiante')  # Alias para compatibilidad con Angular
router.register(r'calificaciones', views.CalificacionViewSet)
router.register(r'personal', views.PersonalViewSet)
router.register(r'auth', views.AuthViewSet, basename='auth')

urlpatterns = [
    path('api/', include(router.urls)),
]
