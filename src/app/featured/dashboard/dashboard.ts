import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  listItems = [
    { name: 'Inicio', icon: 'home', url: '/dashboard' },
    { name: 'Cursos', icon: 'school', url: '/dashboard/courses' },
    { name: 'Alumnos', icon: 'people', url: '/dashboard/students' },
  ]
}
