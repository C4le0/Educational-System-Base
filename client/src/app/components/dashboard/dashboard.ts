import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth';
import { Usuario } from '../../models/usuario.interface';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatToolbarModule,
    MatMenuModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  currentUser: Usuario | null = null;
  dashboardCards: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.setupDashboardCards();
  }

  private setupDashboardCards() {
    if (!this.currentUser) return;

    const baseCards = [
      {
        title: 'Estudiantes',
        icon: 'school',
        route: '/estudiantes',
        color: 'primary',
        roles: ['Administrador', 'Docente']
      },
      {
        title: 'Personal',
        icon: 'people',
        route: '/personal',
        color: 'accent',
        roles: ['Administrador']
      },
      {
        title: 'Materias',
        icon: 'book',
        route: '/materias',
        color: 'warn',
        roles: ['Administrador', 'Docente']
      },
      {
        title: 'Grados de Estudio',
        icon: 'class',
        route: '/grados',
        color: 'primary',
        roles: ['Administrador']
      },
      {
        title: 'Calificaciones',
        icon: 'grade',
        route: '/calificaciones',
        color: 'accent',
        roles: ['Administrador', 'Docente']
      },
      {
        title: 'Períodos',
        icon: 'date_range',
        route: '/periodos',
        color: 'warn',
        roles: ['Administrador']
      },
      {
        title: 'Institución',
        icon: 'business',
        route: '/institucion',
        color: 'primary',
        roles: ['Administrador']
      }
    ];

    this.dashboardCards = baseCards.filter(card =>
      card.roles.includes(this.currentUser!.rol)
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
