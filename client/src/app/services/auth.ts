import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Usuario, LoginRequest, LoginResponse } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Verificar si hay un usuario guardado en localStorage (solo en el cliente)
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        this.currentUserSubject.next(JSON.parse(savedUser));
      }
    }
  }

  // Login con datos mock
  login(credentials: LoginRequest): Observable<LoginResponse> {
    // Simular llamada a API con delay
    return of(this.mockLogin(credentials)).pipe(
      delay(1000),
      tap(response => {
        // Guardar token y usuario (solo en el cliente)
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.usuario));
        }
        this.currentUserSubject.next(response.usuario);
      })
    );
  }

  // Método mock para simular autenticación
  private mockLogin(credentials: LoginRequest): LoginResponse {
    // Usuarios de prueba
    const mockUsers = [
      {
        id: 1,
        username: 'admin',
        email: 'admin@sistema.edu',
        rol: 'Administrador' as const,
        token: 'mock-token-admin-123'
      },
      {
        id: 2,
        username: 'docente',
        email: 'docente@sistema.edu',
        rol: 'Docente' as const,
        token: 'mock-token-docente-456'
      },
      {
        id: 3,
        username: 'estudiante',
        email: 'estudiante@sistema.edu',
        rol: 'Estudiante' as const,
        token: 'mock-token-estudiante-789'
      }
    ];

    // Buscar usuario por username
    const user = mockUsers.find(u => u.username === credentials.username);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Simular validación de contraseña (cualquier contraseña funciona para demo)
    if (!credentials.password || credentials.password.length < 3) {
      throw new Error('Contraseña inválida');
    }

    return {
      token: user.token,
      usuario: user,
      expiresIn: 3600 // 1 hora en segundos
    };
  }

  // Logout
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  // Obtener usuario actual
  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const hasUser = !!this.getCurrentUser();
    const hasToken = typeof window !== 'undefined' && window.localStorage ? !!localStorage.getItem('token') : false;
    return hasUser && hasToken;
  }

  // Verificar si el usuario tiene un rol específico
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.rol === role : false;
  }

  // Verificar si el usuario tiene alguno de los roles especificados
  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.rol) : false;
  }

  // Obtener token
  getToken(): string | null {
    return typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('token') : null;
  }

  // Cambiar contraseña
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, {
      oldPassword,
      newPassword
    });
  }

  // Registrar nuevo usuario (solo administradores)
  registerUser(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/register`, user);
  }
}
