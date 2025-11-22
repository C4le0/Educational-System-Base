from django.http import JsonResponse

def api_root(request):
    """
    Vista raíz que muestra información sobre la API disponible
    """
    return JsonResponse({
        'message': 'Bienvenido a la API de CodeLatin-7',
        'version': '1.0',
        'endpoints': {
            'admin': '/admin/',
            'api': '/api/',
            'estudiantes': '/api/estudiantes/',
            'alumnos': '/api/alumnos/',
            'grados': '/api/grados/',
            'instituciones': '/api/instituciones/',
            'materias': '/api/materias/',
            'personal': '/api/personal/',
            'periodos': '/api/periodos/',
            'calificaciones': '/api/calificaciones/',
        },
        'documentation': 'Consulta DOCUMENTACION.md para más información'
    })

